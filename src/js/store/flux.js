const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
			newContact : {
				id: "",
				email: "",
				fullname: "",
				address: "",
				phone: "",
			},
			isNew: true,
		},
		actions: {

			fetchContacts: () => {

				const url = "https://assets.breatheco.de/apis/fake/contact/agenda/agenda_beanama"
				
				fetch(url)
					.then((res) => res.json())
					.then(data => setStore({ contacts:data }))
				
			},

			addNewContact: async () => {
				const store = getStore();
				const newContact = store.newContact;
				const baseUrl = "https://assets.breatheco.de/apis/fake/contact/";
		
				const body = JSON.stringify({
				  ...newContact,
				  agenda_slug: "agenda_beanama",
				});
		
				await fetch(baseUrl, {
				  method: "POST",
				  body: body,
				  headers: {
					"Content-Type": "application/json",
				  },
				});
		
				setStore({
				  newContact: {
					id: "",
					email: "",
					full_name: "",
					address: "",
					phone: "",
				  },
				});
			  },

			updateContact: async () => {
				const store = getStore();
				const contactToUpdate = store.newContact;
				const baseUrl = "https://assets.breatheco.de/apis/fake/contact/";
				const updateUrl = `${baseUrl}${contactToUpdate.id}`;
		
				const body = JSON.stringify(contactToUpdate);
		
				await fetch(updateUrl, {
				  method: "PUT",
				  body: body,
				  headers: {
					"Content-Type": "application/json",
				  },
				});
			  },  

			handleNewContactChange: (key, value) => {
				const store = getStore();
				const prevContact = store.newContact;

				setStore({ newContact: {...prevContact, [key]: value}});
			},

			setContactForUpdate: (selectedContact) => {
				setStore({
				  newContact: selectedContact,
				  isNew: false,
				});
			},

			deleteContact: async (id) => {
				const baseUrl = "https://assets.breatheco.de/apis/fake/contact/";
				const deleteUrl = `${baseUrl}${id}`;
				const contacts = getStore().contacts;
		
				const filteredContacts = contacts.filter(
				  (contact) => contact.id !== id
				);
		
				await fetch(deleteUrl, { method: "DELETE" });
				setStore({ contacts: filteredContacts });
			},
		}
	};
};

export default getState;
