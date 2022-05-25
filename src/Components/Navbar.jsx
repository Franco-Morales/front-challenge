import React from 'react'
import { NavLink } from 'react-router-dom';
import { AuthType } from '../Context/auth.reducer';

import { useAuth } from "../Context/authContext";


const Navbar = () => {
    const { store, dispatch } = useAuth();


    const onLogout = (e) => {
        e.preventDefault();
        dispatch({
            type: AuthType.logout
        });
    }


    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container">
                <NavLink className="navbar-brand" to="/">
                    <i className='bi bi-controller me-3'/>
                    Game Store
                </NavLink>
                
                <ul className="navbar-nav my-2 my-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>
                    { (Object.entries(store.auth).length === 0)? 
                        <>
                            <NavLink className="btn btn-light mx-3" to="/login">Log In</NavLink>
                            <NavLink className="btn btn-outline-light" to="/signup">Sing Up</NavLink>
                        </>
                        :
                        <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                { store.auth?.user.username }
                            </span>
                            <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                                <NavLink to="/dashboard" className="dropdown-item d-flex justify-content-between"> 
                                    Dashboard 
                                    <i className='bi bi-sliders2'/>
                                </NavLink>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <button className="dropdown-item d-flex justify-content-between" type='button' onClick={onLogout}>
                                    Logout 
                                    <i className="bi bi-arrow-bar-right"/>
                                </button>
                            </ul>
                        </li>
                    }
                </ul>
            </div>
        </nav>
    )
}


export default Navbar;