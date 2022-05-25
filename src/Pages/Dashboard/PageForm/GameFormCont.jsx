import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

import Loader from '../../../Components/Loader/Loader';
import GameForm from "./GameForm";


const GameFormCont = () => {
    const [categories, setCategories] = useState([]);
    const [formValues, setFormValues] = useState({
        title: "",
        desc: "",
        developer: "", 
        characters: [""], 
        category: "", 
        release: "",
        cover: ""
    });

    const [isLoading, setLoading] = useState(true);

    const { gameId } = useParams();


    useEffect( () => {
        const fetchData = async () => {
            try {
                const responseCategories = await fetch("http://localhost:3098/api/v1/categories");
                const respCats = await responseCategories.json();

                if(!!gameId) {
                    const responseGame = await fetch(`http://localhost:3098/api/v1/videogames/${gameId}`);
                    const { title, description: desc, developer, characters, category, release, cover } = ( await responseGame.json() ).data;

                    setFormValues({ title, desc, developer, characters, category, release, cover });
                }

                setCategories(respCats.data);
                setLoading( false );
            } catch (error) {
                // console.error(error);
                setLoading( true );
                toast.error("Unexpected error :(", { theme: "dark", position: "bottom-right" });
            }
        }
        fetchData();
    },[gameId]);


    return (
        isLoading? <Loader /> : <GameForm formValues={formValues} categories={categories} gameId={gameId}/>
        // <Loader/>
    )
}


export default GameFormCont;