
import React from 'react';
import { useLocation, Navigate } from "react-router-dom";

import {  useAuth } from "../Context/authContext";


const AuthGuard = ({ children }) => {

    const { store } = useAuth();
    const location = useLocation();
    
    return (Object.entries(store.auth).length === 0)? 
        <Navigate to="/login" state={{ from: location }} replace></Navigate>
        :
        children
}
// https://reactrouter.com/docs/en/v6/examples/auth

export default AuthGuard;