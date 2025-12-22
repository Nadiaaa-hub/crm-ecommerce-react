import React, { createContext, useContext, useState} from "react";
import { products as initialProducts } from "../data/products";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
    const [productList, setProductList] = useState(initialProducts);
  
    const value = {
      productList,
      setProductList,
    };
  
    return (
      <ProductsContext.Provider value={value}>
        {children}
      </ProductsContext.Provider>
    );
  }
  
  export function useProducts() {
    const ctx = useContext(ProductsContext);
    if (!ctx) {
      throw new Error("useProducts must be used within ProductsProvider");
    }
    return ctx;
  }