import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import ClientsListPage from "./components/ClientsListPage";
import AddClientForm from "./components/AddClientForm";
import ClientCardPage from "./components/ClientCardPage";
import PlaceholderPage from "./components/PlaceholderPage";
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
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="dashboard"
            element={<PlaceholderPage title="Dashboard" />}
          />
          <Route path="catalog" element={<PlaceholderPage title="Catalog" />} />
          <Route path="orders" element={<PlaceholderPage title="Orders" />} />
          <Route
            path="clients"
            element={
              <ClientsListPage clients={clients} deleteClient={deleteClient} />
            }
          />
          <Route
            path="add-clients"
            element={
              <AddClientForm clients={clients} onAddClient={handleAddClient} />
            }
          />
          <Route
            path="clients/:id"
            element={<ClientCardPage clients={clients} />}
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
