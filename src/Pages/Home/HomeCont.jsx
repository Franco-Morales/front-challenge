import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Loader from '../../Components/Loader/Loader';
import Home from "./Home";


const HomeContainer = () => {
    const [games, setGames] = useState();
    const [isLoading, setLoading] = useState(true);


    useEffect( () => {
        const fetchGames = async () => {
            try {
                const response = await fetch("http://localhost:3098/api/v1/videogames");
                const resp = await response.json();
                
                setGames(resp.data);
                setLoading( false );
            } catch (error) {
                // console.error(error);
                setLoading( true );
                toast.error("Unexpected error :(", { theme: "dark", position: "bottom-right" });
            }
        }

        fetchGames();
    },[]);


    return (
        isLoading? <Loader /> : <Home games={games}/>
    )
}


export default HomeContainer;