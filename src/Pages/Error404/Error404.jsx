import React from 'react';
import { useNavigate } from 'react-router-dom';

import Image404 from "../../Assets/Images/404_error.svg";
import "./error404.css";


const Error404 = () => {
    const navigate = useNavigate();
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <img src={Image404} alt="404 img" id="error"/>
                </div>
                <div className="col-12">
                    <button className="btn btn-outline-dark my-3" onClick={ () => navigate("/") }>
                        Go bak to Home Page
                    </button>
                </div>
            </div>
        </div>
    )
}


export default Error404;