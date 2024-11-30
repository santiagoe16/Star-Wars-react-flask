import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { MoreInfo } from "../pages/information";

export const Card = (props) => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
	const [isHovered, setIsHovered] = useState(false);
    const [onfavorites, setOnFavorites] = useState(false);
    useEffect(() => {
        if (store.favorites.includes(props.name)) {
            setOnFavorites(true);
        } else {
            setOnFavorites(false);
        }
    }, [store.favorites]);

	return (
        <>
            <div className="card">
                <Link to={`/information/${props.nameCard}/${props._id}`} >
                    <img src={props.image} className="card-img-top" alt={`${props.name}`} />
                    <div className="card-body">
                        <h5>{props.name}</h5>
                        {/* <div className="d-flex justify-content-between">
                        <i 
                        className={`${onfavorites ? "fas fa-heart" : "far fa-heart"} h5 p-2 border border-warning rounded-2 me-2 ${isHovered ? " bg-warning" : ""} ${isHovered ? "text-dark" : "text-warning"}`}
                        style={{cursor: "pointer"}}
                        onMouseEnter={()=>setIsHovered(true)} 
                        onMouseLeave={()=>setIsHovered(false)} 
                        onClick={()=> {
                            actions.addFavorites(props.name)}} ></i>
                        </div> */}
                    </div>
                </Link>
            </div>
        </>
    )
};