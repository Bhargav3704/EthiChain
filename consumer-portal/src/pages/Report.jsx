import '../styles/Report.css'; // Import the CSS file
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, ShieldCheck, AlertTriangle, Loader2 } from "lucide-react";
import productsData from "../data/products.json"; // Import productsData

const Report = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedProductCode, setSelectedProductCode] = useState(productsData[0]?.productCode || ""); // State for selected product

  useEffect(() => {
    setLoading(true);
    // Find the selected product from productsData
    const foundProduct = productsData.find(p => p.productCode === selectedProductCode);
    setTimeout(() => {
      setProduct(foundProduct || productsData[0]); // Default to first product if not found
      setLoading(false);
    }, 1000); // Fake loading delay
  }, [selectedProductCode]); // useEffect dependency on selectedProductCode

  const handleProductChange = (event) => {
    setSelectedProductCode(event.target.value); // Update selectedProductCode state
  };

  return (
    <div className="report-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="report-card"
      >
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 size={50} className="report-loading-icon" />
          </motion.div>
        ) : (
          <>
            <motion.h2
              className="report-header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <BarChart size={32} /> Sustainability Report
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

            {/* ✅ Compliance Score */}
            <motion.div
              className="compliance-score"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <ShieldCheck size={24} /> Compliance Score: {product?.trustScore || 'N/A'}% {/* ✅ Display 'N/A' if trustScore is missing */}
            </motion.div>

            {/* ❌ If Trust Score is Low */}
            {product?.trustScore < 80 && ( // ✅ Optional chaining for trustScore
              <motion.div
                className="greenwashing-warning-report"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <AlertTriangle size={28} className="warning-icon-report" /> ⚠️ Warning: High Risk of Greenwashing
              </motion.div>
            )}

            {/* 📊 Audit Insights */}
            <motion.div
              className="audit-insights"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="audit-insights-header">📊 Audit Insights:</h3>
              <ul className="audit-list">
                {product?.auditHistory?.map((audit, index) => ( // ✅ Optional chaining for auditHistory
                  <motion.li
                    key={index}
                    className="audit-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.2 }}
                  >
                    <strong>{audit.year}:</strong> {audit.details} ({audit.status})
                  </motion.li>
                )) || <motion.li className="audit-item">No audit insights available for this product.</motion.li>} {/* ✅ Handle no audit history */}
              </ul>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Report;