import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuth } from '../../../Context/authContext';


const GameForm = ({ formValues, categories, gameId }) => {
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState( formValues );

    const { store } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "http://localhost:3098/api/v1/videogames";
        let response;

        try {
            if(!!gameId) {
                response = await fetch(`${url}/${gameId}`,{
                    method: "PUT",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `Bearer ${store.auth.accessToken}`
                    },
                    body: JSON.stringify(form)
                });
            } else {
                response = await fetch(url,{
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `Bearer ${store.auth.accessToken}`
                    },
                    body: JSON.stringify(form)
                });
            }

            const resp = await response.json();

            if(resp.message) {
                navigate(-1);
                toast.success(`${resp.message}`, { theme: "dark", position: "bottom-right" });
            }

            if(resp.errors) {
                setErrors(resp.errors);
            }

        } catch (error) {
            // console.error(error);
            toast.error("Unexpected error :(", { theme: "dark", position: "bottom-right" });
        }
    }


    const addCharacter = (e) => {
        e.preventDefault();
        if(form.characters.length >= 1 && form.characters.length < 6) {
            setForm({
                ...form,
                "characters": [...form.characters, ""]
            });
        } else {
            setErrors({
                ...errors,
                "characters": {
                    msg: "At least 3 and no more than 6 characters"
                }
            });
        }
    }

    const removeCharacter = (e, i) => {
        e.preventDefault();
        if(form.characters.length > 1) {
            form.characters.splice(i, 1);
            setForm({
                ...form,
                "characters": form.characters
            });
        } else {
            setErrors({
                ...errors,
                "characters": {
                    msg: "At least 3 and no more than 6 characters"
                }
            });
        }
    }

    const handleChars = (e, i) => {
        form.characters[i] = e.target.value;
        setForm({
            ...form,
            "characters": form.characters
        });
    }


    return (
        <div className="container">
            <form className='row g-4 my-5' onSubmit={handleSubmit} >
                <div className="col-12">
                    <label htmlFor="titleGame" className="form-label">Title</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="titleGame" 
                        placeholder='Title' 
                        name="title"
                        value={form.title}
                        required
                        onChange={handleChange}
                    />
                    { 
                        errors?.title && <span className="text-danger">{ errors.title?.msg }</span> 
                    }
                </div>
                <div className="col-4">
                    <label htmlFor="devGame" className="form-label">Developer</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="devGame" 
                        placeholder='Developer' 
                        name="developer"
                        value={form.developer}
                        required
                        onChange={handleChange}
                    />
                    { 
                        errors?.developer && <span className="text-danger">{ errors.developer?.msg }</span> 
                    }
                </div>
                <div className="col-4">
                    <label htmlFor="release" className="form-label">Release</label>
                    <input 
                        type="Date" 
                        className="form-control" 
                        id="release"
                        name="release"
                        value={form.release && form.release.split("T")[0]}
                        required
                        onChange={handleChange}
                    />
                    { 
                        errors?.developer && <span className="text-danger">{ errors.developer?.msg }</span> 
                    }
                </div>
                <div className="col-4">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select id="category" className="form-select" name="category" onChange={handleChange} required>
                        <option selected disabled>Choose a category</option>
                        { categories.map( cat => (
                                <option 
                                    value={cat._id} 
                                    key={cat._id}
                                    selected={form.category? cat._id === form.category : false}
                                >
                                    {cat.name}
                                </option>
                            )    
                        )}
                    </select>
                    { 
                        errors?.category && <span className="text-danger">{ errors.category?.msg }</span> 
                    }
                </div>
                <div className="col-12">
                    <label htmlFor="cover" className="form-label">Cover picture</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="cover" 
                        placeholder='Image' 
                        name="cover"
                        value={form.cover}
                        required
                        onChange={handleChange}
                    />
                    { 
                        errors?.cover && <span className="text-danger">{ errors.cover?.msg }</span> 
                    }
                </div>
                <div className="col-12">
                    <label htmlFor='characters'>Characters</label>
                    {
                        form.characters.map( (char, i) => (
                            <div className='input-group mt-1' key={`char-${i}`}>
                                <input 
                                    type="text" 
                                    className='form-control'
                                    id="characters"
                                    placeholder="Character's name"
                                    onChange={(e) => handleChars(e, i)}
                                    value={char}
                                    required
                                />
                                <button className="btn btn-danger" onClick={(e) => removeCharacter(e,i)}>
                                    <i className='bi bi-x-lg'/>
                                </button>
                            </div>
                        ))
                    }
                    <button className='btn btn-success mt-2' onClick={addCharacter}> Add a new Character</button>
                </div>
                {
                    errors?.characters && <span className="text-danger">{ errors.characters?.msg }</span>
                }
                <div className="col-12">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea 
                        className="form-control" 
                        id="description"
                        name='desc'
                        value={form.desc}
                        rows="6"
                        placeholder='Decription of the game'
                        onChange={handleChange}
                    />
                    { 
                        errors?.desc && <span className="text-danger">{ errors.desc?.msg }</span> 
                    }
                </div>
                <hr />
                <div className="col-4 offset-4 d-grid">
                    <button className="btn btn-primary" type='submit'>
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}


export default GameForm;