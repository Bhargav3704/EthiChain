import React, { createContext, useState, useContext } from "react";

// Create Context
const ProductsContext = createContext();

// Provider Component
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Eco-Friendly Water Bottle",
      description: "Made from 100% recycled materials, BPA-free and sustainable.",
      verified: true,
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      description: "Grown without harmful pesticides, using water-saving techniques.",
      verified: true,
    },
    {
      id: 3,
      name: "Solar-Powered Charger",
      description: "Harness the sun's energy to power your devices anywhere.",
      verified: false,
    },
    {
      id: 4,
      name: "Bamboo Cutlery Set",
      description: "Biodegradable alternative to plastic cutlery, naturally antibacterial.",
      verified: true,
    }
  ]);

  // Function to add a new product
  const addProduct = (product) => {
    setProducts([...products, { id: products.length + 1, ...product }]);
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

// Custom Hook to Use Products Context
export const useProducts = () => {
  return useContext(ProductsContext);
};
