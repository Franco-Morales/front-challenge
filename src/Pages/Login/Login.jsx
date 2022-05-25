import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthType } from '../../Context/auth.reducer';
import { useAuth } from '../../Context/authContext';

import "./login.css";


const Login = () => {
    const [values, setValues] = useState({ email: "", password: "" });
    const [formState, setFormState] = useState(true);
    const [errors, setErrors] = useState({ });

    const navigate = useNavigate();

    const { dispatch } = useAuth();


    useEffect( () => {
        const checkForm = () => {
            setFormState(
                !Object.keys(values).every( (key) => values[key] !== "" )
            )
        }

        checkForm();
    },[values]);


    const onSubmitLogin = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3098/api/v1/auth/loggin", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(values)
            });

            const resp = await response.json();

            if( resp.errors ) {
                setErrors( resp.errors );
                setFormState( prevState => !prevState );
            } 

            if( resp.data ) {
                dispatch({ 
                    type: AuthType.loggin, 
                    payload: { ...resp.data } 
                });

                toast.success("Successful LogIn!", { theme: "dark", position: "bottom-right" });
                navigate("/");
            }
        } catch (error) {
            // console.error(error);
            toast.error("Unexpected error :(", { theme: "dark", position: "bottom-right" });
        }
    }

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className="container">
            <div className="wraper-card">
                <div className="card shadow border border-light">
                    <div className="card-header text-center">
                        <h3 className='card-title'>Login Page</h3>
                    </div>
                    <div className="card-body">
                        <form className='row g-4' onSubmit={onSubmitLogin} >
                            <div className="col-12">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email" 
                                    placeholder='user@email.com' 
                                    name="email"
                                    required
                                    onChange={handleChange}
                                />
                                { 
                                    errors?.email && <span className="text-danger">{ errors.email?.msg }</span> 
                                }
                            </div>
                            <div className="col-12">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="password" 
                                    placeholder='* * * * * * * *' 
                                    name="password"
                                    required
                                    onChange={handleChange}
                                />
                                { 
                                    errors?.password && <span className="text-danger">{ errors.password?.msg }</span> 
                                }
                            </div>
                            <div className="col-12 d-grid">
                                <button className="btn btn-primary" disabled={ formState } type='submit'>
                                    loggin
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Login;