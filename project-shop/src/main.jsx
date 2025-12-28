import React from "react";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { ProductsProvider } from "./context/ProductsContext.jsx";
import { ClientsProvider } from "./context/ClientsContext.jsx";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./context/AuthProvider";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProductsProvider>
    <ClientsProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ClientsProvider>
  </ProductsProvider>
);
