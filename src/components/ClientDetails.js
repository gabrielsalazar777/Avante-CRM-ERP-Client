import { useContext, useEffect, useState } from 'react';
import { post } from '../services/authService';
import { ProjectsContext } from '../context/projects.context';
import { get } from '../services/authService';

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
         <h3 className="d-flex justify-content-center">{client.name}</h3>
         <form onSubmit={handleSubmit}>
            <div className="form-floating">
               <input
                  className="form-control"
                  id="name"
                  name="name"
                  type="text"
                  value={updatedClient.name}
                  onChange={handleTextChange}
               />
               <label htmlFor="name">Name</label>
            </div>

            <br />

            <div className="form-floating">
               <input
                  className="form-control"
                  id="phone"
                  name="phone"
                  type="text"
                  value={updatedClient.phone}
                  onChange={handleTextChange}
               />
               <label htmlFor="phone">Phone</label>
            </div>

            <br />

            <div className="form-floating">
               <input
                  className="form-control"
                  id="email"
                  name="email"
                  type="text"
                  value={updatedClient.email}
                  onChange={handleTextChange}
               />
               <label htmlFor="email">Email</label>
            </div>

            <hr />

            <ul className="d-flex flex-column align-items-center list-unstyled">
               <h5 className="d-flex justify-content-center">Project List:</h5>
               {clientProjects.map((project) => {
                  return <li className="space-above">{project.name}</li>;
               })}
            </ul>
            <div className="d-flex justify-content-center">
               <button className="btn btn-light btn-outline-success" type="submit">
                  Confirm Edit
               </button>
            </div>
         </form>
      </div>
   );
};

export default ClientDetails;
