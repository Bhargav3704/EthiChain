import React, { useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Line, Sphere, Cloud, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import supplyChainData from "../data/supplyChain.json"; // ✅ Import Data

const SupplyChainNode = ({ position, text, details }) => {
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
            <strong>Node: {text}</strong> <br />
            {details}
          </div>
        </Html>
      )}
    </motion.group>
  );
};

const SupplyChain3D = () => {
  // ✅ Use positions from `supplyChain.json`
  const nodes = useMemo(() => supplyChainData, []);

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
        position: [0, 0, 5], 
        fov: 50 
      }}
    >
      {/* Soft, minimal lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />

      {/* Minimal fog for depth */}
      <fog attach="fog" args={["#1e293b", 1, 15]} />

      <OrbitControls 
        enablePan={false}
        enableZoom={true}
        rotateSpeed={0.5}
      />

      {/* Render Nodes from JSON */}
      {nodes.map((node, index) => (
        <SupplyChainNode 
          key={node.id} 
          position={node.position} 
          text={node.id}  // ✅ Display Node Name
          details={`Location: ${node.location} | Sustainability: ${node.sustainability}`}
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
        position={[2, 2, -2]} 
        opacity={0.2} 
        speed={0.1} 
        depth={1}
      />
      <Cloud 
        position={[-2, -2, 2]} 
        opacity={0.2} 
        speed={0.1} 
        depth={1}
      />
    </Canvas>
  );
};

export default SupplyChain3D;
