import { useState, useEffect, useContext } from 'react';
import { get, post } from '../services/authService';
import { ProjectsContext } from '../context/projects.context';

const ClientList = ({ getClientDetails, selectedClient }) => {
   const { allClients, getClients } = useContext(ProjectsContext);
   const [sortedClients, setSortedClients] = useState([]);
   const [sortSelection, setSortSelection] = useState('A-Z');

   const sortOptions = ['A-Z', 'Z-A'];

   const handleDelete = (e) => {
      get(`/clients/delete/${e}`).then((response) => {
         getClients();
         if (!allClients.includes(selectedClient)) {
            getClientDetails();
         }
      });
   };

   const handleSortSelection = (e) => {
      setSortSelection(e.target.value);
   };

   const handleSort = () => {
      if (sortSelection) {
         if (sortSelection === 'A-Z') {
            const newSort = [...allClients].sort((a, b) => a.name.localeCompare(b.name));
            setSortedClients(newSort);
         }
         if (sortSelection === 'Z-A') {
            const newSort = [...allClients].sort((a, b) => b.name.localeCompare(a.name));
            setSortedClients(newSort);
         }
      }
   };

   useEffect(() => {
      getClients();
      handleSort();
   }, []);

   useEffect(() => {
      handleSort();
   }, [allClients]);

   useEffect(() => {
      handleSort();
   }, [sortSelection]);

   return (
      <div>
         {sortedClients.length ? (
            <>
               <label htmlFor="sort">
                  <b>Sort</b>
               </label>
               <select
                  className="form-select"
                  name="sort"
                  id="sort"
                  value={sortSelection}
                  onChange={handleSortSelection}>
                  {sortOptions.map((option) => {
                     return <option value={option}>{option}</option>;
                  })}
               </select>
               <hr />
               {sortedClients.map((client) => {
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
