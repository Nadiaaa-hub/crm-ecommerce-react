import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import ClientsListPage from "../pages/Clients/ClientsListPage";
import AddClientForm from "../components/AddClientForm";
import ClientCardPage from "../pages/Clients/ClientCardPage";
import ProductsPage from "../pages/Products/ProductsPage";
import ProductDetailsPage from "../pages/Products/ProductDetailsPage";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import AuthPage from "../components/AuthPage";
import PrivateRoute from "../router/PrivacyRoute.jsx";
import { useAuth } from "../context/AuthProvider";
import OrdersPage from "../pages/Orders/OrdersPage.jsx";
import FullOrderCard from "../components/FullOrderCard/FullOrderCard.jsx";
import NewOrderForm from "../components/NewOrderForm/NewOrderForm.jsx";

export default function AppRouter() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/auth"
          element={user ? <Navigate to="/profile" /> : <AuthPage />}
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <OrdersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders/:orderId"
          element={
            <PrivateRoute>
              <FullOrderCard />
            </PrivateRoute>
          }
        />
        <Route
          path="/newOrder"
          element={
            <PrivateRoute>
              <NewOrderForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <PrivateRoute>
              <ClientsListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/clients/:id"
          element={
            <PrivateRoute>
              <ClientCardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-client"
          element={
            <PrivateRoute>
              <AddClientForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <PrivateRoute>
              <ProductDetailsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/"
          element={<Navigate to={user ? "/profile" : "/auth"} />}
        />
        <Route
          path="*"
          element={<Navigate to={user ? "/profile" : "/auth"} />}
        />
      </Route>
    </Routes>
  );
}
