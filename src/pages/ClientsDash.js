import { useState } from 'react';
import ClientList from '../components/ClientList';
import ClientDetails from '../components/ClientDetails';
import AddClient from '../components/AddClient';

const ClientsDash = () => {
   const [selectedClient, setSelectedClient] = useState(null);

   const getClientDetails = (client) => {
      setSelectedClient(client);
   };
   return (
      <div className="container">
      <h2 className='d-flex justify-content-center space-above'>Clients Dashboard</h2>
      <br />
         <div className="row">
            <div className="col-5" style={{borderRight: "1px solid lightgray"}}>
               <AddClient getClientDetails={getClientDetails} />
               <ClientList
                  getClientDetails={getClientDetails}
                  selectedClient={selectedClient}
               />
            </div>
            <div className="col-7">
               {selectedClient && (
                  <ClientDetails
                     client={selectedClient}
                     getClientDetails={getClientDetails}
                  />
               )}
            </div>
         </div>
      </div>
   );
};

export default ClientsDash;
