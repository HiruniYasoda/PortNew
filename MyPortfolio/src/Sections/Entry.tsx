import React from 'react';
import { motion } from 'framer-motion';

// Generate 25 floating neon bubbles with varied sizes, positions, and speeds
const FLOATING_BUBBLES = Array.from({ length: 25 }).map((_, i) => ({
  id: i,
  size: Math.floor(Math.random() * 38) + 12, // 12px to 50px
  x: Math.floor(Math.random() * 94) + 3, // 3% to 97%
  duration: Math.random() * 4 + 3.5, // 3.5s to 7.5s
  delay: Math.random() * 4, // 0s to 4s delay
  driftX: (i % 2 === 0 ? 1 : -1) * (Math.random() * 30 + 10), // horizontal drift
}));

const Signature: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-[#030207] overflow-hidden px-4">
      {/* Load Cursive Font */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');`}
      </style>

      {/* ================= FLOATING & POPPING NEON BUBBLES (BOTTOM TO TOP) ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {FLOATING_BUBBLES.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full bg-gradient-to-t from-purple-600/30 via-purple-500/60 to-pink-400/80 border border-purple-300/40 shadow-[0_0_20px_rgba(168,85,247,0.7)]"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.x}%`,
              bottom: '-60px',
            }}
            animate={{
              y: ['0vh', '-120vh'],
              x: [0, bubble.driftX, 0],
              opacity: [0, 0.85, 0.85, 0],
              scale: [0.6, 1.25, 1.4, 0.8],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* BACKGROUND SUBTLE RADIAL GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none z-0" />

      {/* ================= SHINY NEON PURPLE CENTER EMBLEM ================= */}
      <motion.div
        className="relative flex items-center justify-center w-72 h-72 md:w-96 md:h-96 rounded-full border-2 border-purple-500/60 bg-purple-950/20 backdrop-blur-md z-10"
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            '0 0 45px rgba(168,85,247,0.4), inset 0 0 25px rgba(168,85,247,0.2)',
            '0 0 85px rgba(168,85,247,0.8), inset 0 0 45px rgba(168,85,247,0.5)',
            '0 0 45px rgba(168,85,247,0.4), inset 0 0 25px rgba(168,85,247,0.2)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Inner Rotating Dashed Accent Ring */}
        <motion.div
          className="absolute inset-3 rounded-full border border-purple-400/40 border-dashed"
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        />

        {/* Content Inside Shiny Circle */}
        <div className="flex flex-col items-center justify-center text-center p-6 z-10 gap-3 md:gap-4">
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] md:text-xs font-extrabold uppercase tracking-[0.25em] text-purple-300 bg-purple-900/60 border border-purple-500/50 px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.6)]"
          >
            Welcome To Portfolio
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-none"
            style={{
              fontFamily: "'Great Vibes', cursive",
              textShadow: '0 0 20px #a855f7, 0 0 40px #a855f7',
            }}
          >
            Hiruni Yasoda
          </motion.h1>
        </div>
      </motion.div>
    </div>
  );
};

export default Signature;