
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // ✅ Navigation Bar
import Home from "./pages/Home"; // ✅ Home Page
import Products from "./pages/products"; // ✅ Products Page
import AddProduct from "./pages/add"; // ✅ Add Product Page
import { ProductsProvider } from "./context/ProductsContext"; 

import "./styles/global.css"; // ✅ Global styles

const App = () => {
  return (
    <ProductsProvider> {/* Wrap Entire App in Context */}
    <Router>
      <Navbar /> {/* Persistent Navbar */}
      <div className="pt-16"> {/* Prevent overlap with navbar */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* ✅ Default Route for Home */}
          <Route path="/products" element={<Products />} /> {/* ✅ Route for Products */}
          <Route path="/add" element={<AddProduct />} /> {/* ✅ Route for Add Product */}
        </Routes>
      </div>
    </Router>
    </ProductsProvider>
  );
};

export default App;
