import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import AppRouter from "./router/AppRouter.jsx";
import { ProductsProvider } from "./context/ProductsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProductsProvider>
    <AppRouter />
  </ProductsProvider>
);

  
