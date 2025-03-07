import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import '../styles/Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 text-gray-800 font-sans">
            {/* Navigation Bar */}
            <nav className="bg-white py-6 px-8 shadow-md">
                <div className="max-w-7xl mx-auto nav-container">
                    <div className="flex items-center"></div>
                    <div className="md:hidden">
                        <button className="mobile-menu-button">
                            <svg className="mobile-menu-icon" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="py-20 hero-section">
                <div className="max-w-7xl mx-auto hero-container">
                    <div className="hero-text-content">
                        <h1 className="hero-title">Fighting Fake Sustainability Claims with AI & Blockchain</h1>
                        <p className="hero-subtitle">
                            Sustainability fraud is everywhere. Fake claims, misleading labels, and greenwashing deceive millions. Our solution guarantees real transparency.
                        </p>
                        <button 
                            className="hero-button"
                            onClick={() => navigate("/EthiChain3d")} // Redirect to the new page
                        >
                            See How It Works
                        </button>
                    </div>
                    <div className="hero-image-container">
                        <img src="ss.png" alt="Supply Chain Transparency" className="hero-image" />
                    </div>
                </div>
            </section>

            {/* Clients & Partners Section */}
            <section className="py-16 clients-section">
                <div className="max-w-7xl mx-auto clients-container">
                    <h2 className="clients-title">Our Sponsors & Partners</h2>

                    <div className="sponsor-category">
                        <h3 className="sponsor-tier">Platinum</h3>
                        <div className="sponsor-logo">
                            <img src="glazerlabs.jpeg" alt="Glazer Labs" />
                        </div>
                    </div>

                    <div className="sponsor-category">
                        <h3 className="sponsor-tier">Gold</h3>
                        <div className="sponsor-logos">
                            <img src="eth.svg" alt="ETH India" />
                            <img src="Block.png" alt="BlockBridge" />
                            <img src="Devfolio.png" alt="Devfolio" />
                        </div>
                    </div>

                    <div className="sponsor-category">
                        <h3 className="sponsor-tier">Silver</h3>
                        <div className="sponsor-logos">
                            <img src="3.png" alt=".xyz" />
                            <img src="2.png" alt="AoPS" />
                            <img src="1.png" alt="Scoops" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Solution Section */}
            <section className="py-20 services-section bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto services-content">
                    <h2 className="services-section-title">Our Solution</h2>
                    <div className="services-grid mb-8">
                        <div className="service-box">
                            <div className="service-title">AI-Verified Sustainability Reports</div>
                            <p className="service-description">Our NLP model detects fraud, greenwashing, and inconsistencies in sustainability claims.</p>
                        </div>
                        <div className="service-box">
                            <div className="service-title">Blockchain-Powered Transparency</div>
                            <p className="service-description">Verified claims are stored on an immutable ledger, ensuring no tampering.</p>
                        </div>
                        <div className="service-box">
                            <div className="service-title">QR Code-Based Verification</div>
                            <p className="service-description">Consumers can scan a QR code to see real proof of ethical sourcing.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
