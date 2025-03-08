import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, ChevronDown } from "lucide-react";

const HorizontalProductsDisplay = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Eco-Friendly Water Bottle",
      description: "Made from 100% recycled materials, BPA-free and sustainable.",
      verified: true,
     
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      description: "Grown without harmful pesticides, using water-saving techniques.",
      verified: true,
      
    },
    {
      id: 3,
      name: "Solar-Powered Charger",
      description: "Harness the sun's energy to power your devices anywhere.",
      verified: false,
    
    },
    {
      id: 4,
      name: "Bamboo Cutlery Set",
      description: "Biodegradable alternative to plastic cutlery, naturally antibacterial.",
      verified: true,
      
    }
  ]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    },
    hover: { 
      y: -5,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
      backgroundColor: "#121212",
      color: "#e0e0e0",
      minHeight: "100vh",
      padding: "20px",
      width: "100%"
    }}>
      

      {/* Main Content */}
      <div style={{
        marginTop: "40px"
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "10px",
          color: "#4ade80"
        }}>
          Sustainable Products
        </h1>
        <p style={{
          fontSize: "1rem",
          marginBottom: "30px",
          color: "#94a3b8"
        }}>
          Browse our collection of eco-friendly and sustainable products
        </p>

        {/* Products */}
        <motion.div 
          style={{
            display: "flex",
            gap: "20px",
            overflowX: "auto",
            padding: "10px 0",
            width: "100%"
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product) => (
            <motion.div 
              key={product.id}
              style={{
                backgroundColor: "white",
                color: "#1e293b",
                borderRadius: "8px",
                width: "300px",
                minWidth: "300px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column"
              }}
              variants={itemVariants}
              whileHover="hover"
            >
              <div style={{
                position: "relative"
              }}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover"
                  }}
                />
                {product.verified && (
                  <div style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "#4ade80",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white"
                  }}>
                    <Trophy size={16} />
                  </div>
                )}
              </div>

              <div style={{
                padding: "16px"
              }}>
                <h3 style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  marginBottom: "8px"
                }}>
                  {product.name}
                </h3>
                <p style={{
                  fontSize: "0.9rem",
                  color: "#4b5563",
                  marginBottom: "16px"
                }}>
                  {product.description}
                </p>

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px"
                }}>
                  <div style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: product.verified ? "#4ade80" : "#ef4444",
                    marginRight: "8px"
                  }}></div>
                  <span style={{
                    fontSize: "0.85rem",
                    color: product.verified ? "#4ade80" : "#ef4444",
                    fontWeight: "500"
                  }}>
                    {product.verified ? "Verified" : "Not Verified"}
                  </span>
                </div>

                <button style={{
                  width: "100%",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "500"
                }}>
                  View Details <ChevronDown size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HorizontalProductsDisplay;