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
			<div className="information h-75">
				<div className="row align-items-center h-100">
					<div className="col-12 col-lg-8  px-0">
						<img src={entity.image} alt={entity.name} />
					</div>

					<div className="col-12 col-lg-4  px-0">
						<div className="card-information">
							<h5>{entity.name}</h5>
							<p>{entity.description}</p>
						</div>
					</div>
				</div>
			</div>
	) : <></>;
};