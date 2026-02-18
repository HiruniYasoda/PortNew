import React from 'react';
import { motion, Variants } from 'framer-motion'; // 1. Import Variants
import { Download, Github, Linkedin, Code, Database, BookOpen } from 'lucide-react';

const AboutSection: React.FC = () => {
  // 2. Add ': Variants' type here
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // 3. Add ': Variants' type here
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="about" className="relative min-h-screen w-full bg-black overflow-hidden flex items-center py-20">
      
      {/* --- BACKGROUND: HOLLOW NEON CIRCLES --- */}
      
      {/* 1. Large Left Hollow Circle */}
      <motion.div 
        className="absolute -left-[10%] top-[20%] w-[600px] h-[600px] rounded-full border-[2px] border-purple-900/30 bg-transparent z-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 40px rgba(168,85,247,0.2), 0 0 40px rgba(168,85,247,0.2)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* 2. Small Bottom Right Hollow Circle */}
      <motion.div 
        className="absolute -right-[5%] -bottom-[10%] w-[300px] h-[300px] rounded-full border-[2px] border-purple-500/30 bg-transparent z-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 30px rgba(168,85,247,0.3), 0 0 30px rgba(168,85,247,0.3)" }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-10">
        
        {/* --- LEFT SIDE: TEXT CONTENT & STATS --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:pr-12"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Crafting Digital <br />
            Experiences That <span className="text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">Matter</span>
          </motion.h2>

          <motion.div variants={itemVariants} className="space-y-6 text-slate-300 text-m font-light leading-relaxed mb-10 max-w-xl">
             <motion.p whileHover={{ color: "#e2e8f0" }} transition={{ duration: 0.3 }}>
              I'm a passionate Fullstack developer with experience building scalable, 
              performant web applications. I specialize in creating intuitive user interfaces 
              that combine beautiful design with exceptional functionality.
            </motion.p>
            <motion.p whileHover={{ color: "#e2e8f0" }} transition={{ duration: 0.3 }}>
              My expertise spans the entire frontend ecosystem, from React and Next.js to 
              TypeScript and modern CSS frameworks. I'm committed to writing clean, 
              maintainable code and staying current with the latest web technologies.
            </motion.p>
            <motion.p whileHover={{ color: "#e2e8f0" }} transition={{ duration: 0.3 }}>
              When I'm not coding, you'll find me contributing to open-source projects, 
              writing technical articles, or exploring new design trends.
            </motion.p>
          </motion.div>

          {/* STATS WITH NEON BEAMS */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-8 md:gap-12 border-t border-purple-500/20 pt-8">
            <div className="group">
              <h3 className="text-3xl font-bold text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.6)] group-hover:text-purple-300 transition-colors">45+</h3>
              <p className="text-sm text-slate-400 mt-1 uppercase tracking-wider group-hover:text-slate-200 transition-colors">Happy Clients</p>
            </div>
            
            <div className="w-[2px] h-12 bg-purple-500 shadow-[0_0_15px_#a855f7]" />
            
            <div className="group">
              <h3 className="text-3xl font-bold text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.6)] group-hover:text-purple-300 transition-colors">2.5K+</h3>
              <p className="text-sm text-slate-400 mt-1 uppercase tracking-wider group-hover:text-slate-200 transition-colors">Code Commits</p>
            </div>

            <div className="w-[2px] h-12 bg-purple-500 shadow-[0_0_15px_#a855f7]" />

            <div className="group">
              <h3 className="text-3xl font-bold text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.6)] group-hover:text-purple-300 transition-colors">500+</h3>
              <p className="text-sm text-slate-400 mt-1 uppercase tracking-wider group-hover:text-slate-200 transition-colors">GitHub Stars</p>
            </div>
          </motion.div>
        </motion.div>


        {/* --- RIGHT SIDE: BENTO GRID GLASS CONTAINERS --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          
          {/* 1. DOWNLOAD CV */}
          <motion.a 
            variants={itemVariants}
            href="/cv.pdf" 
            download
            className="md:col-span-2 bg-white/5 border border-purple-500/20 p-6 rounded-2xl backdrop-blur-md transition-all group cursor-pointer relative overflow-hidden"
            whileHover={{ scale: 1.02, backgroundColor: "rgba(168, 85, 247, 0.1)", borderColor: "rgba(168, 85, 247, 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start justify-between relative z-10">
              <div>
                <h4 className="text-xl font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">Download CV</h4>
                <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">Get a copy of my resume to see my full professional journey and skills.</p>
              </div>
              <motion.div 
                className="p-3 bg-purple-500/20 rounded-lg text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <Download size={24} />
              </motion.div>
            </div>
          </motion.a>

          {/* 2. GITHUB */}
          <motion.a 
            variants={itemVariants}
            href="https://github.com" 
            target="_blank"
            className="bg-white/5 border border-purple-500/20 p-6 rounded-2xl backdrop-blur-md transition-all group cursor-pointer"
            whileHover={{ scale: 1.03, backgroundColor: "rgba(168, 85, 247, 0.1)", borderColor: "rgba(168, 85, 247, 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col h-full justify-between">
              <motion.div 
                className="p-3 w-fit bg-purple-500/20 rounded-lg text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all mb-4 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <Github size={24} />
              </motion.div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">GitHub</h4>
                <p className="text-slate-400 text-xs group-hover:text-slate-300 transition-colors">Explore my open source contributions & repos.</p>
              </div>
            </div>
          </motion.a>

          {/* 3. LINKEDIN */}
          <motion.a 
            variants={itemVariants}
            href="https://linkedin.com" 
            target="_blank"
            className="bg-white/5 border border-purple-500/20 p-6 rounded-2xl backdrop-blur-md transition-all group cursor-pointer"
            whileHover={{ scale: 1.03, backgroundColor: "rgba(168, 85, 247, 0.1)", borderColor: "rgba(168, 85, 247, 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col h-full justify-between">
              <motion.div 
                className="p-3 w-fit bg-purple-500/20 rounded-lg text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all mb-4 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                whileHover={{ rotate: -10, scale: 1.1 }}
              >
                <Linkedin size={24} />
              </motion.div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">LinkedIn</h4>
                <p className="text-slate-400 text-xs group-hover:text-slate-300 transition-colors">Let's connect and expand our network.</p>
              </div>
            </div>
          </motion.a>

          {/* 4. PLATFORM TRIO */}
          <motion.div variants={itemVariants} className="md:col-span-2 bg-white/5 border border-purple-500/20 rounded-2xl backdrop-blur-md flex divide-x divide-purple-500/20 overflow-hidden">
            
            <motion.a 
              href="#" 
              className="flex-1 p-4 flex flex-col items-center justify-center hover:bg-purple-900/20 transition-colors group relative"
              whileHover={{ backgroundColor: "rgba(168, 85, 247, 0.15)" }}
            >
              <motion.div whileHover={{ y: -3 }}>
                <Code className="text-slate-400 group-hover:text-purple-400 mb-2 transition-colors" size={24} />
              </motion.div>
              <span className="text-xs text-slate-300 group-hover:text-white transition-colors">HackerRank</span>
            </motion.a>

            <motion.a 
              href="#" 
              className="flex-1 p-4 flex flex-col items-center justify-center hover:bg-purple-900/20 transition-colors group relative"
              whileHover={{ backgroundColor: "rgba(168, 85, 247, 0.15)" }}
            >
              <motion.div whileHover={{ y: -3 }}>
                <Database className="text-slate-400 group-hover:text-purple-400 mb-2 transition-colors" size={24} />
              </motion.div>
              <span className="text-xs text-slate-300 group-hover:text-white transition-colors">Kaggle</span>
            </motion.a>

            <motion.a 
              href="#" 
              className="flex-1 p-4 flex flex-col items-center justify-center hover:bg-purple-900/20 transition-colors group relative"
              whileHover={{ backgroundColor: "rgba(168, 85, 247, 0.15)" }}
            >
              <motion.div whileHover={{ y: -3 }}>
                <BookOpen className="text-slate-400 group-hover:text-purple-400 mb-2 transition-colors" size={24} />
              </motion.div>
              <span className="text-xs text-slate-300 group-hover:text-white transition-colors">Medium</span>
            </motion.a>

          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;