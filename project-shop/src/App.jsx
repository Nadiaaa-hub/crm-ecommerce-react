import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./AppRoutes";
import "./App.css";

function App() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const request = await fetch("http://localhost:5051/clients");
      const response = await request.json();
      setClients(response);
    };
    loadData();
  }, []);

  const handleAddClient = (newClient) => {
    const nextId = clients.length
      ? clients.reduce(
          (max, client) => (client.id > max ? client.id : max),
          clients[0].id
        ) + 1
      : 1;
    setClients((prev) => [...prev, { ...newClient, id: nextId, orders: [] }]);
  };

  const deleteClient = (id) => {
    setClients((prev) => prev.filter((client) => client.id !== id));
  };

  return (
    <BrowserRouter>
      <AppRoutes
        clients={clients}
        handleAddClient={handleAddClient}
        deleteClient={deleteClient}
      />
    </BrowserRouter>
  );
}

export default App;
