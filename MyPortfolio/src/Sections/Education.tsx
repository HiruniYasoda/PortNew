import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Scroll, Pencil, GraduationCap } from 'lucide-react';
import Volunteering from './Volunteering';
import Achievements from './Achievements';
import { useAdmin } from '../Context/AdminContext';
import {
  EducationEditModal,
  EducationSectionData,
  EducationItem,
  QualificationItem,
} from '../Components/Admin/EducationEditModal';

// --- DEFAULT EDUCATION DATA ---
const DEFAULT_TIMELINE: EducationItem[] = [
  {
    id: 1,
    title: 'Senior Secondary',
    subtitle: 'G.C.E. Ordinary Level (2019)',
    points: ['Yasodara Devi B.M.V', '9As'],
  },
  {
    id: 2,
    title: 'Collegiate',
    subtitle: 'G.C.E. Advanced Level (2022/2023)',
    points: ['Yasodara Devi B.M.V', 'Physical Science Stream'],
  },
  {
    id: 3,
    title: 'Diploma In Academic English',
    subtitle: '2023-2024',
    italic: 'Pearson Assured',
    points: ['Grade - Distinction', 'Esoft Metro Campus'],
  },
  {
    id: 4,
    title: 'Diploma In IT',
    subtitle: '2023-2024',
    italic: 'Pearson Assured',
    points: ['Grade - Distinction', 'Esoft Metro Campus'],
  },
  {
    id: 5,
    title: 'B.Sc(Hons) Computing & Information Systems',
    subtitle: '2024 - Present',
    points: ['Faculty of Computing', 'Sabaragamuwa University'],
  },
];

const DEFAULT_OTHER_QUALIFICATIONS: QualificationItem[] = [
  {
    id: 'other-1',
    title: 'Visharada (Violin)',
    subtitle: 'Bhatkhande Sangit Vidyapith, Lucknow, India (2024)',
    points: ['Completed with Distinction(I)'],
  },
  {
    id: 'other-2',
    title: 'Dhamma School Final Examination',
    subtitle: 'Successfully Completed - 2019',
    points: [],
  },
];

// --- COMPONENTS ---
const NeonDot: React.FC = () => (
  <motion.div
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className="w-4 h-4 rounded-full bg-purple-500 border-[3px] border-black shadow-[0_0_15px_#a855f7] z-20"
  />
);

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

      {points && points.length > 0 && (
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

// --- DYNAMIC SNAKE TIMELINE (BENDS DOWNWARD ROW-BY-ROW FOR N ITEMS) ---
const SnakeTimeline: React.FC<{ items: EducationItem[] }> = ({ items }) => {
  const numItems = items.length;
  const itemsPerRow = 3;
  const numRows = Math.max(1, Math.ceil(numItems / itemsPerRow));
  const TOP_Y = 150;
  const ROW_GAP = 180;
  const totalHeight = numRows * ROW_GAP + 120;

  // Build dynamic SVG path
  let pathD = '';
  for (let r = 0; r < numRows; r++) {
    const y = TOP_Y + r * ROW_GAP;
    if (r === 0) {
      pathD += `M 100 ${y} `;
    }

    if (r % 2 === 0) {
      // Even row: Left -> Right
      pathD += `L 950 ${y} `;
      if (r < numRows - 1) {
        const nextY = y + ROW_GAP;
        pathD += `Q 1050 ${y} 1050 ${y + ROW_GAP / 2} Q 1050 ${nextY} 950 ${nextY} `;
      }
    } else {
      // Odd row: Right -> Left
      pathD += `L 100 ${y} `;
      if (r < numRows - 1) {
        const nextY = y + ROW_GAP;
        pathD += `Q 0 ${y} 0 ${y + ROW_GAP / 2} Q 0 ${nextY} 100 ${nextY} `;
      }
    }
  }

  const lastRow = numRows - 1;
  const lastY = TOP_Y + lastRow * ROW_GAP;
  const isLastRowEven = lastRow % 2 === 0;

  return (
    <div className="relative w-full max-w-6xl hidden md:block mt-12 mb-8" style={{ height: `${totalHeight}px` }}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox={`0 0 1050 ${totalHeight}`}>
        <defs>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7e22ce" />
            <stop offset="50%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#purpleGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#neonGlow)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
        />

        {/* Arrowhead at end */}
        {isLastRowEven ? (
          <motion.path
            d={`M 930 ${lastY - 15} L 960 ${lastY} L 930 ${lastY + 15}`}
            fill="none"
            stroke="#d946ef"
            strokeWidth="6"
            strokeLinecap="round"
            filter="url(#neonGlow)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2.5, duration: 0.5 }}
          />
        ) : (
          <motion.path
            d={`M 120 ${lastY - 15} L 90 ${lastY} L 120 ${lastY + 15}`}
            fill="none"
            stroke="#d946ef"
            strokeWidth="6"
            strokeLinecap="round"
            filter="url(#neonGlow)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2.5, duration: 0.5 }}
          />
        )}
      </svg>

      {/* Item Dot & Card Placement */}
      {items.map((item, idx) => {
        const row = Math.floor(idx / 3);
        const colInRow = idx % 3;
        const isEvenRow = row % 2 === 0;
        const y = TOP_Y + row * ROW_GAP;

        let xPosStyle: React.CSSProperties = {};
        if (isEvenRow) {
          if (colInRow === 0) xPosStyle = { left: '10%' };
          else if (colInRow === 1) xPosStyle = { left: '50%' };
          else xPosStyle = { left: '90%' };
        } else {
          if (colInRow === 0) xPosStyle = { left: '90%' };
          else if (colInRow === 1) xPosStyle = { left: '50%' };
          else xPosStyle = { left: '10%' };
        }

        const isCardAbove = isEvenRow;

        return (
          <div
            key={item.id || idx}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
            style={{ ...xPosStyle, top: `${y}px` }}
          >
            <NeonDot />
            <GlassCard
              title={item.title}
              subtitle={item.subtitle}
              italic={item.italic}
              points={item.points}
              className={`absolute w-[280px] ${isCardAbove ? 'bottom-8' : 'top-8'}`}
            />
          </div>
        );
      })}
    </div>
  );
};

const VerticalTimeline: React.FC<{ items: EducationItem[] }> = ({ items }) => {
  return (
    <div className="relative flex flex-col gap-12 md:hidden mt-8 pl-8 border-l-2 border-purple-500/30 w-full max-w-xl mx-auto">
      {items.map((item, index) => (
        <motion.div
          key={item.id || index}
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 }}
        >
          <span className="absolute -left-[41px] top-6 w-5 h-5 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7] border-4 border-black" />
          <GlassCard {...item} className="w-full" />
        </motion.div>
      ))}
    </div>
  );
};

const OtherQualifications: React.FC<{ items: QualificationItem[] }> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 md:mt-4">
      <div className="flex items-center gap-4 mb-8">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          Other Qualifications
        </h3>
        <div className="h-[1px] flex-grow bg-purple-500/30" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, idx) => {
          const IconComponent = item.title.toLowerCase().includes('music') || item.title.toLowerCase().includes('violin')
            ? Music
            : Scroll;

          return (
            <GlassCard
              key={item.id || idx}
              title={item.title}
              subtitle={item.subtitle}
              points={item.points}
              icon={IconComponent}
              className="w-full"
            />
          );
        })}
      </div>
    </div>
  );
};

// --- MAIN SECTION ---
const HighlightsSection: React.FC = () => {
  const { isAdmin } = useAdmin();
  const [activeTab, setActiveTab] = useState<'education' | 'achievements' | 'volunteering'>('education');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [eduData, setEduData] = useState<EducationSectionData>({
    timeline: DEFAULT_TIMELINE,
    otherQualifications: DEFAULT_OTHER_QUALIFICATIONS,
  });

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_education_data');
    if (saved) {
      try {
        setEduData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse education data', e);
      }
    }
  }, []);

  const handleSaveEducation = (updated: EducationSectionData) => {
    setEduData(updated);
    localStorage.setItem('portfolio_education_data', JSON.stringify(updated));
  };

  const tabs = ['Education', 'Achievements', 'Volunteering'];

  return (
    <section id="highlights" className="relative min-h-screen w-full bg-black overflow-hidden py-24 flex flex-col items-center">
      {/* Education Edit Modal */}
      <EducationEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={eduData}
        onSave={handleSaveEducation}
      />

      {/* BACKGROUND: NEON HOLLOW CIRCLE (Left) */}
      <motion.div
        className="absolute -left-[10%] top-[20%] w-[600px] h-[600px] rounded-full border-[2px] border-purple-900/30 bg-transparent z-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 40px rgba(168,85,247,0.2), 0 0 40px rgba(168,85,247,0.2)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />

      {/* BACKGROUND: PULSATING CIRCLE (Bottom Right) */}
      <motion.div
        className="absolute -right-[5%] -bottom-[10%] w-[300px] h-[300px] rounded-full border-[2px] border-purple-500/30 bg-transparent z-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 30px rgba(168,85,247,0.3), 0 0 30px rgba(168,85,247,0.3)' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* HEADER WITH ADMIN PENCIL BUTTON */}
        <div className="flex flex-col items-center justify-center text-center mb-12 relative">
          {isAdmin && activeTab === 'education' && (
            <div className="mb-4 flex justify-center">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-purple-600 border border-purple-400/50 text-white shadow-[0_0_20px_rgba(168,85,247,0.7)] hover:scale-105 hover:bg-purple-500 transition-all flex items-center gap-1.5 text-xs font-bold z-30"
                title="Edit Education & Qualifications"
              >
                <Pencil size={14} />
                <span>Edit Education</span>
              </button>
            </div>
          )}

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

        {/* TABS SWITCHER BAR */}
        <div className="flex justify-center mb-16">
          <div className="relative flex flex-wrap justify-center bg-slate-900/50 p-1.5 rounded-full border border-purple-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.1)]">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.toLowerCase();
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase() as any)}
                  className={`relative px-5 md:px-8 py-2.5 rounded-full text-sm md:text-base font-semibold transition-colors duration-300 z-10 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeHighlightTab"
                      className="absolute inset-0 bg-purple-600 rounded-full shadow-[0_0_15px_#a855f7] -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {tab}
                </button>
              );
            })}
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
              <SnakeTimeline items={eduData.timeline} />
              <VerticalTimeline items={eduData.timeline} />
              <OtherQualifications items={eduData.otherQualifications} />
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