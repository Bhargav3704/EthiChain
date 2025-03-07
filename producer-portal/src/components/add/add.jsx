import React, { useState } from "react";
import { motion } from "framer-motion";
import "./add.css"; // Ensure CSS is properly linked

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [supplierDetails, setSupplierDetails] = useState("");
  const [factoryDetails, setFactoryDetails] = useState("");
  const [retailerDetails, setRetailerDetails] = useState("");
  const [documents, setDocuments] = useState([]);

  // Handle file selection
  const handleFileChange = (e) => {
    setDocuments([...documents, ...Array.from(e.target.files)]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("supplierDetails", supplierDetails);
    formData.append("factoryDetails", factoryDetails);
    formData.append("retailerDetails", retailerDetails);
    documents.forEach((doc, index) => {
      formData.append(`documents_${index}`, doc);
    });

    console.log("Submitting Product:", formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-center justify-center"
    >
      <div className="shadow-lg p-10 rounded-3xl bg-white w-full max-w-2xl">
        {/* Big Add New Product Heading */}
        <h1 className="text-5xl font-bold text-center mb-8 uppercase text-gray-900">
          Add New Product
        </h1>

        {/* Form Container with Light Background */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-xl font-semibold mb-2 text-gray-800">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 shadow-sm"
                required
              />
            </div>

            {/* Supplier Details */}
            <div>
              <label className="block text-xl font-semibold mb-2 text-gray-800">
                Supplier Details
              </label>
              <input
                type="text"
                placeholder="Enter Supplier Details"
                value={supplierDetails}
                onChange={(e) => setSupplierDetails(e.target.value)}
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 shadow-sm"
                required
              />
            </div>

            {/* Factory Details */}
            <div>
              <label className="block text-xl font-semibold mb-2 text-gray-800">
                Factory Details
              </label>
              <input
                type="text"
                placeholder="Enter Factory Details"
                value={factoryDetails}
                onChange={(e) => setFactoryDetails(e.target.value)}
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 shadow-sm"
                required
              />
            </div>

            {/* Retailer Details */}
            <div>
              <label className="block text-xl font-semibold mb-2 text-gray-800">
                Retailer Details
              </label>
              <input
                type="text"
                placeholder="Enter Retailer Details"
                value={retailerDetails}
                onChange={(e) => setRetailerDetails(e.target.value)}
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 shadow-sm"
                required
              />
            </div>

            {/* Document Upload */}
            <div className="border p-5 rounded-lg bg-gray-200 shadow-md">
              <label className="block text-xl font-semibold mb-3 text-gray-800">
                Upload Documents:
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
                required
              />

              {/* Show selected file names */}
              <div className="mt-4 space-y-2">
                {documents.map((doc, index) => (
                  <p key={index} className="text-md text-gray-700 bg-white p-2 rounded-md shadow-sm">
                    📄 {doc.name}
                  </p>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white p-4 rounded-lg hover:opacity-90 transition duration-300 font-semibold text-xl"
            >
              Submit Product
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default AddProduct;
