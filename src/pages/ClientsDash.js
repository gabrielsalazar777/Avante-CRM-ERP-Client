import { useState } from "react";
import ClientList from "../components/ClientList";
import ClientDetails from "../components/ClientDetails";

const ClientsDash = () => {
    const [selectedClient, setSelectedClient] = useState(null);

    const getClientDetails = (client) => {
        setSelectedClient(client);
    }
  return (
    <div>
        <ClientList getClientDetails={getClientDetails}/>
        {selectedClient && (<ClientDetails client={selectedClient} getClientDetails={getClientDetails}/>)}
    </div>
  )
}

export default ClientsDash
