import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Products from "./components/products/products";
import AddProduct from "./components/add/add";
import Home from "./components/home/home";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/Products" element={< Products/>} />
        <Route path="/Add" element={<AddProduct/>} />
      </Routes> 
    </Router>
  )
}       

export default App;
