import React from 'react'
import { JellyTriangle } from '@uiball/loaders';

import "./loader.css"


const Loader = () => {
    return (
        <div className="container" id="loader-container">
            <JellyTriangle 
                size={100}
                speed={1.6} 
                color="#212529" 
            />
        </div>
    )
}

export default Loader