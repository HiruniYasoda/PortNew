import React from 'react';
import { motion, Variants } from 'framer-motion';

const AboutSection: React.FC = () => {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const roles = [
    "Fullstack Developer",
    "Mobile App Developer",
    "Article Writer",
    "AI / ML Learning Student"
  ];

  return (
    <section id="about" className="relative py-24 bg-black overflow-hidden">
      
      {/* --- BACKGROUND NEON BUBBLES --- */}
      
      {/* 1. Middle Left Bubble (Existing) */}
      <motion.div
        className="absolute left-[-10%] top-[30%] w-[400px] h-[400px] rounded-full z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0) 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ y: [0, 40, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 2. Dead Middle Bubble (New) */}
      <motion.div
        className="absolute left-[30%] top-[40%] w-[500px] h-[500px] rounded-full z-0 pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0) 70%)',
          filter: 'blur(80px)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3. Right Top Bubble (New) */}
      <motion.div
        className="absolute right-[-5%] top-[-10%] w-[350px] h-[350px] rounded-full z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(168, 85, 247, 0) 70%)',
          filter: 'blur(50px)',
        }}
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* 4. Right Middle Bubble (New) */}
      <motion.div
        className="absolute right-[-10%] top-[50%] w-[450px] h-[450px] rounded-full z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0) 70%)',
          filter: 'blur(70px)',
        }}
        animate={{ y: [0, -50, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* --- INTENSE NEON SIDE LINES --- */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-purple-400 shadow-[0_0_15px_#a855f7,0_0_30px_#a855f7] z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-purple-400 shadow-[0_0_15px_#a855f7,0_0_30px_#a855f7] z-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- 1. SECTION HEADING --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wider">
            ABOUT ME
          </h2>
          <div className="w-24 h-[2px] bg-purple-100 mx-auto mt-4 rounded-full shadow-[0_0_10px_#fff,0_0_20px_#a855f7,0_0_40px_#a855f7]"></div>
        </motion.div>

        {/* --- 2. CENTERED IMAGE --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
          className="flex justify-center mb-12"
        >
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-[3px] border-purple-300 shadow-[0_0_20px_#a855f7,inset_0_0_15px_#a855f7] bg-black">
            <img 
              src="/profile.png" 
              alt="Hiruni Yasoda" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* --- 3. BIO TEXT + NEON POINTS --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-lg md:text-xl text-slate-300 leading-loose font-light mb-12">
            Hello! I'm <span className="text-white font-medium drop-shadow-[0_0_8px_#a855f7]">Hiruni Yasoda</span>, 
            an undergraduate at Plymouth University (NSBM) pursuing a BSc (Hons) in Software Engineering. 
            I am driven by a deep love for problem-solving and crafting intuitive, dynamic user experiences that live on the web.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left md:ml-24">
            {roles.map((role, index) => (
              <div key={index} className="flex items-center gap-5 group">
                <span className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_#fff,0_0_20px_#a855f7] group-hover:scale-125 transition-transform duration-300"></span>
                <span className="text-lg text-white font-light tracking-wide group-hover:text-purple-300 transition-colors duration-300">
                  {role}
                </span>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;