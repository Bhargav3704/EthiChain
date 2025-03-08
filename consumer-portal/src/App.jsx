import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Navigation Bar
import Home from "./pages/Home";
import ProductVerification from "./pages/ProductVerification";
import Transparency from "./pages/Transparency";
import Report from "./pages/Report";
import Leaderboard from "./pages/Leaderboard";
import Chatbot from "./pages/Chatbot";
import SupplyChain from "./components/SupplyChain"; // Supply Chain Page
import EthiChain3D from "./pages/EthiChain3d"; // Corrected import path
import "./styles/global.css"; // Global styles

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Persistent Navbar */}
      <div className="pt-16"> {/* Prevent overlap with navbar */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Default Route */}
          <Route path="/ProductVerification" element={<ProductVerification />} />
          <Route path="/Transparency" element={<Transparency />} />
          <Route path="/Report" element={<Report />} />
          <Route path="/Leaderboard" element={<Leaderboard />} />
          <Route path="/Chatbot" element={<Chatbot />} />
          <Route path="/SupplyChain" element={<SupplyChain />} />
          <Route path="/EthiChain3d" element={<EthiChain3D />} /> {/* Fixed route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
