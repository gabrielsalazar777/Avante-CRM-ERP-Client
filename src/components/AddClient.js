import { useState, useEffect, useContext } from 'react';
import { get, post } from '../services/authService';
import { ProjectsContext } from '../context/projects.context';

const AddClient = ({ getClientDetails }) => {
   const { allClients, getClients } = useContext(ProjectsContext);
   const [newClient, setNewClient] = useState({});

   const handleTextChange = (e) => {
      setNewClient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      post('/clients/create', newClient)
         .then((response) => {
            getClients();
            const newDetails = response.data;
            getClientDetails(...[newDetails]);
            setNewClient({ name: '', phone: '', email: '' });
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <div>
         <p>
            <button
               className="btn btn-secondary space-above"
               type="button"
               data-bs-toggle="collapse"
               data-bs-target="#addClient"
               aria-expanded="false"
               aria-controls="addClient">
               Add Client
            </button>
         </p>
         <div className="collapse" id="addClient">
            <h3 className="d-flex justify-content-center space-above">Add Client</h3>
            <br />
            <form onSubmit={handleSubmit}>
               <div className="form-floating">
                  <input
                     className="form-control"
                     id="name"
                     name="name"
                     type="text"
                     placeholder="Enter new client name."
                     value={newClient.name}
                     onChange={handleTextChange}
                  />
                  <label htmlFor="name">Name</label>
               </div>

               <br />

               <div className="row">
                  <div className="col">
                     <div className="form-floating">
                        <input
                           className="form-control"
                           id="phone"
                           name="phone"
                           type="text"
                           placeholder="Enter client phone."
                           value={newClient.phone}
                           onChange={handleTextChange}
                        />
                        <label htmlFor="phone">Phone</label>
                     </div>
                  </div>
                  <div className="col">
                     <div className="form-floating">
                        <input
                           className="form-control"
                           id="email"
                           name="email"
                           type="text"
                           placeholder="Enter client email."
                           value={newClient.email}
                           onChange={handleTextChange}
                        />
                        <label htmlFor="email">Email</label>
                     </div>
                  </div>
               </div>

               <br />

               <button className="btn btn-light btn-outline-success" type="submit">
                  Create Client
               </button>
            </form>
         </div>
         <hr />
      </div>
   );
};

export default AddClient;
