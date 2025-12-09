import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ClientsListPage from "./components/ClientsListPage";
import AddClientForm from "./components/AddClientForm";
import ClientCardPage from "./components/ClientCardPage";
import PlaceholderPage from "./components/PlaceholderPage";

import ProductsPage from "../pages/Products/ProductsPage.jsx";
import ProductDetailsPage from "../pages/Products/ProductDetailsPage.jsx";

function AppRoutes({ clients, handleAddClient, deleteClient }) {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="dashboard"
          element={<PlaceholderPage title="Dashboard" />}
        />
        <Route path="catalog" element={<ProductsPage />} />
        <Route path="catalog/:id" element={<ProductDetailsPage />} />
        <Route
          path="orders"
          element={<PlaceholderPage title="Orders" />}
        />
        <Route
          path="clients"
          element={
            <ClientsListPage
              clients={clients}
              deleteClient={deleteClient}
            />
          }
        />
        <Route
          path="add-clients"
          element={
            <AddClientForm
              clients={clients}
              onAddClient={handleAddClient}
            />
          }
        />
        <Route
          path="clients/:id"
          element={<ClientCardPage clients={clients} />}
        />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;


