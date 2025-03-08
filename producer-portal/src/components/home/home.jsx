import React from "react";
import { motion } from "framer-motion";
import "./home.css"; // Ensure CSS is properly linked

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center p-10"
    >
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Hero Section */}
        <div className="relative">
          <img
            src="https://source.unsplash.com/featured/?supplychain,factory"
            alt="Supply Chain"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-5xl font-extrabold text-white text-center drop-shadow-lg">
              Empowering Ethical Producers
            </h1>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-10 text-center">
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">
            Your Products. Verified, Trusted, Transparent.
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Ensure your products gain credibility with blockchain-backed verification, ethical sourcing, and real-time supply chain insights.
          </p>
          <motion.a
            href="/Add"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg shadow-md hover:opacity-90 transition duration-300"
          >
            Get Started
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
