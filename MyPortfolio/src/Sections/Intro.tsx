import React from 'react';
import { motion } from 'framer-motion';

const IntroSection: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen w-full bg-black overflow-hidden flex items-center pt-20">
      
      {/* --- BACKGROUND: LARGE GEOMETRIC CIRCLES (Static & Elegant) --- */}

      <motion.div 
              className="absolute -right-[5%] -bottom-[10%] w-[300px] h-[300px] rounded-full border-[2px] border-purple-500/30 bg-transparent z-0 pointer-events-none"
              style={{ boxShadow: "inset 0 0 30px rgba(168,85,247,0.3), 0 0 30px rgba(168,85,247,0.3)" }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
      
      {/* Circle 1: Top Left - Subtle Purple Gradient */}
      <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/20 blur-[100px] pointer-events-none" />
      
      {/* Circle 2: Bottom Right - Subtle Purple Gradient */}
      <div className="absolute top-[40%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-purple-800/10 blur-[120px] pointer-events-none" />

      {/* --- MAIN CONTENT --- */}
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
        
        {/* --- LEFT SIDE: TEXT CONTAINER --- */}
        <motion.div 
          className="relative bg-black/60 p-8 md:p-14 rounded-[40px] border border-purple-500/50 backdrop-blur-2xl shadow-[0_0_40px_rgba(168,85,247,0.3)] overflow-hidden"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          {/* Internal Glow Effect */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/10 blur-3xl" />

          {/* Tagline */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/40 border border-purple-400/40 text-purple-300 text-sm font-medium mb-8 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_10px_#a855f7]" />
            Fullstack Developer & UI/UX Enthusiast
          </motion.div>

          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            Hello, I am <br />
            <span className="text-white drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">
              Hiruni Yasoda
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light max-w-lg mb-10">
            I am a <span className="text-white font-semibold">Passionate</span> developer 
            driven by the courage to explore the unknown. 
            With a <span className="text-white font-semibold">Creative</span> mind and 
            unrelenting dedication.
          </p>

          {/* --- STATS SECTION --- */}
          <div className="flex items-center gap-8 border-t border-purple-500/20 pt-8">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">1+</span>
              <span className="text-xs text-slate-400 uppercase tracking-widest">Year Exp.</span>
            </div>
            <div className="w-[1px] h-10 bg-purple-500/20" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">3+</span>
              <span className="text-xs text-slate-400 uppercase tracking-widest">Projects</span>
            </div>
            <div className="w-[1px] h-10 bg-purple-500/20" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">2+</span>
              <span className="text-xs text-slate-400 uppercase tracking-widest">Happy Clients</span>
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT SIDE: PROFILE IMAGE STACK --- */}
        <motion.div 
          className="relative flex items-center justify-center py-10 md:py-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          
          {/* --- "GET IN TOUCH" BUTTON --- */}
          {/* Position pulled inwards: md:right-4 md:-top-12 */}
          <motion.a 
            href="#contact"
            className="absolute top-0 right-0 md:right-4 md:-top-12 px-8 py-3 rounded-full bg-black/40 border border-purple-500/60 text-white font-medium backdrop-blur-md z-50 cursor-pointer"
            animate={{ 
              boxShadow: ["0 0 0px #a855f7", "0 0 15px #a855f7", "0 0 0px #a855f7"],
              borderColor: ["#a855f7", "#d8b4fe", "#a855f7"]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px #a855f7" }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>

          {/* Profile Image Container */}
          <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] flex items-center justify-center">
            {/* ROTATING RING EFFECT */}
            <motion.div 
                className="absolute inset-0 w-full h-full rounded-full overflow-hidden flex items-center justify-center scale-110"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >   
                <img 
                  src="/ProfileRing.jpg" 
                  alt="Profile Ring" 
                  className="w-full h-full object-cover mix-blend-screen opacity-80" 
                />
            </motion.div>
            
            {/* INNER PROFILE CIRCLE */}
            <div className="relative w-[58%] h-[58%] rounded-full overflow-hidden border-[4px] border-purple-500/40 shadow-[0_0_60px_rgba(168,85,247,0.3)] z-10 bg-black">
              <img 
                src="/profile.png" 
                alt="Hiruni Yasoda" 
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* CORE RADIANCE GLOW */}
            <div className="absolute w-[70%] h-[70%] bg-purple-600/20 blur-[90px] rounded-full -z-10 animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;