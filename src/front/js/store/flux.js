import { Search } from "react-bootstrap-icons";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			characters: [],
			locations: [],
			vehicles: [],
			species: [],
			favorites: [],
			search: ""
		},
		actions: {
			getCharacters: () => {
				fetch("https://starwars-databank-server.vercel.app/api/v1/characters?page=1&limit=1000")
					.then((response) => response.json())
					.then((result) => {
						setStore({ characters: result.data });
					})
					.catch((error) => console.error("Error fetching characters:", error));
			},
			getLocations: () => {
				fetch("https://starwars-databank-server.vercel.app/api/v1/locations?page=1&limit=1000")
					.then((response) => response.json())
					.then((result) => {
						setStore({ locations: result.data });
					})
					.catch((error) => console.error("Error fetching characters:", error));
			},
			getVehicles: () => {
				fetch("https://starwars-databank-server.vercel.app/api/v1/vehicles?page=1&limit=1000")
					.then((response) => response.json())
					.then((result) => {
						setStore({ vehicles: result.data });
					})
					.catch((error) => console.error("Error fetching characters:", error));
			},
			getSpecies: () => {
				fetch("https://starwars-databank-server.vercel.app/api/v1/species?page=1&limit=1000")
					.then((response) => response.json())
					.then((result) => {
						setStore({ species: result.data });
					})
					.catch((error) => console.error("Error fetching characters:", error));
			},
			setSearch: (searchTerm) => {
				setStore({search: searchTerm})
			},

			getFavorites: () =>{
				console.log("soy favorites get");
				
				fetch("https://probable-space-couscous-pjgwq64xwv7qc69w5-3001.app.github.dev/api/favorites",{
					method: "GET"
				})
				.then(response => response.json()) 
				.then(data => {
					setStore({favorites:data})
					console.log(data);
					
				})
				.catch(error => {
					console.error("Error fetching favorites:", error);
				});
			},

			addFavorites: (favorite) => {
				const store = getStore()
				const isFavorite = store.favorites.find((item)=> item.name === favorite.name)

				if(!isFavorite){
					fetch("https://probable-space-couscous-pjgwq64xwv7qc69w5-3001.app.github.dev/api/favorites", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ 
							character_id: favorite._id,
							name: favorite.name,
							image: favorite.image,
							category: favorite.category,
						}),
					})
					.then(response => response.json()) 
					.then(()=>getActions().getFavorites()) 
					.catch(error => {
						console.error("Error adding favorite:", error);
					});
				}
				else{
					fetch(`https://probable-space-couscous-pjgwq64xwv7qc69w5-3001.app.github.dev/api/favorites/${isFavorite.id}`, {
						method: "DELETE"
					})
					.then(response => response.json()) 
					.then(()=>getActions().getFavorites()) 
					.catch(error => {
						console.error("Error deleting favorite:", error);
					});
				}
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
