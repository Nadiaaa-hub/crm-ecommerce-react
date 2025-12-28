import React from "react";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { ProductsProvider } from "./context/ProductsContext.jsx";
import { ClientsProvider } from "./context/ClientsContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { store } from "./features/store/store.js";
import { Provider } from "react-redux";

import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ProductsProvider>
      <ClientsProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </ClientsProvider>
    </ProductsProvider>
  </Provider>
);
