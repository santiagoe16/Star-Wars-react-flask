import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Information = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [entity,setEntity] = useState(null)
	const [properties,setProperties] = useState(null)
	
	useEffect(()=>{
		fetch(`https://starwars-databank-server.vercel.app/api/v1/${params.nameCard}/${params._id}`)
		.then(response => response.json())
		.then(data => {
            setEntity(data);

			const endpoint = params.nameCard === "characters" ? "people" :
				params.nameCard === "vehicles" ? "vehicles" : "";

			fetch(`https://www.swapi.tech/api/${endpoint}?page=1&limit=1000`)
			.then(response => response.json())
			.then(result => {
				const entityFiltered = result.results.filter(item => item.name.toLowerCase() == data.name.toLowerCase());
				
				fetch(entityFiltered[0]?.url)
				.then(response => response.json())
				.then(entityResult => {
					setProperties(entityResult.result.properties);
				})
			})
        })


	},[])

	const getContent = () => {
		if (!properties) return null;

		const fields = {
			characters: [
				["Name", properties.name],
				["Birth Year", properties.birth_year],
				["Gender", properties.gender],
				["Height", properties.height],
				["Skin Color", properties.skin_color],
				["Eye Color", properties.eye_color],
			],
			vehicles: [
				["Name", properties.name],
				["Vehicle Class", properties.vehicle_class],
				["Cost in Credits", properties.cost_in_credits],
				["Crew", properties.crew],
				["Passengers", properties.passengers],
				["Max Speed", properties.max_atmosphering_speed],
			],
		};

		return fields[params.nameCard] ? (
			<>	
				<hr className="my-4" style={{ height: "2px" }}/>

				<div className="d-flex justify-content-center text-center ms-5 me-5 fw-bold">
					{fields[params.nameCard].map(([label, value], index) => (
						<div key={index} className="me-5 ms-5">
							<p>{label}</p>
							<p>{value}</p>
						</div>
					))}
				</div>
			</>
		) : (
			<p>Unknown type</p>
		);
	};

	return entity ? (
		<>
			<div className="d-flex mt-5 information">
				<div className="me-3">
					<img src={entity.image} alt={entity.name} />
				</div>
				<div>
					<h5>{entity.name}</h5>
					<p>{entity.description}</p>
				</div>
			</div>

			{getContent()}

		</>
	) : <></>;
};