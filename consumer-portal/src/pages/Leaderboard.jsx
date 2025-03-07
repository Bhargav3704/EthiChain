import '../styles/Leaderboard.css'; // Import the sexy CSS
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, ChevronUp, Loader2 } from "lucide-react";
import products from "../data/products.json";

const Leaderboard = () => {
  const [loading, setLoading] = useState(true);
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const rankedProducts = [...products].sort((a, b) => b.trustScore - a.trustScore);
      setSortedProducts(rankedProducts);
      setLoading(false);
    }, 1000); // Fake delay
  }, []);

  return (
    <div className="leaderboard-container"> {/* Updated to leaderboard-container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="leaderboard-card" // Updated to leaderboard-card
      >
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 size={70} className="leaderboard-loading-icon" /> {/* Updated to leaderboard-loading-icon */}
          </motion.div>
        ) : (
          <>
            <motion.h2
              className="leaderboard-header" // Updated to leaderboard-header
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Trophy size={40} /> Sustainability Leaderboard
            </motion.h2>

            {/* 🏆 Leaderboard Table */}
            <motion.div
              className="leaderboard-list" // Updated to leaderboard-list
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <ul className="leaderboard-list"> {/* Updated to leaderboard-list */}
                {sortedProducts.map((product, index) => (
                  <motion.li
                    key={product.productCode}
                    className={`leaderboard-item ${index === 0 ? "top-leader" : index === 1 ? "second-leader" : index === 2 ? "third-leader" : "other-leader"}`} // Updated to leaderboard-item and dynamic background classes
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <span className="leaderboard-rank">{index + 1}.</span> {/* Updated to leaderboard-rank */}
                    <span className="leaderboard-product-name">{product.productCode}</span> {/* Updated to leaderboard-product-name */}
                    <div className="leaderboard-score-container"> {/* Updated to leaderboard-score-container */}
                      {index === 0 && <ChevronUp size={20} className="leaderboard-icon-up" />} {/* Updated to leaderboard-icon-up */}
                      <span className={`leaderboard-score ${index === 0 ? 'top-score' : ''}`}>{product.trustScore}%</span> {/* Updated to leaderboard-score and top-score class */}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Leaderboard;