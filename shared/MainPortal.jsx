import React from "react";
import { useNavigate } from "react-router-dom";
import "./mainPortal.css"; // Import the CSS file for styling

const MainPortal = () => {
  const navigate = useNavigate();

  return (
    <div className="main-portal-container">
      <h1>Welcome to EthiChain</h1>
      <p>Select your role to continue:</p>

      <div className="button-container">
        <button className="portal-button consumer" onClick={() => navigate("/consumer")}>
          Consumer Portal
        </button>
        <button className="portal-button producer" onClick={() => navigate("/producer/login")}>
          Producer Portal
        </button>
      </div>
    </div>
  );
};

export default MainPortal;
