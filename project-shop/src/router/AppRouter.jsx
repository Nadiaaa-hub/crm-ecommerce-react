import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductsPage from "../pages/Products/ProductsPage.jsx";
import ProductDetailsPage from "../pages/Products/ProductDetailsPage.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="*" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

