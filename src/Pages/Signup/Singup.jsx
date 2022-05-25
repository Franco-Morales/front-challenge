import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import "./signup.css";


const Signup = () => {
    const [values, setValues] = useState({ email: "", password: "", username: "" });
    const [formState, setFormState] = useState(true);
    const [errors, setErrors] = useState({ });

    const navigate = useNavigate();

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
            const response = await fetch("http://localhost:3098/api/v1/auth/signup", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(values)
            });

            const data = await response.json();

            if( data.errors ) {
                setErrors( data.errors );
                setFormState( prevState => !prevState );
            } else {
                toast.success("Successufl SignUp!", { theme: "dark", position: "bottom-right" });
                navigate("/login");
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
                        <h3 className='card-title'>Signup Page</h3>
                    </div>
                    <div className="card-body">
                        <form className='row g-2' onSubmit={onSubmitLogin} >
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
                            <div className="col-12">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="username" 
                                    placeholder='username' 
                                    name="username"
                                    required
                                    onChange={handleChange}
                                />
                                { 
                                    errors?.username && <span className="text-danger">{ errors.username?.msg }</span> 
                                }
                            </div>
                            <hr className='my-4'/>
                            <div className="col-12 d-grid">
                                <button className="btn btn-primary" disabled={ formState } type='submit'>
                                    signup
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Signup;