// EthiChain3D.jsx
import React, { useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Line, Sphere, Cloud, Html } from "@react-three/drei";
import { motion } from "framer-motion";

const EthiChainNode = ({ position, text, details }) => {
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);

    return (
        <motion.group
            position={position}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={() => setClicked(!clicked)}
        >
            {/* 🔵 3D Sphere */}
            <Sphere args={[0.5, 32, 32]}>
                <meshStandardMaterial
                    color={hovered ? "#ffcc00" : "#4caf50"}
                    emissive={hovered ? "#ffcc00" : "#4caf50"}
                    emissiveIntensity={0.5}
                />
            </Sphere>

            {/* 🔵 Display Node Name */}
            <Text
                position={[0, 0.8, 0]}
                fontSize={0.25}
                color="white"
                anchorX="center"
            >
                {text}
            </Text>

            {/* 🟢 Show Info when Hovered */}
            {hovered && (
                <Html position={[0, 1.2, 0]}>
                    <div style={{
                        background: "rgba(0,0,0,0.7)",
                        padding: "8px",
                        borderRadius: "5px",
                        color: "white",
                        fontSize: "12px"
                    }}>
                        {details}
                    </div>
                </Html>
            )}

            {/* 🔴 Show Detailed Info on Click */}
            {clicked && (
                <Html position={[0, -1, 0]}>
                    <div style={{
                        background: "#222",
                        padding: "10px",
                        borderRadius: "8px",
                        color: "#fff",
                        fontSize: "14px",
                        border: "1px solid #fff"
                    }}>
                        <strong>Step: {text}</strong> <br />
                        {details}
                    </div>
                </Html>
            )}
        </motion.group>
    );
};

const EthiChain3D = () => {
    const nodes = useMemo(() => [
        {
            id: "Submit Claim",
            position: [-6, 0, 0],
            details: "Companies submit their sustainability reports and claims to the EthiChain platform.",
        },
        {
            id: "AI Verification",
            position: [-2, 0, 0],
            details: "EthiChain's AI algorithms analyze the submitted claims, looking for inconsistencies, anomalies, and potential greenwashing indicators using Natural Language Processing (NLP).",
        },
        {
            id: "Blockchain Record",
            position: [2, 0, 0],
            details: "Once a claim is verified by AI, it is securely recorded on the EthiChain blockchain. This creates an immutable and transparent record of the verified sustainability claim.",
        },
        {
            id: "QR Code Generation",
            position: [6, 0, 0],
            details: "EthiChain generates a unique QR code that is linked to the blockchain record of the verified claim.",
        },
        {
            id: "Consumer Verification",
            position: [10, 0, 0],
            details: "Consumers can scan the EthiChain QR code on a product using a smartphone. This allows them to instantly access and verify the sustainability information directly from the blockchain, ensuring trust and transparency.",
        },
    ], []);

    return (
        <Canvas
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: '#1e293b'  // Dark slate blue background
            }}
            camera={{
                position: [0, 0, 15], // Adjusted camera position to see all nodes
                fov: 50
            }}
        >
            {/* Soft, minimal lighting */}
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />

            {/* Minimal fog for depth */}
            <fog attach="fog" args={["#1e293b", 1, 25]} /> {/* Adjusted fog distance */}

            <OrbitControls
                enablePan={false}
                enableZoom={true}
                rotateSpeed={0.5}
            />

            {/* Render Nodes from JSON */}
            {nodes.map((node, index) => (
                <EthiChainNode
                    key={node.id}
                    position={node.position}
                    text={node.id}
                    details={node.details}
                />
            ))}

            {/* Connect Nodes with Dashed Lines */}
            {nodes.map((node, index) => {
                if (index === nodes.length - 1) return null; // Stop at last node
                const nextNode = nodes[index + 1];

                return (
                    <Line
                        key={`line-${index}`}
                        points={[node.position, nextNode.position]}
                        color="white"
                        lineWidth={2}
                        dashed
                        dashScale={5}
                        dashSize={1}
                    />
                );
            })}

            {/* Subtle Clouds */}
            <Cloud
                position={[2, 2, -5]}
                opacity={0.2}
                speed={0.1}
                depth={1}
            />
            <Cloud
                position={[-2, -2, 5]}
                opacity={0.2}
                speed={0.1}
                depth={1}
            />
        </Canvas>
    );
};

export default EthiChain3D;