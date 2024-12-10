import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Information = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [entity,setEntity] = useState(null)
	const [properties,setProperties] = useState(null)
	
	useEffect(()=>{
		fetch(`https://starwars-databank-server.vercel.app/api/v1/${params.nameCard}/${params.id}`)
		.then(response => response.json())
		.then(data => {
            setEntity(data);
        })

	},[])

	return entity ? (
			<div className="d-flex information">
				<div>
					<img src={entity.image} alt={entity.name} />
				</div>
				<div className="card-information">
					<h5>{entity.name}</h5>
					<p>{entity.description}</p>
				</div>
			</div>
	) : <></>;
};