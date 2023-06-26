const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					full_name: "Dave Bradley",
					email: "dave@gmail.com",
					agenda_slug: "my_super_agenda",
					address:"47568 NW 34ST, 33434 FL, USA",
					phone:"7864445566"
				},
				
			]
		},
		actions: {

			loadSomeData: () => {
				
				fetch()
					.then()
					.then(data => setStore({ "foo": data.bar }))
				
			},
			
		}
	};
};

export default getState;
