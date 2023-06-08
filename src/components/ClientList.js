import { useState, useEffect, useContext } from 'react';
import { get, post } from '../services/authService';
import { ProjectsContext } from '../context/projects.context';

const ClientList = ({ getClientDetails, selectedClient }) => {
   const { allClients, getClients } = useContext(ProjectsContext);

   const handleDelete = (e) => {
      get(`/clients/delete/${e}`).then((response) => {
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
         {allClients.length ? (
            <>
               {allClients.map((client) => {
                  return (
                     <div>
                        <div
                           className="listed-project"
                           onClick={() => getClientDetails(client)}>
                           <h3>{client.name}</h3>
                        </div>
                        <button
                           className="btn btn-light btn-outline-danger"
                           onClick={() => handleDelete(client._id)}>
                           Delete
                        </button>
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
