import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import starWars from "../../img/star-wars-logo-1002.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<div className="container">
				<Link to="/">
					<img src={starWars} style={{width: "92px", height: "51px"}}></img>
				</Link>
				<div className="dropdown ml-auto">
					<button className="btn btn-primary dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Favorites
					</button>
					<ul className="dropdown-menu ">
						{store.favorites && store.favorites.length > 0 ? (store.favorites.map((favorite, index) => (
							<li key={index} className=" dropdown-item user-select-none me-2"> {favorite} <i onClick={()=>actions.addFavorites(favorite)} className="fas fa-trash ms-2" style={{cursor: "pointer"}}></i></li>
						))) : <li className="dropdown-item user-select-none me-2">(empty)</li>}
						
					</ul>
				</div>
			</div>
		</nav>
	);
};