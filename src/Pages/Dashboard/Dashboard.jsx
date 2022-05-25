import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuth } from '../../Context/authContext';


const Dashboard = ({ games, handleRefresh }) => {
    const { store } = useAuth();
    const handleDelete = async (e, id) => {
        e.preventDefault();

        let userConfirm = window.confirm("Delete ?");

        try {
            if(userConfirm) {
                const response = await fetch(`http://localhost:3098/api/v1/videogames/${id}`,{
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `Bearer ${store.auth.accessToken}`
                    }
                });

                const resp = await response.json();
                
                if(resp.message) {
                    toast.success(`${resp.message}`, { theme: "dark", position: "bottom-right" });
                    handleRefresh();
                }
            }
        } catch (error) {
            // console.error(error);
            toast.error("Unexpected error :(", { theme: "dark", position: "bottom-right" });
        }
    }


    return (
        <div className="container">
            <div className="row my-4">
                <div className="col-12">
                    <h1> Dashboard </h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12 mb-3">
                    <Link className="btn btn-success" to="new">
                        New Videogame
                    </Link>
                </div>
                <div className="col-12">
                    { games.length ? 
                        <>
                            <table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Release</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                { games.map( (game, i) => 
                                    (
                                        <tr key={`${game._id}-${i}`}>
                                            <th scope="row">{game._id}</th>
                                            <td>{game.title}</td>
                                            <td>{game.release}</td>
                                            <td className='d-flex justify-content-around'>
                                                <Link className="btn btn-warning" to={`update/${game._id}`}>
                                                    <i className='bi bi-pencil-square'/>
                                                </Link>
                                                <button className='btn btn-danger' onClick={(e) => handleDelete(e, game._id)}>
                                                    <i className='bi bi-trash-fill'/>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )}
                                </tbody>
                            </table>
                        </>
                        :
                        <h3 className='my-3'>Empty results, add a new videogame.</h3>
                    }
                </div>
            </div>
        </div>
    )
}


export default Dashboard;