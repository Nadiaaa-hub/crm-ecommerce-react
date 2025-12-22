// import { Routes, Route, Navigate } from "react-router-dom";
// import Layout from "../components/Layout";
// import ClientsListPage from "../pages/Clients/ClientsListPage";
// import AddClientForm from "../components/AddClientForm";
// import ClientCardPage from "../pages/Clients/ClientCardPage";
// import PlaceholderPage from "../pages/Clients/PlaceholderPage";

// export default function AppRouter({ clients, handleAddClient, deleteClient }) {
//   return (
//     <Routes>
//       <Route element={<Layout />}>
//         <Route path="/" element={<Navigate to="/dashboard" />} />
//         <Route
//           path="dashboard"
//           element={<PlaceholderPage title="Dashboard" />}
//         />
//         <Route
//           path="clients"
//           element={
//             <ClientsListPage clients={clients} deleteClient={deleteClient} />
//           }
//         />
//         <Route
//           path="clients/:id"
//           element={<ClientCardPage clients={clients} />}
//         />
//         <Route
//           path="add-client"
//           element={<AddClientForm onAddClient={handleAddClient} />}
//         />

//         <Route path="orders" element={<PlaceholderPage title="Orders" />} />

//         <Route path="*" element={<Navigate to="/dashboard" />} />
//       </Route>
//     </Routes>
//   );
// }
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import ClientsListPage from "../pages/Clients/ClientsListPage";
import AddClientForm from "../components/AddClientForm";
import ClientCardPage from "../pages/Clients/ClientCardPage";
import PlaceholderPage from "../pages/Clients/PlaceholderPage";
import ProductsPage from "../pages/Products/ProductsPage";
import ProductDetailsPage from "../pages/Products/ProductDetailsPage";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="clients" element={<ClientsListPage />} />
        <Route path="clients/:id" element={<ClientCardPage />} />
        <Route path="add-client" element={<AddClientForm />} />
        <Route path="orders" element={<PlaceholderPage title="Orders" />} />

        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetailsPage />} />

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  );
}
