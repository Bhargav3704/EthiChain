import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import Model from '../Components/TropicalPlants';
import Navbar from "../components/Navbar"; // Import the Navbar

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '🌱 Hello! I am GreenGuard, your AI-powered sustainability guide, here to help you navigate greenwashing, ethical practices, and eco-friendly solutions.' },
  ]);
  const [input, setInput] = useState('');
  const [fadeIn, setFadeIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null); // Reference for auto-scrolling

  useEffect(() => {
    setFadeIn(true);
  }, []);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { sender: 'user', text: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:8000/chat?question=${encodeURIComponent(input)}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        const botMessage = { sender: 'bot', text: data.response || "I’m here for you. Let’s talk through things." };

        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Error fetching chat response:", error);
        setMessages((prev) => [...prev, { sender: 'bot', text: "Sorry, I couldn't get a response." }]);
      }
      
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        maxWidth: '450px',
        background: 'rgba(30, 30, 30, 0.8)', // Dark background with slight transparency
        borderRadius: '20px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.6)',
        padding: '20px',
        backdropFilter: 'blur(15px)',
        animation: fadeIn ? 'fadeIn 1s ease-in-out' : '',
        transition: 'all 0.4s ease-in-out',
      }}
    >
      {/* Chat Header */}
      <div
        style={{
          padding: '15px',
          background: 'linear-gradient(45deg, #4A90E2, #D94F6A)', // Neon Gradient background
          fontWeight: 'bold',
          fontSize: '18px',
          textAlign: 'center',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          color: '#fff',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', // Glowing effect for header
        }}
      >
        GreenGuard
      </div>

      {/* Chat Messages (Scrollable Area) */}
      <div
        ref={chatContainerRef}
        style={{
          flexGrow: 1,
          overflowY: 'auto', // Enables scrolling only for messages
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          padding: '15px',
          maxHeight: '85vh', // Keeps input box visible while chat scrolls
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className="chat-hover"
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              background: msg.sender === 'user' ? 'rgba(68, 186, 121, 0.7)' : 'rgba(12, 18, 43, 0.8)',
              padding: '12px 18px',
              borderRadius: '20px',
              maxWidth: '75%',
              fontSize: '15px',
              marginBottom: '10px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              color: msg.sender === 'user' ? '#fff' : '#e0e0e0', // White text for user messages, light gray for bot
            }}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="chat-hover" style={{ color: "#fff", fontStyle: "italic" }}>Typing...</div>}
      </div>

      {/* Chat Input (Always Visible) */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: '20px',
            fontSize: '15px',
            border: '1px solid #ddd',
            borderRadius: '25px',
            marginRight: '15px',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            color: '#fff',
            outline: 'none',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Glowing effect for input
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            padding: 'px 20px',
            background: 'linear-gradient(45deg,rgb(57, 53, 54), #4A90E2)', // Neon Gradient background for button
            color: '#fff',
            border: 'none',
            borderRadius: '25px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Glowing effect for button
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

const RotatingModel = () => {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }
  });
  return <group ref={ref}><Model scale={0.005} position={[0, 0, 0]} /></group>;
};

const Scene = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Navbar />

      <div style={{ display: 'flex', width: '100%', height: 'calc(100vh - 52px)' }}>
        {/* Left side: the 3D Canvas */}
        <div style={{ flex: 1 }}>
          <Canvas camera={{ position: [4, 3, 6], fov: 50 }}>
            <ambientLight intensity={2} /> {/* Increased ambient light */}
            <directionalLight position={[10, 10, 10]} intensity={3} /> {/* Increased directional light */}
            <RotatingModel />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </div>

        {/* Right side: Chatbot container */}
        <div
          style={{
            flex: 0.4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(to right, rgba(30, 30, 30, 0.7), rgba(12, 18, 43, 0.8))', // Dark gradient background
            backdropFilter: 'blur(10px)',
          }}
        >
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default Scene;
