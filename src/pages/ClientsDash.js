import { useState } from "react";
import ClientList from "../components/ClientList";
import ClientDetails from "../components/ClientDetails";
import AddClient from "../components/AddClient";

const ClientsDash = () => {
  const [selectedClient, setSelectedClient] = useState(null);

  const getClientDetails = (client) => {
    setSelectedClient(client);
  };
  return (
    <div>
      <AddClient getClientDetails={getClientDetails} />
      <ClientList
        getClientDetails={getClientDetails}
        selectedClient={selectedClient}
      />
      {selectedClient && (
        <ClientDetails
          client={selectedClient}
          getClientDetails={getClientDetails}
        />
      )}
    </div>
  );
};

export default ClientsDash;
