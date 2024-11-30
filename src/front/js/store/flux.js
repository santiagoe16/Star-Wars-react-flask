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
			favorites: []
		},
		actions: {
			getCharacters: () => {
				fetch("https://starwars-databank-server.vercel.app/api/v1/characters?page=1&limit=50")
					.then((response) => response.json())
					.then((result) => {
						setStore({ characters: result.data });
					})
					.catch((error) => console.error("Error fetching characters:", error));
			},
			getLocations: () => {
				fetch("https://starwars-databank-server.vercel.app/api/v1/locations?page=1&limit=50")
					.then((response) => response.json())
					.then((result) => {
						setStore({ locations: result.data });
					})
					.catch((error) => console.error("Error fetching characters:", error));
			},
			getVehicles: () => {
				fetch("https://starwars-databank-server.vercel.app/api/v1/vehicles?page=1&limit=50")
					.then((response) => response.json())
					.then((result) => {
						setStore({ vehicles: result.data });
					})
					.catch((error) => console.error("Error fetching characters:", error));
			},
			getSpecies: () => {
				fetch("https://starwars-databank-server.vercel.app/api/v1/species?page=1&limit=50")
					.then((response) => response.json())
					.then((result) => {
						setStore({ species: result.data });
					})
					.catch((error) => console.error("Error fetching characters:", error));
			},

			addFavorites: (name) => {
				const store = getStore();

				if (!store.favorites.includes(name)) {
					
					const updatedFavorites = [...store.favorites, name];
					setStore({ favorites: updatedFavorites });
				} else {
					setStore({favorites: store.favorites.filter((favorite) => favorite !== name)});
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
