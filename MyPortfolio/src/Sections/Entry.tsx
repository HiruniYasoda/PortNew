import React from 'react';
import { motion } from 'framer-motion';

const Signature: React.FC = () => {
  return (
    <div 
      className="relative flex items-center justify-center w-full h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/image1.jpg')" }}
    >
      
      

      {/* 2. Load the Cursive Font */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');`}
      </style>

      <div className="relative w-full max-w-4xl z-10 px-4">
        <motion.svg
          viewBox="0 0 800 200"
          className="w-full h-auto"
          // Add a global drop-shadow to the entire SVG for that "blooming" light effect
          style={{ filter: "drop-shadow(0 0 8px rgba(216, 180, 254, 0.5))" }}
        >
          <motion.text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            
            // --- NEON SETTINGS ---
            // Stroke: Bright Neon Purple
            stroke="#d8b4fe" 
            strokeWidth="2"
            
            style={{ 
              fontFamily: "'Great Vibes', cursive", 
              fontSize: "120px", 
              letterSpacing: "4px",
              // Double glow effect using text-shadow
              textShadow: "0 0 20px #a855f7, 0 0 40px #a855f7"
            }}
            
            // --- ANIMATION ---
            initial={{ 
              pathLength: 0, 
              fill: "rgba(216, 180, 254, 0)", // Transparent
              strokeOpacity: 1,
              strokeDasharray: "0 1" // Start hidden
            }}
            animate={{ 
              pathLength: 1, 
              fill: "rgba(216, 180, 254, 1)", // Fill with Neon color
              strokeOpacity: 1 // Keep stroke visible for the edge glow
            }}
            transition={{
              // Draw the text (Writing effect)
              pathLength: { duration: 4, ease: "easeInOut" },
              // Fill it in slowly after writing starts
              fill: { duration: 1.5, ease: "easeIn", delay: 3 }
            }}
          >
            Hiruni Yasoda
          </motion.text>
        </motion.svg>
      </div>
    </div>
  );
};

export default Signature;