import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import ClientsListPage from "../pages/Clients/ClientsListPage";
import AddClientForm from "../components/AddClientForm";
import ClientCardPage from "../pages/Clients/ClientCardPage";
import PlaceholderPage from "../pages/Clients/PlaceholderPage";
import ProductsPage from "../pages/Products/ProductsPage";
import ProductDetailsPage from "../pages/Products/ProductDetailsPage";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
<<<<<<< HEAD
import Profile from "../pages/Profile/Profile.jsx";
import AuthPage from "../components/AuthPage";
=======
import NewOrderForm from "../components/NewOrderForm/NewOrderForm.jsx";
import OrdersPage from "../pages/Orders/OrdersPage.jsx";
import FullOrderCard from "../components/FullOrderCard/FullOrderCard.jsx";
>>>>>>> 9efa35f713f230dd9604c6cc634ddd0ae0c31b1f

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="clients" element={<ClientsListPage />} />
        <Route path="clients/:id" element={<ClientCardPage />} />
        <Route path="add-client" element={<AddClientForm />} />
<<<<<<< HEAD
        <Route path="orders" element={<PlaceholderPage title="Orders" />} />
=======
        <Route path="orders" element={<OrdersPage />} />
        <Route path="newOrder" element={<NewOrderForm/>} />
        <Route path="orders/:orderId" element={<FullOrderCard />} />

>>>>>>> 9efa35f713f230dd9604c6cc634ddd0ae0c31b1f
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetailsPage />} />
      </Route>
    </Routes>
  );
}
