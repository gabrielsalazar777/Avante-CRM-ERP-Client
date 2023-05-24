import { useState, useEffect, useContext } from "react";
import { get, post } from "../services/authService";
import { ProjectsContext } from "../context/projects.context";

const AddClient = ({ getClientDetails }) => {
  const { allClients, getClients } = useContext(ProjectsContext);
  const [newClient, setNewClient] = useState({});

  const handleTextChange = (e) => {
    setNewClient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/clients/create", newClient)
      .then((response) => {
        getClients();
        console.log(response.data);
        const newDetails = response.data;
        getClientDetails(...[newDetails]);
        setNewClient({ name: "", phone: "", email: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={newClient.name}
          onChange={handleTextChange}
        />
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          type="text"
          value={newClient.phone}
          onChange={handleTextChange}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          value={newClient.email}
          onChange={handleTextChange}
        />
        <button type="submit">Create Client</button>
      </form>
    </div>
  );
};

export default AddClient;
