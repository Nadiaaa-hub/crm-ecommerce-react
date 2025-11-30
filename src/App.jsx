import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ClientsListPage from "./components/ClientsListPage";
import AddClientForm from "./components/AddClientForm";
import ClientCardPage from "./components/ClientCardPage";
import "./App.css";

function App() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("/clients.json");
      const result = await response.json();
      setClients(result);
    };
    loadData();
  }, []);

  const handleAddClient = (newClient) => setClients([...clients, newClient]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/clients-page" />} />
        <Route
          path="/clients-page"
          element={<ClientsListPage clients={clients} />}
        />
        <Route
          path="/add-clients-page"
          element={
            <AddClientForm clients={clients} onAddClient={handleAddClient} />
          }
        />
        <Route
          path="/client-card/:id"
          element={<ClientCardPage clients={clients} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
