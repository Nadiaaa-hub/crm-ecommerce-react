import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { ProductsProvider } from "./context/ProductsContext.jsx";
import { ClientsProvider } from "./context/ClientsContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProductsProvider>
    <ClientsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClientsProvider>
  </ProductsProvider>
);
