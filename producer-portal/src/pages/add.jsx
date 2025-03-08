import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ProducerCertificationForm = () => {
  // Form state
  const [productName, setProductName] = useState("");
  const [supplierDetails, setSupplierDetails] = useState("");
  const [selectedCertificates, setSelectedCertificates] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const typedRef = useRef(null);
  
  // Certificate options
  const certificates = [
    { id: "fssc", name: "FSSC 22000" },
    { id: "rainforest", name: "Rainforest Alliance Certification" },
    { id: "sa8000", name: "SA8000" },
    { id: "ecocert", name: "ECOCERT" },
    { id: "iscc", name: "ISCC" },
  ];
  
  // Common styles
  const styles = {
    gradientText: {
      background: "linear-gradient(90deg, #4ade80, #22d3ee)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    },
    inputField: {
      width: "100%",
      padding: "12px 16px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderRadius: "6px",
      fontSize: "15px",
      color: "white",
      transition: "border-color 0.2s, box-shadow 0.2s",
      outline: "none",
      boxSizing: "border-box"
    },
    fieldLabel: {
      display: "block",
      marginBottom: "8px",
      fontSize: "15px",
      fontWeight: "500",
      color: "rgba(255, 255, 255, 0.9)"
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.2 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Typed text effect
  useEffect(() => {
    if (typedRef.current) {
      const strings = [
        "Verify Your Sustainability Claims",
        "Authenticate Your Green Certifications",
        "Prove Your Ethical Production Standards"
      ];
      
      let currentIndex = 0;
      let currentText = "";
      let isDeleting = false;
      
      const type = () => {
        const currentString = strings[currentIndex];
        
        if (isDeleting) {
          currentText = currentString.substring(0, currentText.length - 1);
        } else {
          currentText = currentString.substring(0, currentText.length + 1);
        }
        
        typedRef.current.textContent = currentText;
        
        let typeSpeed = isDeleting ? 25 : 50;
        
        if (isDeleting && currentText === "") {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % strings.length;
          typeSpeed = 500;
        } else if (!isDeleting && currentText === currentString) {
          isDeleting = true;
          typeSpeed = 2000;
        }
        
        setTimeout(type, typeSpeed);
      };
      
      setTimeout(type, 500);
    }
  }, []);
  
  // Event handlers
  const handleCertificateChange = (e) => {
    setSelectedCertificates(Array.from(e.target.selectedOptions, option => option.value));
  };
  
  const handleFileChange = (e) => {
    setUploadedFiles(Array.from(e.target.files));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Product submitted successfully!");
  };
  
  return (
    <div style={{
      fontFamily: "'Poppins', sans-serif",
      background: "linear-gradient(135deg, #0f0f10, #1c1c1e)",
      color: "white",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "row",
      padding: "40px",
      overflow: "hidden"
    }}>
      {/* Form Section - Left Side */}
      <div style={{ width: "55%", paddingRight: "40px" }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            width: "100%",
            padding: "30px",
            overflow: "hidden"
          }}
        >
          <div style={{ marginBottom: "30px" }}>
            <h2 style={{ color: "white", fontSize: "24px", fontWeight: "600", marginBottom: "10px" }}>
              Producer Certification
            </h2>
            <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "16px" }}>
              As a Genuine producer, you are supposed to meet the following certifications:
            </p>
            
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              padding: "15px 25px",
              borderRadius: "8px",
              margin: "20px 0"
            }}>
              <motion.div variants={containerVariants} initial="hidden" animate="visible">
                {certificates.map((cert) => (
                  <motion.div 
                    key={cert.id}
                    variants={itemVariants}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                      color: "rgba(255, 255, 255, 0.9)",
                      fontSize: "15px"
                    }}
                  >
                    <div style={{ color: "#4ade80", marginRight: "10px", fontWeight: "bold" }}>→</div>
                    {cert.name}
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                style={{
                  width: "28px",
                  height: "28px",
                  border: "2px solid rgba(255, 255, 255, 0.6)",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                  <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "25px" }}>
              {/* Product Name */}
              <div>
                <label htmlFor="productName" style={styles.fieldLabel}>Product Name</label>
                <input
                  type="text"
                  id="productName"
                  placeholder="Enter Product Name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  style={styles.inputField}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#4ade80";
                    e.target.style.boxShadow = "0 0 0 2px rgba(74, 222, 128, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
                    e.target.style.boxShadow = "none";
                  }}
                  required
                />
              </div>
              
              {/* Supplier Details */}
              <div>
                <label htmlFor="supplierDetails" style={styles.fieldLabel}>Supplier Details</label>
                <input
                  type="text"
                  id="supplierDetails"
                  placeholder="Enter Supplier Detail"
                  value={supplierDetails}
                  onChange={(e) => setSupplierDetails(e.target.value)}
                  style={styles.inputField}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#4ade80";
                    e.target.style.boxShadow = "0 0 0 2px rgba(74, 222, 128, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
                    e.target.style.boxShadow = "none";
                  }}
                  required
                />
              </div>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
              {/* Certificate Selection */}
              <div>
                <label htmlFor="certificateSelect" style={styles.fieldLabel}>Certification Details</label>
                <select
                  id="certificateSelect"
                  multiple
                  value={selectedCertificates}
                  onChange={handleCertificateChange}
                  style={{ ...styles.inputField, minHeight: "120px" }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#4ade80";
                    e.target.style.boxShadow = "0 0 0 2px rgba(74, 222, 128, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  {certificates.map((cert) => (
                    <option key={cert.id} value={cert.id} style={{backgroundColor: "#1c1c1e"}}>
                      {cert.name}
                    </option>
                  ))}
                </select>
                <p style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.6)", marginTop: "5px" }}>
                  Hold Ctrl (or Cmd) to select multiple
                </p>
              </div>
              
              {/* File Upload */}
              <div>
                <label style={styles.fieldLabel}>Upload Certificate</label>
                <div
                  style={{
                    border: "1px dashed rgba(255, 255, 255, 0.3)",
                    borderRadius: "6px",
                    padding: "30px 16px",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "background-color 0.2s, border-color 0.2s",
                    backgroundColor: "rgba(255, 255, 255, 0.05)"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ marginBottom: "10px", color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto" }}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </motion.div>
                  <p style={{ margin: "0", marginBottom: "5px", fontSize: "14px", color: "rgba(255, 255, 255, 0.8)" }}>
                    Drag and drop your files or
                  </p>
                  <label
                    htmlFor="fileUpload"
                    style={{
                      display: "inline-block",
                      padding: "8px 16px",
                      backgroundColor: "#4ade80",
                      color: "#121212",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "background-color 0.2s, transform 0.2s"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#22c55e";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "#4ade80";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    Choose Files
                  </label>
                  <input type="file" id="fileUpload" onChange={handleFileChange} multiple style={{ display: "none" }} />
                </div>
                {uploadedFiles.length > 0 && (
                  <div style={{ marginTop: "10px", fontSize: "13px", color: "#4ade80" }}>
                    {uploadedFiles.length} file(s) selected
                  </div>
                )}
              </div>
            </div>
            
            {/* Submit Button */}
            <div style={{ textAlign: "center" }}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(74, 222, 128, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                style={{
                  backgroundColor: "#4ade80",
                  color: "#121212",
                  border: "none",
                  borderRadius: "20px",
                  padding: "12px 30px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  minWidth: "200px",
                  textTransform: "uppercase"
                }}
              >
                Submit Product
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
      
      {/* Hero Animation Section - Right Side */}
      <div style={{ width: "45%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "30px",
            maxWidth: "500px",
            width: "100%",
            textAlign: "center"
          }}
        >
          <div style={{ maxWidth: "500px" }}>
            <motion.h1 style={{ fontSize: "2.5em", fontWeight: "600", marginBottom: "15px", ...styles.gradientText }}>
              <span ref={typedRef}></span>
              <span style={{ opacity: 1, animation: "blink 0.7s infinite" }}>|</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{ fontSize: "1.1em", lineHeight: 1.5, opacity: 0.8 }}
            >
              Sustainability fraud is everywhere. Fake claims, misleading labels, and greenwashing deceive millions. Our solution guarantees real transparency.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{ flex: 1, display: "flex", justifyContent: "center", position: "relative" }}
          >
            {/* Animated graphics */}
            <div style={{
              width: "300px",
              height: "300px",
              borderRadius: "15px",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 10px 25px rgba(255, 255, 255, 0.1)",
              position: "relative",
              overflow: "hidden"
            }}>
              {/* Floating certification elements */}
              <motion.div
                animate={{ y: [0, -400], opacity: [0, 1, 1, 0], scale: [0.7, 1, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 15, times: [0, 0.1, 0.9, 1] }}
                style={{
                  position: "absolute",
                  bottom: "-50px",
                  left: "50%",
                  width: "150px",
                  height: "150px",
                  marginLeft: "-75px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(74, 222, 128, 0.2)",
                  border: "1px solid rgba(74, 222, 128, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 11.08V8l-6-6H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-3.08"></path>
                  <path d="M14 3v5h5M12 18v-6M9 15h6"></path>
                </svg>
              </motion.div>
              
              <motion.div
                animate={{ y: [-100, 400], opacity: [0, 1, 1, 0], scale: [0.7, 1, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 12, delay: 2, times: [0, 0.1, 0.9, 1] }}
                style={{
                  position: "absolute",
                  top: "-50px",
                  left: "30%",
                  width: "120px",
                  height: "120px",
                  marginLeft: "-60px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(56, 189, 248, 0.2)",
                  border: "1px solid rgba(56, 189, 248, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </motion.div>
              
              {/* AI/ML path animations */}
              <svg width="300" height="300" style={{ position: "absolute", top: 0, left: 0, opacity: 0.3 }}>
                <motion.path
                  d="M50,150 C50,80 250,80 250,150 C250,220 50,220 50,150"
                  stroke="#4ade80"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                />
                <motion.path
                  d="M70,150 C70,100 230,100 230,150 C230,200 70,200 70,150"
                  stroke="#22d3ee"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                />
              </svg>
              
              {/* Central rotating element */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "80px",
                  height: "80px",
                  marginTop: "-40px",
                  marginLeft: "-40px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10
                }}
              >
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Action Button */}
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ scale: 1.1, backgroundColor: "white", color: "#121212" }}
            style={{
              position: "relative",
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "uppercase",
              padding: "12px 25px",
              color: "white",
              backgroundColor: "transparent",
              border: "2px solid white",
              cursor: "pointer",
              overflow: "hidden",
              transition: "0.3s ease-in-out",
              borderRadius: "20px",
              marginTop: "30px"
            }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
      
      {/* Blinking cursor animation */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ProducerCertificationForm;