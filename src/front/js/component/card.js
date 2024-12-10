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
        const isFavorite = store.favorites.some((favorite) => favorite.name === props.name);
        setOnFavorites(isFavorite);
    }, [store.favorites, props.name]);

    const favoriteData = { 
        _id: props.id,
        name: props.name,
        image: props.image,
        category: props.nameCard,
    }

	return (
        <>
            <div className="card">
                <Link to={`/information/${props.nameCard}/${props.id}`} >
                    <img src={props.image} className="card-img-top" alt={`${props.name}`} />
                    <div className="card-body d-flex position-relative ">
                        <h5>{props.name}</h5>
                        {!props.favorite == true ? (
                            <div className="icon-favorite">
                                <i 
                                    className={`${onfavorites ? "fas fa-heart" : "far fa-heart"} ${isHovered ? "fas fa-heart" : "far fa-heart"}`}
                                    style={{cursor: "pointer", fontSize: "26px"}}
                                    onMouseEnter={()=>setIsHovered(true)} 
                                    onMouseLeave={()=>setIsHovered(false)} 
                                    onClick={(e)=> {
                                        e.preventDefault();
                                        actions.addFavorites(favoriteData)
                                    }}
                                ></i>
                            </div>
                        ):(<></>)}
                        
                    </div>
                </Link>
            </div>
        </>
    )
};