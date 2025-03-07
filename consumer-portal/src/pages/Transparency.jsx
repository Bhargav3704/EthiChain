import '../styles/Transparency.css'; // Import the CSS file
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileCheck, Loader2 } from "lucide-react";
import productsData from "../data/products.json"; // Import productsData

const Transparency = () => {
  const [selectedProductCode, setSelectedProductCode] = useState(productsData[0]?.productCode || ""); // State for selected product code
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Find the selected product from productsData based on selectedProductCode
    const foundProduct = productsData.find(p => p.productCode === selectedProductCode);
    setTimeout(() => {
      setProduct(foundProduct || productsData[0]); // Default to first product if not found
      setLoading(false);
    }, 1000); // Fake loading effect
  }, [selectedProductCode]); // useEffect dependency on selectedProductCode

  const handleProductChange = (event) => {
    setSelectedProductCode(event.target.value); // Update selectedProductCode state
  };

  return (
    <div className="verification-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="verification-card"
      >
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 size={50} className="loading-icon" />
          </motion.div>
        ) : (
          <>
            <motion.h2
              className="scan-header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <FileCheck size={32} /> Company Transparency Report
            </motion.h2>

            {/* Product Selection Dropdown */}
            <div className="product-select-container">
              <label htmlFor="productSelect" className="product-select-label">Choose Product:</label>
              <select
                id="productSelect"
                className="product-dropdown"
                value={selectedProductCode}
                onChange={handleProductChange}
              >
                {productsData.map(p => (
                  <option key={p.productCode} value={p.productCode}>
                    {p.productName} ({p.productCode})
                  </option>
                ))}
              </select>
            </div>

            {/* ✅ Certifications */}
            <motion.div
              className="mt-6 text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="product-select-label">🔍 Audit History & Certifications:</h3>
              <ul className="mt-2 space-y-2">
                {product?.certifications?.map((cert, index) => ( // ✅ Use optional chaining and map only if certifications exist
                  <motion.li
                    key={index}
                    className="trust-score-bar"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.2 }}
                  >
                    {cert}
                  </motion.li>
                )) || <motion.li className="trust-score-bar">No certifications listed.</motion.li>} {/* ✅ Display message if no certifications */}
              </ul>
            </motion.div>

            {/* 📜 Audit History */}
            <motion.div
              className="mt-6 text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="product-select-label">📜 Audit History:</h3>
              <ul className="mt-2 space-y-2">
                {product?.auditHistory?.map((audit, index) => ( // ✅ Use optional chaining and map only if auditHistory exists
                  <motion.li
                    key={index}
                    className="greenwashing-warning"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.2 }}
                  >
                    {audit.year}: {audit.details} ({audit.status})
                  </motion.li>
                )) || <motion.li className="trust-score-bar">No audit history available.</motion.li>} {/* ✅ Display message if no audit history */}
              </ul>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Transparency;