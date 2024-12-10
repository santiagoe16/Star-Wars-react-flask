import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import starWars from "../../img/star-wars-logo-1002.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate("")
	const handleLogo = () =>{
		actions.setSearch("")
		navigate("/")
	}
	return (
		<nav className="navbar mb-3">
			<div className="container">
				<a style={{cursor: "pointer"}} 
					onClick={()=>handleLogo()}
				>
					<img src={starWars} style={{width: "121px", height: "62px"}}></img>
				</a>
				<Link to={"/favorites"}>
					<button className="orange-btn" >
						Favorites
					</button>
				</Link>
			</div>
		</nav>
	);
};