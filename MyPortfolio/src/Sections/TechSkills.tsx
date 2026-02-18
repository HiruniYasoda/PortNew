import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Server, Cpu, Layout } from 'lucide-react';
import SoftSkills from './SoftSkills';

// --- TYPES & DATA ---
type Category = 'Frontend' | 'Backend' | 'Database' | 'AI/ML';

interface Skill {
  name: string;
  level: number; 
}

interface SkillCategory {
  title: Category;
  icon: React.ElementType;
  skills: Skill[];
}

const technicalData: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: Layout,
    skills: [
      { name: 'React / Next.js', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'React Native', level: 80 },
      { name: 'Tailwind CSS', level: 95 },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'Java (OOP)', level: 75 },
      { name: 'REST APIs', level: 90 },
    ],
  },
  {
    title: 'Database',
    icon: Database,
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 70 },
      { name: 'Firebase', level: 80 },
      { name: 'MySQL', level: 75 },
    ],
  },
  {
    title: 'AI/ML',
    icon: Cpu,
    skills: [
      { name: 'Python for ML', level: 75 },
      { name: 'Data Analysis', level: 70 },
      { name: 'TensorFlow Basics', level: 60 },
      { name: 'OpenCV', level: 65 },
    ],
  },
];

// --- COMPONENT: PROGRESS BAR ---
const NeonProgressBar: React.FC<{ level: number }> = ({ level }) => {
  return (
    <div className="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden relative">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="h-full rounded-full bg-gradient-to-r from-purple-900 via-purple-500 to-purple-400 relative"
        style={{
          boxShadow: "0 0 10px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.3)",
        }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#fff]" />
      </motion.div>
    </div>
  );
};

// --- COMPONENT: GLASS CARD (Technical) ---
const TechnicalCard: React.FC<{ category: SkillCategory }> = ({ category }) => {
  return (
    <motion.div 
      className="relative group rounded-2xl p-[1px] overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-[-100%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          background: "conic-gradient(from 0deg, transparent 0deg, transparent 80deg, #a855f7 180deg, transparent 280deg, transparent 360deg)",
          opacity: 0.8
        }}
      />
      
      <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl p-6 h-full border border-purple-500/20 group-hover:border-purple-500/40 transition-colors">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:bg-purple-500/20 transition-all">
            <category.icon size={24} />
          </div>
          <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-purple-300 transition-colors">
            {category.title}
          </h3>
        </div>

        <div className="space-y-5">
          {category.skills.map((skill, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-slate-300 font-medium tracking-wide">{skill.name}</span>
                <span className="text-xs text-purple-400 font-bold drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">{skill.level}%</span>
              </div>
              <NeonProgressBar level={skill.level} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- COMPONENT: MAIN SKILLS SECTION ---
const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'technical' | 'soft'>('technical');

  return (
    <section id="skills" className="relative min-h-screen w-full bg-black overflow-hidden py-24">
      
      {/* --- BACKGROUND: SINGLE LARGE HOLLOW NEON DOME --- */}
      <motion.div 
        className="absolute top-[-45vw] left-1/2 transform -translate-x-1/2 w-[90vw] h-[90vw] rounded-full border-[2px] border-purple-900/40 bg-transparent z-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 60px rgba(168,85,247,0.15), 0 0 60px rgba(168,85,247,0.15)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            My <span className="text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">Skills</span>
          </motion.h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
            A showcase of my technical proficiency and professional attributes driven by a passion for continuous learning.
          </p>
        </div>

        {/* --- NEON TOGGLE SWITCH --- */}
        <div className="flex justify-center mb-16">
          <div className="relative flex bg-slate-900/50 p-1 rounded-full border border-purple-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.1)]">
            
            {/* Sliding Glow Background */}
            <motion.div
              className="absolute top-1 bottom-1 rounded-full bg-purple-600 shadow-[0_0_20px_#a855f7]"
              initial={false}
              animate={{
                left: activeTab === 'technical' ? '4px' : '50%',
                width: 'calc(50% - 4px)',
                x: activeTab === 'technical' ? 0 : 0
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {/* Buttons */}
            <button
              onClick={() => setActiveTab('technical')}
              className={`relative z-10 px-8 py-3 rounded-full text-sm md:text-base font-semibold transition-colors duration-300 w-40 ${
                activeTab === 'technical' ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Technical
            </button>
            <button
              onClick={() => setActiveTab('soft')}
              className={`relative z-10 px-8 py-3 rounded-full text-sm md:text-base font-semibold transition-colors duration-300 w-40 ${
                activeTab === 'soft' ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Soft Skills
            </button>
          </div>
        </div>

        {/* --- CONTENT AREA --- */}
        <AnimatePresence mode="wait">
          {activeTab === 'technical' ? (
            <motion.div
              key="technical"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              {/* Technical Header (Added to match Soft Skills) */}
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                  Technical Proficiency
                </h3>
                <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
                   Expertise in modern web technologies, from frontend interfaces to robust backend architecture and data management.
                </p>
              </div>

              {/* Technical Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {technicalData.map((category, index) => (
                  <TechnicalCard key={index} category={category} />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="soft"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <SoftSkills />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default SkillsSection;