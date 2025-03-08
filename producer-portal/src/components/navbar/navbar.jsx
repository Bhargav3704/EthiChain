import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="/logo2.png" alt="Elevate Logo" />
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        {/* <Link to="/">Login</Link>
        <Link to="/signup">Signup</Link> */}
        <Link to="/home">Home</Link>
        <Link to="/Products">Products</Link>
        <Link to= "/Add">Add </Link>
        

      </div>
    </div>
  );
};

export default Navbar;