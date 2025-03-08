import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import '../styles/Home.css';

const Home = () => {
    const navigate = useNavigate();
    const typedTextRef = useRef(null);
    
    useEffect(() => {
        // Simple typed text effect
        const texts = [
            "Fighting Fake Sustainability Claims",
            "Ensuring Authentic Green Certifications",
            "Eliminating Greenwashing Through Technology"
        ];
        
        let currentIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 50;
        
        const type = () => {
            const currentText = texts[currentIndex];
            
            if (isDeleting) {
                charIndex--;
                typingSpeed = 25;
            } else {
                charIndex++;
                typingSpeed = 50;
            }
            
            if (typedTextRef.current) {
                typedTextRef.current.textContent = currentText.substring(0, charIndex);
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause before deleting
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % texts.length;
                typingSpeed = 500; // Pause before typing next text
            }
            
            setTimeout(type, typingSpeed);
        };
        
        setTimeout(type, 500); // Initial delay
    }, []);

    const producerBenefits = [
        {
            title: "Verify Authenticity",
            description: "Upload your certificates to get AI-powered verification that confirms authenticity and detects fraudulent documents."
        },
        {
            title: "Blockchain Protection",
            description: "Store your verified certifications on an immutable blockchain ledger, preventing tampering and ensuring transparency."
        },
        {
            title: "Consumer Trust",
            description: "Generate QR codes for your products that consumers can scan to instantly verify your sustainability claims."
        },
        {
            title: "Market Advantage",
            description: "Stand out from competitors with verified sustainability credentials that boost consumer confidence and sales."
        }
    ];

    return (
        <div className="home-container">
            

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="glow-text">
                            <span ref={typedTextRef}>Fighting Fake Sustainability Claims</span>
                            <span className="typing-cursor">|</span>
                            <span className="highlight"> with AI & Blockchain</span>
                        </h1>
                        <p className="hero-subtitle">
                            Sustainability fraud is everywhere. Fake claims, misleading labels, and greenwashing 
                            deceive millions. Our solution guarantees real transparency.
                        </p>
                        <div className="hero-buttons">
                            <motion.button 
                                className="primary-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/EthiChain3d")}
                            >
                                See How It Works
                            </motion.button>
                            <motion.button 
                                className="secondary-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/producer")}
                            >
                                Producer Portal
                            </motion.button>
                        </div>
                    </div>
                    <motion.div 
                        className="hero-image-container"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="image-glow"></div>
                        <img src="ss.png" alt="Supply Chain Transparency" className="hero-image" />
                    </motion.div>
                </div>
            </section>

            {/* Producer Portal Benefits Section */}
            <section className="producer-portal-section">
                <div className="section-header">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Why Use Our Producer Portal
                    </motion.h2>
                    <motion.div 
                        className="section-divider"
                        initial={{ width: 0 }}
                        whileInView={{ width: "120px" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    ></motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="section-subtitle"
                    >
                        Our producer portal provides powerful tools for sustainable businesses to verify and showcase their authentic credentials
                    </motion.p>
                </div>
                
                <div className="benefits-grid">
                    {producerBenefits.map((benefit, index) => (
                        <motion.div 
                            className="benefit-card" 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 255, 255, 0.2)' }}
                        >
                            <div className="benefit-number">{index + 1}</div>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
                
                <motion.div 
                    className="portal-cta"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <motion.button 
                        className="cta-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/producer")}
                    >
                        Access Producer Portal
                    </motion.button>
                </motion.div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section">
                <div className="section-header">
                    <h2>How Our Solution Works</h2>
                    <div className="section-divider"></div>
                </div>
                
                <div className="process-steps">
                    <div className="process-step">
                        <div className="step-number">1</div>
                        <h3>Upload Certificates</h3>
                        <p>Upload your sustainability certificates through our secure producer portal</p>
                    </div>
                    <div className="step-connector"></div>
                    <div className="process-step">
                        <div className="step-number">2</div>
                        <h3>AI Verification</h3>
                        <p>Our AI analyzes and verifies the authenticity of your sustainability claims</p>
                    </div>
                    <div className="step-connector"></div>
                    <div className="process-step">
                        <div className="step-number">3</div>
                        <h3>Blockchain Storage</h3>
                        <p>Verified credentials are stored on immutable blockchain for transparency</p>
                    </div>
                    <div className="step-connector"></div>
                    <div className="process-step">
                        <div className="step-number">4</div>
                        <h3>Generate QR Codes</h3>
                        <p>Create QR codes for your products that consumers can scan to verify claims</p>
                    </div>
                </div>
            </section>

            {/* Our Solution Section */}
            <section className="services-section">
                <div className="services-content">
                    <h2 className="services-section-title">Our Solution</h2>
                    <div className="services-grid">
                        <motion.div 
                            className="service-box"
                            whileHover={{ 
                                y: -10, 
                                boxShadow: '0 25px 50px rgba(0, 255, 255, 0.25)' 
                            }}
                        >
                            <div className="service-title">AI-Verified Sustainability Reports</div>
                            <p className="service-description">Our NLP model detects fraud, greenwashing, and inconsistencies in sustainability claims.</p>
                        </motion.div>
                        <motion.div 
                            className="service-box"
                            whileHover={{ 
                                y: -10, 
                                boxShadow: '0 25px 50px rgba(0, 255, 255, 0.25)' 
                            }}
                        >
                            <div className="service-title">Blockchain-Powered Transparency</div>
                            <p className="service-description">Verified claims are stored on an immutable ledger, ensuring no tampering.</p>
                        </motion.div>
                        <motion.div 
                            className="service-box"
                            whileHover={{ 
                                y: -10, 
                                boxShadow: '0 25px 50px rgba(0, 255, 255, 0.25)' 
                            }}
                        >
                            <div className="service-title">QR Code-Based Verification</div>
                            <p className="service-description">Consumers can scan a QR code to see real proof of ethical sourcing.</p>
                        </motion.div>
                    </div>
                </div>
            </section>
            
            {/* Clients & Partners Section */}
            <section className="clients-section">
                <div className="clients-container">
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
                </div>
            </section>
        </div>
    );
};

export default Home;