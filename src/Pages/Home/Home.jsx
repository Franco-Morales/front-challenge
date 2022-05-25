import React from 'react';


const Home = ({ games }) => {
    return (
        <div className="container">
            <div className="row">
                <div className="p-5 mb-4 bg-light rounded-3 mt-5 shadow-sm">
                    <div className="container-fluid py-5">
                        <h1 className="display-5 fw-bold">Welcome to Game Store</h1>
                        <p className="col-md-8 fs-4">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum ullam eveniet illo, corporis asperiores accusantium alias ducimus aperiam nihil aliquid. Magnam, consectetur! Facilis nisi est saepe asperiores blanditiis a dolores.
                        </p>
                    </div>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4 my-5">
                {   games.map( game => (
                        <div className="col" key={game._id}>
                            <div className="card h-100 shadow">
                                <img src={game.cover} className="card-img-top" alt="Product img" />
                                <div className="card-body">
                                    <h4 className="card-title">{game.title}</h4>
                                </div>
                                <div className="card-footer">
                                    By <b>{game.developer}</b>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}


export default Home;