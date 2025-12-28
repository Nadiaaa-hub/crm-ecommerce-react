// // import { Routes, Route, Navigate } from "react-router-dom";
// // import Layout from "../components/Layout";
// // import ClientsListPage from "../pages/Clients/ClientsListPage";
// // import AddClientForm from "../components/AddClientForm";
// // import ClientCardPage from "../pages/Clients/ClientCardPage";
// // import PlaceholderPage from "../pages/Clients/PlaceholderPage";
// // import ProductsPage from "../pages/Products/ProductsPage";
// // import ProductDetailsPage from "../pages/Products/ProductDetailsPage";
// // import Dashboard from "../pages/Dashboard/Dashboard.jsx";
// // import Profile from "../pages/Profile/Profile.jsx";
// // import AuthPage from "../components/AuthPage";
// // import PrivateRoute from "../router/PrivacyRoute.jsx";
// // import { useAuth } from "../context/AuthContext.jsx";

// // export default function AppRouter() {
// //   const { isAuth } = useAuth();

// //   return (
// //     <Routes>
// //       <Route element={<Layout />}>
// //         <Route path="/" element={<Navigate to="/login" replace />} />
// //         <Route path="/login" element={<AuthPage />} />
// //         <Route path="/profile" element={<Profile />} />
// //         <Route path="*" element={<Navigate to="/login" replace />} />
// //         <Route path="dashboard" element={<Dashboard />} />
// //         <Route path="clients" element={<ClientsListPage />} />
// //         <Route path="clients/:id" element={<ClientCardPage />} />
// //         <Route path="add-client" element={<AddClientForm />} />
// //         <Route path="orders" element={<PlaceholderPage title="Orders" />} />
// //         <Route path="products" element={<ProductsPage />} />
// //         <Route path="products/:id" element={<ProductDetailsPage />} />
// //       </Route>
// //     </Routes>
// //   );
// // }

// import { Routes, Route, Navigate } from "react-router-dom";
// import Layout from "../components/Layout";
// import ClientsListPage from "../pages/Clients/ClientsListPage";
// import AddClientForm from "../components/AddClientForm";
// import ClientCardPage from "../pages/Clients/ClientCardPage";
// import ProductsPage from "../pages/Products/ProductsPage";
// import ProductDetailsPage from "../pages/Products/ProductDetailsPage";
// import Dashboard from "../pages/Dashboard/Dashboard.jsx";
// import Profile from "../pages/Profile/Profile.jsx";
// import AuthPage from "../components/AuthPage";
// import PrivateRoute from "../router/PrivacyRoute.jsx";
// import { useAuth } from "../context/AuthContext.jsx";

// export default function AppRouter() {
//   const { user, loading } = useAuth();

//   if (loading) return null; // чекаємо Firebase

//   return (
//     <Routes>
//       <Route element={<Layout />}>
//         {/* public route */}
//         <Route
//           path="/auth"
//           element={user ? <Navigate to="/profile" /> : <AuthPage />}
//         />

//         {/* private routes */}
//         <Route
//           path="/profile"
//           element={
//             <PrivateRoute>
//               <Profile />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/orders"
//           element={
//             <PrivateRoute>
//               <PlaceholderPage title="Orders" />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/clients"
//           element={
//             <PrivateRoute>
//               <ClientsListPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/clients/:id"
//           element={
//             <PrivateRoute>
//               <ClientCardPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/add-client"
//           element={
//             <PrivateRoute>
//               <AddClientForm />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/products"
//           element={
//             <PrivateRoute>
//               <ProductsPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/products/:id"
//           element={
//             <PrivateRoute>
//               <ProductDetailsPage />
//             </PrivateRoute>
//           }
//         />

//         {/* default / fallback */}
//         <Route
//           path="/"
//           element={<Navigate to={user ? "/profile" : "/auth"} />}
//         />
//         <Route
//           path="*"
//           element={<Navigate to={user ? "/profile" : "/auth"} />}
//         />
//       </Route>
//     </Routes>
//   );
// }

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

export default function AppRouter() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public */}
        <Route
          path="/auth"
          element={user ? <Navigate to="/profile" /> : <AuthPage />}
        />

        {/* Private */}
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
              <div>Orders Page</div>
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

        {/* Fallback */}
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
