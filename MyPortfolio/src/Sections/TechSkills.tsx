import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Server, Cpu, Layout, Pencil, Code, Brain, Users, Lightbulb, MessageSquare, Crown, Sparkles } from 'lucide-react';
import { useAdmin } from '../Context/AdminContext';
import {
  SkillsEditModal,
  SkillsSectionData,
  SkillTabGroup,
  SkillCategoryData,
} from '../Components/Admin/SkillsEditModal';

const DEFAULT_SKILLS_DATA: SkillsSectionData = {
  headerTitle: 'My Skills',
  headerSubtitle:
    'A showcase of my technical proficiency and professional attributes driven by a passion for continuous learning.',
  tabs: [
    {
      id: 'tab-tech',
      tabName: 'Technical',
      description:
        'Expertise in modern web technologies, from frontend interfaces to robust backend architecture and data management.',
      displayStyle: 'bar',
      categories: [
        {
          id: 'cat-1',
          title: 'Frontend',
          skills: [
            { id: 'sk-1', name: 'React / Next.js', level: 90 },
            { id: 'sk-2', name: 'TypeScript', level: 85 },
            { id: 'sk-3', name: 'React Native', level: 80 },
            { id: 'sk-4', name: 'Tailwind CSS', level: 95 },
          ],
        },
        {
          id: 'cat-2',
          title: 'Backend',
          skills: [
            { id: 'sk-5', name: 'Node.js', level: 85 },
            { id: 'sk-6', name: 'Python', level: 80 },
            { id: 'sk-7', name: 'Java (OOP)', level: 75 },
            { id: 'sk-8', name: 'REST APIs', level: 90 },
          ],
        },
        {
          id: 'cat-3',
          title: 'Database',
          skills: [
            { id: 'sk-9', name: 'MongoDB', level: 85 },
            { id: 'sk-10', name: 'PostgreSQL', level: 70 },
            { id: 'sk-11', name: 'Firebase', level: 80 },
            { id: 'sk-12', name: 'MySQL', level: 75 },
          ],
        },
        {
          id: 'cat-4',
          title: 'AI/ML',
          skills: [
            { id: 'sk-13', name: 'Python for ML', level: 75 },
            { id: 'sk-14', name: 'Data Analysis', level: 70 },
            { id: 'sk-15', name: 'TensorFlow Basics', level: 60 },
            { id: 'sk-16', name: 'OpenCV', level: 65 },
          ],
        },
      ],
    },
    {
      id: 'tab-soft',
      tabName: 'Soft Skills',
      description:
        'Essential abilities that drive successful collaboration, leadership, and efficient project delivery in dynamic environments.',
      displayStyle: 'circular',
      categories: [
        {
          id: 'cat-soft',
          title: 'Interpersonal & Leadership',
          skills: [
            { id: 'soft-1', name: 'Problem Solving', level: 90 },
            { id: 'soft-2', name: 'Teamwork', level: 85 },
            { id: 'soft-3', name: 'Creativity', level: 95 },
            { id: 'soft-4', name: 'Communication', level: 80 },
            { id: 'soft-5', name: 'Leadership', level: 85 },
          ],
        },
      ],
    },
  ],
};

const getCategoryIcon = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes('front') || lower.includes('ui') || lower.includes('web')) return Layout;
  if (lower.includes('back') || lower.includes('api') || lower.includes('server')) return Server;
  if (lower.includes('data') || lower.includes('db') || lower.includes('sql')) return Database;
  if (lower.includes('ai') || lower.includes('ml') || lower.includes('cloud') || lower.includes('ops')) return Cpu;
  return Code;
};

const getSoftIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('problem') || lower.includes('think') || lower.includes('brain')) return Brain;
  if (lower.includes('team') || lower.includes('collab') || lower.includes('group')) return Users;
  if (lower.includes('creat') || lower.includes('idea') || lower.includes('inno')) return Lightbulb;
  if (lower.includes('comm') || lower.includes('speak') || lower.includes('talk')) return MessageSquare;
  if (lower.includes('lead') || lower.includes('manag')) return Crown;
  return Sparkles;
};

// --- COMPONENT: PROGRESS BAR ---
const NeonProgressBar: React.FC<{ level: number }> = ({ level }) => {
  return (
    <div className="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden relative">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="h-full rounded-full bg-gradient-to-r from-purple-900 via-purple-500 to-purple-400 relative"
        style={{
          boxShadow: '0 0 10px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.3)',
        }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#fff]" />
      </motion.div>
    </div>
  );
};

// --- COMPONENT: TECHNICAL CARD ---
const TechnicalCard: React.FC<{ category: SkillCategoryData }> = ({ category }) => {
  const Icon = getCategoryIcon(category.title);

  return (
    <motion.div
      className="relative group rounded-2xl p-[1px] overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-[-100%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, transparent 80deg, #a855f7 180deg, transparent 280deg, transparent 360deg)',
          opacity: 0.8,
        }}
      />

      <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl p-6 h-full border border-purple-500/20 group-hover:border-purple-500/40 transition-colors">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:bg-purple-500/20 transition-all">
            <Icon size={24} />
          </div>
          <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-purple-300 transition-colors">
            {category.title}
          </h3>
        </div>

        <div className="space-y-5">
          {category.skills.map((skill) => (
            <div key={skill.id}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-slate-300 font-medium tracking-wide">{skill.name}</span>
                <span className="text-xs text-purple-400 font-bold drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">
                  {skill.level}%
                </span>
              </div>
              <NeonProgressBar level={skill.level} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- COMPONENT: CIRCULAR SKILL BADGE ---
const CircularSkill: React.FC<{ label: string; level: number; index: number }> = ({ label, level, index }) => {
  const Icon = getSoftIcon(label);
  const size = 120;
  const strokeWidth = 5;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  const angle = (level / 100) * 360;
  const angleInRad = (angle - 90) * (Math.PI / 180);
  const tipX = center + radius * Math.cos(angleInRad);
  const tipY = center + radius * Math.sin(angleInRad);

  return (
    <div className="flex flex-col items-center justify-center gap-5 group">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <defs>
            <linearGradient id={`neonGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#581c87" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
          <circle cx={center} cy={center} r={radius} stroke="#1e293b" strokeOpacity="0.5" strokeWidth={strokeWidth} fill="transparent" />
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            stroke={`url(#neonGrad-${index})`}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference, opacity: 0 }}
            whileInView={{ strokeDashoffset, opacity: 1 }}
            transition={{ duration: 2, ease: 'easeOut', delay: index * 0.1 }}
            viewport={{ once: true }}
            style={{ filter: `drop-shadow(0 0 4px rgba(168, 85, 247, 0.6))` }}
          />
        </svg>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
          viewport={{ once: true }}
          className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#fff] z-10"
          style={{ left: tipX - 3, top: tipY - 3 }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <Icon size={24} className="text-purple-300 mb-2 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
          <span className="text-sm font-bold tracking-wider">{level}%</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-white tracking-wide group-hover:text-purple-300 transition-colors text-center">
        {label}
      </h3>
    </div>
  );
};

// --- MAIN SKILLS SECTION ---
const SkillsSection: React.FC = () => {
  const { isAdmin } = useAdmin();
  const [skillsData, setSkillsData] = useState<SkillsSectionData>(DEFAULT_SKILLS_DATA);
  const [selectedTabId, setSelectedTabId] = useState<string>('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_skills_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSkillsData(parsed);
        if (parsed.tabs && parsed.tabs.length > 0) {
          setSelectedTabId(parsed.tabs[0].id);
        }
      } catch (e) {
        console.error('Failed to parse skills data', e);
      }
    }
  }, []);

  const handleSave = (updated: SkillsSectionData) => {
    setSkillsData(updated);
    localStorage.setItem('portfolio_skills_data', JSON.stringify(updated));
  };

  // Resolve Tabs List
  const activeTabs: SkillTabGroup[] = skillsData.tabs && skillsData.tabs.length > 0
    ? skillsData.tabs
    : DEFAULT_SKILLS_DATA.tabs || [];

  const currentTab: SkillTabGroup = activeTabs.find((t) => t.id === selectedTabId) || activeTabs[0] || DEFAULT_SKILLS_DATA.tabs![0];

  return (
    <section id="skills" className="relative min-h-screen w-full bg-black overflow-hidden py-24">
      {/* Edit Modal */}
      <SkillsEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={skillsData}
        onSave={handleSave}
      />

      {/* --- BACKGROUND DOME --- */}
      <motion.div
        className="absolute top-[-45vw] left-1/2 transform -translate-x-1/2 w-[90vw] h-[90vw] rounded-full border-[2px] border-purple-900/40 bg-transparent z-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 60px rgba(168,85,247,0.15), 0 0 60px rgba(168,85,247,0.15)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* --- SECTION HEADER --- */}
        <div className="relative text-center mb-16">
          {/* Admin Pencil Button */}
          {isAdmin && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="absolute top-0 right-0 z-30 px-4 py-2 rounded-xl bg-purple-600 border border-purple-400/50 text-white shadow-[0_0_20px_rgba(168,85,247,0.7)] hover:scale-105 hover:bg-purple-500 transition-all flex items-center gap-1.5 text-xs font-bold"
              title="Edit Skills & Tabs"
            >
              <Pencil size={14} />
              <span>Edit Skills</span>
            </button>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            {skillsData.headerTitle.includes('Skills') ? (
              <>
                {skillsData.headerTitle.replace('Skills', '').trim()} <span className="text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">Skills</span>
              </>
            ) : (
              skillsData.headerTitle
            )}
          </motion.h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
            {skillsData.headerSubtitle}
          </p>
        </div>

        {/* --- DYNAMIC NEON TOGGLE SWITCH BAR --- */}
        <div className="flex justify-center mb-16">
          <div className="relative flex bg-slate-900/50 p-1.5 rounded-full border border-purple-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.1)] flex-wrap justify-center gap-1">
            {activeTabs.map((tab) => {
              const isActive = (selectedTabId || activeTabs[0].id) === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTabId(tab.id)}
                  className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-purple-600 shadow-[0_0_20px_#a855f7]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.tabName}
                </button>
              );
            })}
          </div>
        </div>

        {/* --- CONTENT AREA FOR CURRENT TAB --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {/* Tab Subheader */}
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                {currentTab.tabName} Proficiency
              </h3>
              <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
                {currentTab.description}
              </p>
            </div>

            {/* Display Style: Circular Badges or Linear Progress Bars */}
            {currentTab.displayStyle === 'circular' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8 place-items-center max-w-6xl mx-auto">
                {currentTab.categories.flatMap((cat) => cat.skills).map((skill, idx) => (
                  <CircularSkill
                    key={skill.id || idx}
                    index={idx}
                    label={skill.name}
                    level={skill.level}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {currentTab.categories.map((category) => (
                  <TechnicalCard key={category.id} category={category} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SkillsSection;