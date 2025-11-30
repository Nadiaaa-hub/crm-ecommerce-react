import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductsPage from ".././pages/Products/ProductsPage";
import ProductDetailsPage from ".././pages/Products/ProductDetailsPage";

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
