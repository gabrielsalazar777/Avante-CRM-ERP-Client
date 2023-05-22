import { useContext, useEffect, useState } from "react";
import { post } from "../services/authService";
import { ProjectsContext } from "../context/projects.context";
import { get } from "../services/authService";

const ClientDetails = ({ client, getClientDetails }) => {
  const [updatedClient, setUpdatedClient] = useState(client);
  const [clientProjects, setClientProjects] = useState([]);

  const { getClients } = useContext(ProjectsContext);

  const getClientProjects = () => {
    get(`/clients/display/${client._id}`)
      .then((response) => {
        setClientProjects(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTextChange = (e) => {
    setUpdatedClient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post(`/clients/edit/${client._id}`, updatedClient).then(() => {
      getClients();
      getClientDetails(updatedClient);
    });
  };

  useEffect(() => {
    setUpdatedClient(client);
    getClientProjects();
  }, [client]);

  return (
    <div>
      <h1>Selected Client:</h1>
      <h2>{client.name}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={updatedClient.name}
          onChange={handleTextChange}
        />
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          type="text"
          value={updatedClient.phone}
          onChange={handleTextChange}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          value={updatedClient.email}
          onChange={handleTextChange}
        />

        <button type="submit">Confirm Edit</button>
      </form>
      <ul>
        <p>Project list:</p>
        {clientProjects.map((project) => {
          return <li>{project.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default ClientDetails;
