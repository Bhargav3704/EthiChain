import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import QrScanner from 'react-qr-scanner'; // Import react-qr-scanner
import productsData from "../data/products.json";
import "../styles/ProductVerification.css";

const ProductVerification = () => {
    const [productCode, setProductCode] = useState(productsData[0]?.productCode || "Unknown");
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isScanned, setIsScanned] = useState(false);
    const [selectedProductCode, setSelectedProductCode] = useState(productsData[0]?.productCode || "Unknown");
    const [scanLineRef] = useState(useRef(null)); // scanLineRef no longer needed for button trigger
    const qrScannerRef = useRef(null);
    const verificationCardRef = useRef(null);
    const [isScanning, setIsScanning] = useState(false); // isScanning state removed


    useEffect(() => {
        setLoading(true);
        setIsScanned(false);
        // setIsScanning(false); // isScanning state and setting removed
        setProductCode(selectedProductCode);

        setTimeout(() => {
            const foundProduct = productsData.find(p => p.productCode === selectedProductCode);
            setProduct(foundProduct || productsData[0]);
            setLoading(false);
        }, 1000);
    }, [selectedProductCode]);

    const handleProductChange = (event) => {
        setSelectedProductCode(event.target.value);
    };

    const handleVerifyProduct = () => {
        setSelectedProductCode(selectedProductCode);
    };

    const handleScan = (result, _error) => {
        if (result) {
            setIsScanned(true);
            // setIsScanning(false); // isScanning state and setting removed
            setProductCode(result.text);

            // Stop scan line animation and revert dark mode - removed as no button to trigger
            // if (scanLineRef.current) {
            //     scanLineRef.current.style.animation = 'none';
            //     scanLineRef.current.style.transform = 'translateY(0%)';
            // }
            if (verificationCardRef.current) {
                verificationCardRef.current.classList.remove('scanning-dark-mode');
            }
        }
    };

    const handleScanError = (err) => {
        console.error("QR Scanner Error:", err);
    };

    // const handleScanButtonClick = () => { // handleScanButtonClick removed
    //     setIsScanning(true);
    //     setIsScanned(false);

    //     // Start scan line animation - removed as no button to trigger
    //     // if (scanLineRef.current) {
    //     //     scanLineRef.current.style.animation = 'scanLineMove 1.5s linear infinite';
    //     // }
    //     // Activate dark mode for verification card - removed as no button to trigger
    //     // if (verificationCardRef.current) {
    //     //     verificationCardRef.current.classList.add('scanning-dark-mode');
    //     // }


    //     // Programmatically trigger a scan using the QrScanner ref (simulation for now) - removed as no button to trigger
    //     if (qrScannerRef.current && qrScannerRef.current.scanner) {


    //         // Simulate successful scan after a delay (for demonstration) - removed as no button to trigger
    //         setTimeout(() => {
    //             const simulatedScanResult = { text: selectedProductCode }; // Simulate reading the displayed QR code
    //             handleScan(simulatedScanResult, null); // Directly call handleScan with simulated result
    //         }, 2000); // Simulate scan duration
    //     } else {
    //         console.warn("QR Scanner ref or scanner not available to trigger scan.");
    //         setIsScanning(false); // Stop scanning UI if scanner not ready - removed as no isScanning state
    //         // Revert scan line animation and dark mode if scanner not ready - removed as no button to trigger
    //         // if (scanLineRef.current) {
    //         //     scanLineRef.current.style.animation = 'none';
    //         //     scanLineRef.current.style.transform = 'translateY(0%)';
    //         // }
    //         // if (verificationCardRef.current) {
    //         //     verificationCardRef.current.classList.remove('scanning-dark-mode');
    //         // }
    //     }
    // };


    return (
        <div className={`verification-container ${isScanning ? 'scanning-mode' : ''}`}> {/* isScanning class removed */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="verification-card"
                ref={verificationCardRef}
            >
                {loading ? (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                        <Loader2 size={50} className="mx-auto loading-icon" />
                    </motion.div>
                ) : (
                    <>
                        {!isScanned ? (
                            <>
                                <motion.h2
                                    className="scan-header"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    Verify Product
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

                                <motion.div className="qr-code-scanner-wrapper">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                        className="qr-code-container"
                                    >
                                        <QRCodeCanvas value={productCode} size={150} />
                                        {/* {isScanning && ( // isScanning check removed */}
                                        {/*     <> */}
                                        {/*         <div className="scan-overlay"></div> */}
                                        {/*         <div className="scan-line neon-scan-line" ref={scanLineRef}></div>  */}
                                        {/*     </> */}
                                        {/* )} */}
                                    </motion.div>

                                    {/* Hidden QrScanner - positioned off-screen */}
                                    <div className="qr-scanner-hidden">
                                        <QrScanner
                                            ref={qrScannerRef}
                                            delay={300}
                                            onError={handleScanError}
                                            onScan={handleScan}
                                        />
                                    </div>
                                </motion.div>

                                {/* <motion.button // Scan QR Code Button Removed */}
                                {/*     onClick={handleScanButtonClick}  */}
                                {/*     whileHover={{ scale: 1.05 }} */}
                                {/*     whileTap={{ scale: 0.95 }} */}
                                {/*     className="scan-button" */}
                                {/*     disabled={isScanning}  */}
                                {/* > */}
                                {/*     {isScanning ? "Scanning..." : "Scan QR Code"} */}
                                {/* </motion.button> */}


                                <motion.p
                                    className="scan-instruction"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    Point your camera at the QR code to verify product.
                                </motion.p>

                            </>
                        ) : (
                            <>
                                <motion.h2
                                    className="verified-header"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <CheckCircle size={32} /> Product Verified
                                </motion.h2>

                                <motion.p
                                    className="verified-code"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <strong>Code:</strong> {product.productCode}
                                </motion.p>

                                {/* Trust Score Bar */}
                                <motion.div
                                    className="trust-score-bar"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    Trust Score: {product.trustScore}% Ethical
                                </motion.div>

                                {/* Greenwashing Warning */}
                                {product.trustScore < 80 && (
                                    <motion.div
                                        className="greenwashing-warning"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1 }}
                                    >
                                        <AlertTriangle size={28} className="warning-icon" /> ⚠️ Potential Greenwashing Detected
                                    </motion.div>
                                )}
                            </>
                        )}
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default ProductVerification;