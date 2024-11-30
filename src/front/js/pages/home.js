import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Card } from "../component/card";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return store.characters.length > 0 ? (
        <>
            <div className="pb-4 mt-5">
                {["characters", "locations", "vehicles", "species"].map((category) => (
                    <div key={category}>
                        <h1 className="mb-3 text-capitalize">{category}</h1>
                        <div className="mb-5 card-container">
                            {store[category].map((item) => (
                                <Card
                                    key={item._id}
                                    name={item.name}
                                    image={item.image}
                                    nameCard={category}
                                    _id={item._id}
                                ></Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    ) : (
        <div className="text-center d-flex justify-content-center align-items-center w-100 h-75">
            <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>


    );
};