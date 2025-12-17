// import { useEffect, useState } from "react";
// import { BrowserRouter } from "react-router-dom";

// import AppRoutes from "./AppRoutes";
// import "./App.css";

// function App() {
//   const [clients, setClients] = useState([]);

//   useEffect(() => {
//     console.log("APP MOUNTED");
//     const loadData = async () => {
//       try {
//         const request = await fetch("http://localhost:5051/clients");
//         const response = await request.json();
//         console.log("Fetched clients:", response);
//         setClients(response);
//       } catch (err) {
//         console.error("Fetch error:", err);
//       }
//     };
//     loadData();
//   }, []);

//   const handleAddClient = (newClient) => {
//     const nextId = clients.length
//       ? clients.reduce(
//           (max, client) => (client.id > max ? client.id : max),
//           clients[0].id
//         ) + 1
//       : 1;
//     setClients((prev) => [...prev, { ...newClient, id: nextId, orders: [] }]);
//   };

//   const deleteClient = (id) => {
//     setClients((prev) => prev.filter((client) => client.id !== id));
//   };

//   return (
//     <BrowserRouter>
//       <AppRoutes
//         clients={clients}
//         handleAddClient={handleAddClient}
//         deleteClient={deleteClient}
//       />
//     </BrowserRouter>
//   );
// }

// export default App;import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddClientForm from "./components/AddClientForm";
import ClientsList from "./components/ClientsList"; // твій компонент списку
import "./App.css";

function App() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const res = await fetch("http://localhost:5051/clients");
        const data = await res.json();
        setClients(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadClients();
  }, []);

  const addClient = async (newClient) => {
    try {
      const res = await fetch("http://localhost:5051/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient),
      });
      const savedClient = await res.json();
      setClients((prev) => [...prev, savedClient]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteClient = async (id) => {
    try {
      await fetch(`http://localhost:5051/clients/${id}`, { method: "DELETE" });
      setClients((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/add-client"
          element={<AddClientForm onAddClient={addClient} />}
        />
        <Route
          path="/clients"
          element={
            <ClientsList clients={clients} deleteClient={deleteClient} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
