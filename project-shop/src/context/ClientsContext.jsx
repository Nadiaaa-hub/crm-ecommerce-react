import React, { createContext, useContext, useState, useEffect } from "react";

const ClientsContext = createContext(null);

export function ClientsProvider({ children }) {
  const [clients, setClients] = useState([]);

  const fetchClients = async () => {
    try {
      const res = await fetch("http://localhost:5051/clients");
      const data = await res.json();
      setClients(data);
    } catch (e) {
      console.error("Fetch error:", e);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const addClient = async (newClient) => {
    try {
      await fetch("http://localhost:5051/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient),
      });
      fetchClients();
    } catch (e) {
      console.error("The client did not add:", e);
    }
  };

  const deleteClient = async (id) => {
    try {
      await fetch(`http://localhost:5051/clients/${id}`, { method: "DELETE" });
      fetchClients();
    } catch (e) {
      console.error("The client did not delete:", e);
    }
  };

  return (
    <ClientsContext.Provider value={{ clients, addClient, deleteClient }}>
      {children}
    </ClientsContext.Provider>
  );
}

export function useClients() {
  const ctx = useContext(ClientsContext);
  if (!ctx) throw new Error("useClients must be used within ClientsProvider");
  return ctx;
}
