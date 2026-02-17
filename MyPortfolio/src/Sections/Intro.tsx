import React from 'react';
import { motion } from 'framer-motion';
import { Download, Linkedin, Github, Facebook, Instagram, Twitter } from 'lucide-react';

// --- 1. REACT LOGO ---
const ReactLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none" stroke="#a855f7" strokeWidth="0.5" style={{ filter: "drop-shadow(0 0 2px #a855f7) drop-shadow(0 0 4px #a855f7)" }}>
    <circle cx="0" cy="0" r="2.05" opacity="0" />
    <g>
      <ellipse rx="11" ry="4.2" transform="rotate(0)" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

// --- 2. DATABASE LOGO ---
const DbLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#a855f7" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 2px #a855f7) drop-shadow(0 0 4px #a855f7)" }}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s 9-1.34 9-3V5" />
  </svg>
);

// --- 3. CODE BRACKETS LOGO ---
const CodeLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#a855f7" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 2px #a855f7) drop-shadow(0 0 4px #a855f7)" }}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const IntroSection: React.FC = () => {
  const logoTypes = [ReactLogo, DbLogo, CodeLogo];

  const movingLogos = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    Component: logoTypes[Math.floor(Math.random() * logoTypes.length)],
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: 40 + Math.random() * 20, 
    delay: Math.random() * 10,
  }));

  return (
    <section id="home" className="relative min-h-screen w-full bg-black overflow-hidden flex items-center pt-20">
      
      {/* --- BACKGROUND: MIXED MOVING LOGOS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {movingLogos.map((item) => (
          <motion.div
            key={item.id}
            className="absolute w-8 h-8 md:w-16 md:h-16 opacity-40"
            style={{
              top: `${item.initialY}%`,
              left: `${item.initialX}%`,
            }}
            animate={{
              x: ['-50px', '50px', '-50px'], 
              y: ['-50px', '50px', '-50px'],
              rotate: [0, 360], 
            }}
            transition={{
              duration: item.duration,
              ease: 'linear',
              repeat: Infinity,
              delay: item.delay,
            }}
          >
            <item.Component className="w-full h-full" />
          </motion.div>
        ))}
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
        
        {/* --- LEFT SIDE: TEXT --- */}
        <motion.div 
          className="bg-white/20 p-8 md:p-12 rounded-3xl border border-purple-500/30 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
            Hello, I am <br />
            <span className="neon-text text-purple-600 drop-shadow-[0_0_15px_rgba(168,85,247,0.1)]">Hiruni Yasoda</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-light mb-8">
            I am a <span className="text-black font-semibold drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]">Passionate</span> developer 
            driven by the courage to explore the unknown. 
            With a <span className="text-black font-semibold drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]">Creative</span> mind and 
            unrelenting dedication, I turn complex problems into elegant solutions. 
            I don't just write code; I strive for <span className="text-black font-semibold drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]">Excellence</span> in 
            every pixel and every line, always giving my absolute best.
          </p>

          {/* --- ACTION ICONS (Minimal, No Container, Glow & Spring) --- */}
          <div className="flex items-center gap-8 mt-4">
            
            {/* Download CV (Icon + Text) */}
            <motion.a 
              href="/cv.pdf" 
              download
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="group flex items-center gap-2 text-white hover:text-purple-400 transition-colors drop-shadow-[0_0_5px_rgba(168,85,247,0.8)] cursor-pointer"
            >
              <Download size={28} />
              <span className="font-medium text-lg tracking-wide group-hover:text-purple-300">CV</span>
            </motion.a>

            {/* LinkedIn (Icon Only) */}
            <motion.a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="text-white hover:text-purple-400 transition-colors drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]"
            >
              <Linkedin size={28} />
            </motion.a>

            {/* GitHub (Icon Only) */}
            <motion.a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="text-white hover:text-purple-400 transition-colors drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]"
            >
              <Github size={28} />
            </motion.a>
            
          </div>
        </motion.div>

        {/* --- RIGHT SIDE: PROFILE IMAGE STACK --- */}
        <motion.div 
          className="relative flex items-center justify-center py-10 md:py-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex items-center justify-center">
            
            {/* --- SOCIAL ICONS (Top Right Floating - Smooth Spring) --- */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute -top-12 -right-4 md:-right-12 bg-white/10 backdrop-blur-md border border-purple-500/30 p-3 rounded-2xl flex gap-4 shadow-[0_0_20px_rgba(168,85,247,0.3)] z-50"
            >
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.2, y: -2 }} 
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="text-white hover:text-purple-400 transition-colors drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]"
              >
                <Facebook size={24} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.2, y: -2 }} 
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="text-white hover:text-purple-400 transition-colors drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]"
              >
                <Twitter size={24} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.2, y: -2 }} 
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="text-white hover:text-purple-400 transition-colors drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]"
              >
                <Instagram size={24} />
              </motion.a>
            </motion.div>

            {/* ROTATING RING */}
            <motion.div 
                className="absolute inset-0 w-full h-full rounded-full overflow-hidden flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >   
                <img 
                  src="/ProfileRing.jpg" 
                  alt="Profile Ring" 
                  className="w-[100%] h-[100%] object-cover mix-blend-screen opacity-100" 
                />
            </motion.div>
            
            {/* INNER PROFILE */}
            <div className="relative w-[55%] h-[55%] rounded-full overflow-hidden border-[3px] border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.4)] z-10 bg-black">
              <img 
                src="/profile.png" 
                alt="Hiruni Yasoda" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* BACKGROUND GLOW */}
            <div className="absolute w-[80%] h-[80%] bg-purple-900/20 blur-[80px] rounded-full -z-10"></div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default IntroSection;