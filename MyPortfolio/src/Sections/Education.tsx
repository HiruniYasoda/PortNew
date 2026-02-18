import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, BookOpen, Scroll } from 'lucide-react'; // Icons for "Other" section
import Volunteering from './Volunteering';
import Achievements from './Achievements';

// --- EDUCATION DATA ---
const educationData = [
  {
    id: 1,
    title: "Senior Secondary",
    subtitle: "G.C.E. Ordinary Level (2019)",
    points: ["Yasodara Devi B.M.V", "9As"]
  },
  {
    id: 2,
    title: "Collegiate",
    subtitle: "G.C.E. Advanced Level (2022/2023)",
    points: ["Yasodara Devi B.M.V", "Physical Science Stream"]
  },
  {
    id: 3,
    title: "Diploma In Academic English",
    subtitle: "2023-2024",
    italic: "Pearson Assured",
    points: ["Grade - Distinction", "Esoft Metro Campus"]
  },
  {
    id: 4,
    title: "Diploma In IT",
    subtitle: "2023-2024",
    italic: "Pearson Assured",
    points: ["Grade - Distinction", "Esoft Metro Campus"]
  },
  {
    id: 5,
    title: "B.Sc(Hons) Computing & Information Systems", // Updated Title
    subtitle: "2024 - Present",
    points: ["Faculty of Computing", "Sabaragamuwa University"]
  }
];

// --- OTHER QUALIFICATIONS DATA ---
const otherQualifications = [
  {
    title: "Visharada (Violin)",
    subtitle: "Bhatkhande Sangit Vidyapith, Lucknow, India (2024)",
    points: ["Completed with Distinction(I)"],
    icon: Music
  },
  {
    title: "Dhamma School Final Examination",
    subtitle: "Successfully Completed - 2019",
    points: [],
    icon: Scroll // Using Scroll icon for certificate/exam
  }
];

// --- COMPONENTS ---

// 1. NEON DOT (On the Line)
const NeonDot: React.FC = () => (
  <motion.div 
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="w-4 h-4 rounded-full bg-purple-500 border-[3px] border-black shadow-[0_0_15px_#a855f7] z-20"
  />
);

// 2. GLASS CARD (General)
const GlassCard: React.FC<{ 
  title: string; 
  subtitle: string; 
  italic?: string; 
  points: string[]; 
  className?: string;
  icon?: React.ElementType;
}> = ({ title, subtitle, italic, points, className, icon: Icon }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.5 }}
      className={`bg-white/5 border border-purple-500/30 p-5 rounded-2xl backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.1)] group hover:border-purple-400/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all z-30 ${className}`}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-3 mb-2">
        {Icon ? (
            <div className="p-1.5 bg-purple-500/20 rounded-lg text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                <Icon size={18} />
            </div>
        ) : (
            <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_5px_#a855f7]" />
        )}
        <h3 className="text-base font-bold text-white leading-tight">{title}</h3>
      </div>
      
      <div className="mb-3 pl-4 border-l border-purple-500/30">
          {italic && <span className="text-purple-300 italic text-xs block mb-0.5">{italic}</span>}
          <p className="font-bold text-slate-200 text-sm">{subtitle}</p>
      </div>

      {points.length > 0 && (
        <ul className="space-y-1.5 bg-black/40 p-3 rounded-lg border border-white/5">
            {points.map((point, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-slate-300 font-light">
                <span className="w-1 h-1 rounded-full bg-purple-400 shrink-0" />
                <span>{point}</span>
            </li>
            ))}
        </ul>
      )}
    </motion.div>
  );
};


// --- SNAKE TIMELINE COMPONENT (DESKTOP) ---
const SnakeTimeline: React.FC = () => {
  // SVG Coordinates Configuration for Tighter Gap
  const TOP_Y = 150;
  const GAP = 160; // Reduced gap
  const BOTTOM_Y = TOP_Y + GAP; 
  
  return (
    <div className="relative w-full max-w-6xl h-[500px] hidden md:block mt-12 mb-8">
      
      {/* --- SVG DRAWING ANIMATION --- */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
        <defs>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7e22ce" />   {/* purple-700 */}
            <stop offset="50%" stopColor="#d946ef" />  {/* fuchsia-500 */}
            <stop offset="100%" stopColor="#a855f7" /> {/* purple-500 */}
          </linearGradient>
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Path Logic:
            Tighter curve and reduced vertical distance.
            M 100 150 -> L 950 150 (Top Line)
            Q 1050 150, 1050 230 (Curve Start) -> Q 1050 310, 950 310 (Curve End) -> NO, simplify to one arc
            Using cubic bezier or double quadratic for U-turn.
            Let's use: Line to 950. Curve to (1050, 230 - midpoint). Curve to (950, 310).
        */}
        <motion.path
          d={`M 100 ${TOP_Y} L 950 ${TOP_Y} Q 1050 ${TOP_Y} 1050 ${TOP_Y + (GAP/2)} Q 1050 ${BOTTOM_Y} 950 ${BOTTOM_Y} L 500 ${BOTTOM_Y}`}
          fill="none"
          stroke="url(#purpleGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#neonGlow)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        
        {/* Arrow Head */}
        <motion.path
          d={`M 520 ${BOTTOM_Y - 15} L 490 ${BOTTOM_Y} L 520 ${BOTTOM_Y + 15}`}
          fill="none"
          stroke="#d946ef"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#neonGlow)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 3, duration: 0.5 }}
        />
      </svg>

      {/* --- CONTENT PLACEMENT --- */}
      {/* Cards positioned relative to the SVG lines (150px and 310px) */}
      
      {/* 1. Senior Secondary (Left Top) */}
      <div className="absolute left-[10%] top-[150px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <NeonDot />
        <GlassCard {...educationData[0]} className="absolute bottom-8 w-[280px]" />
      </div>

      {/* 2. Collegiate (Middle Top) */}
      <div className="absolute left-[45%] top-[150px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <NeonDot />
        <GlassCard {...educationData[1]} className="absolute bottom-8 w-[280px]" />
      </div>

      {/* 3. Dip English (Right Top) */}
      <div className="absolute right-[10%] top-[150px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <NeonDot />
        <GlassCard {...educationData[2]} className="absolute bottom-8 w-[280px]" />
      </div>

      {/* 4. Dip IT (Right Bottom - Under Dip English) */}
      <div className="absolute right-[10%] top-[310px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <NeonDot />
        <GlassCard {...educationData[3]} className="absolute top-8 w-[280px]" />
      </div>

      {/* 5. BSc (Middle Bottom - Under Collegiate) */}
      <div className="absolute left-[45%] top-[310px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <NeonDot />
        <GlassCard {...educationData[4]} className="absolute top-8 w-[280px]" />
      </div>

    </div>
  );
};

// --- VERTICAL TIMELINE (MOBILE) ---
const VerticalTimeline: React.FC = () => {
  return (
    <div className="relative flex flex-col gap-12 md:hidden mt-8 pl-8 border-l-2 border-purple-500/30">
      {educationData.map((item, index) => (
        <motion.div 
          key={index} 
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 }}
        >
          <span className="absolute -left-[41px] top-6 w-5 h-5 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7] border-4 border-black" />
          <GlassCard {...item} className="w-full" />
        </motion.div>
      ))}
    </div>
  );
};

// --- OTHER QUALIFICATIONS COMPONENT ---
const OtherQualifications: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-12 md:mt-4">
      <div className="flex items-center gap-4 mb-8">
         <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Other
         </h3>
         <div className="h-[1px] flex-grow bg-purple-500/30" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {otherQualifications.map((item, idx) => (
           <GlassCard 
              key={idx}
              title={item.title}
              subtitle={item.subtitle}
              points={item.points}
              icon={item.icon}
              className="w-full"
           />
        ))}
      </div>
    </div>
  );
};


// --- MAIN SECTION ---
const HighlightsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'education' | 'achievements' | 'volunteering'>('education');

  return (
    <section id="highlights" className="relative min-h-screen w-full bg-black overflow-hidden py-24 flex flex-col items-center">
      
      {/* BACKGROUND: NEON HOLLOW CIRCLE (Left) */}
      <motion.div 
        className="absolute -left-[10%] top-[20%] w-[600px] h-[600px] rounded-full border-[2px] border-purple-900/30 bg-transparent z-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 40px rgba(168,85,247,0.2), 0 0 40px rgba(168,85,247,0.2)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* BACKGROUND: PULSATING CIRCLE (Bottom Right) - NEW */}
      <motion.div 
        className="absolute -right-[5%] -bottom-[10%] w-[300px] h-[300px] rounded-full border-[2px] border-purple-500/30 bg-transparent z-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 30px rgba(168,85,247,0.3), 0 0 30px rgba(168,85,247,0.3)" }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            My <span className="text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">Highlights</span>
          </motion.h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
            A journey through my academic milestones, recognized achievements, and contributions to the community.
          </p>
        </div>

        {/* TABS */}
        <div className="flex justify-center mb-8">
          <div className="relative flex flex-wrap justify-center bg-slate-900/50 p-1 rounded-full border border-purple-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.1)]">
            <motion.div
              className="absolute top-1 bottom-1 rounded-full bg-purple-600 shadow-[0_0_20px_#a855f7]"
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                left: activeTab === 'education' ? '4px' : activeTab === 'achievements' ? '33%' : '66%',
                width: '33%',
                opacity: 0.8
              }}
            />
            {['Education', 'Achievements', 'Volunteering'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase() as any)}
                className={`relative z-10 px-6 md:px-10 py-3 rounded-full text-sm md:text-base font-semibold transition-colors duration-300 ${
                  activeTab === tab.toLowerCase() ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <AnimatePresence mode="wait">
          
          {activeTab === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center"
            >
              <SnakeTimeline />
              <VerticalTimeline />
              <OtherQualifications />
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Achievements />
            </motion.div>
          )}

          {activeTab === 'volunteering' && (
            <motion.div
              key="volunteering"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Volunteering />
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
};

export default HighlightsSection;