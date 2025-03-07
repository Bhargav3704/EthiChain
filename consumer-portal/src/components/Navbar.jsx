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
        <img src="Logo2.png" alt="Logo" />
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        {/* <Link to="/">Login</Link>
        <Link to="/signup">Signup</Link> */}
        <Link to="/">Home</Link>
        <Link to="/Transparency">Transparency</Link>
        <Link to= "/Report">Report</Link>
        <Link to="/ProductVerification">Verify</Link>
        <Link to="/Leaderboard">Leaderboard</Link>
        <Link to="/Chatbot">Ask us</Link>
        <Link to="/SupplyChain">View Supply Chain</Link>


      </div>
    </div>
  );
};

export default Navbar;