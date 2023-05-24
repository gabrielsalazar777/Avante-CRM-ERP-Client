import { useState, useEffect, useContext } from "react";
import { get, post } from "../services/authService";
import { ProjectsContext } from "../context/projects.context";

const ClientList = ({ getClientDetails, selectedClient }) => {
  const { allClients, getClients } = useContext(ProjectsContext);
//   const [newClient, setNewClient] = useState({});

//   const handleTextChange = (e) => {
//     setNewClient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     post("/clients/create", newClient)
//       .then((response) => {
//         getClients();
//         console.log(response.data);
//         const newDetails = response.data;
//         getClientDetails(...[newDetails]);
//         setNewClient({ name: "" });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

  const handleDelete = (e) => {
    get(`/clients/delete/${e}`).then((response) => {
      console.log(response);
      getClients();
      if (!allClients.includes(selectedClient)) {
        getClientDetails();
      }
    });
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div>
      ClientsDash
      {allClients.length ? (
        <>
          {/* <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={newClient.name}
              onChange={handleTextChange}
            />
            <button type="submit">Create Client</button>
          </form> */}
          {allClients.map((client) => {
            return (
              <div>
                <div onClick={() => getClientDetails(client)}>
                  <h1>{client.name}</h1>
                  <p>This is a client</p>
                </div>
                <button onClick={() => handleDelete(client._id)}>Delete</button>
                <hr />
              </div>
            );
          })}
        </>
      ) : (
        <p>Add a client to begin.</p>
      )}
    </div>
  );
};

export default ClientList;
