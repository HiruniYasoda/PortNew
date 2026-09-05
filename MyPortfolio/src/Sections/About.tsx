import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Download, Github, Linkedin, Code, Database, BookOpen, Pencil, Globe } from 'lucide-react';
import { useAdmin } from '../Context/AdminContext';
import { AboutTextEditModal, AboutTextData } from '../Components/Admin/AboutTextEditModal';
import { AboutBoxesEditModal, AboutBoxesData, PlatformCardItem } from '../Components/Admin/AboutBoxesEditModal';

const DEFAULT_ABOUT_TEXT: AboutTextData = {
  heading: 'Crafting Digital Experiences That Matter',
  fontSize: 'base',
  paragraphs: [
    `I'm a passionate Fullstack developer with experience building scalable, performant web applications. I specialize in creating intuitive user interfaces that combine beautiful design with exceptional functionality.`,
    `Building on my solid foundation in full-stack development, I am actively steering my career toward DevOps and Cloud engineering. I'm dedicated to mastering scalable infrastructure, automation, and modern CI/CD pipelines.`,
    `Beyond writing code, I am deeply interested in the bigger picture. I spend my time exploring agile methodologies and team leadership, driven by my ambition to become a technical Project Manager.`,
  ],
  stats: [
    { value: '9+', label: 'FULL-STACK PROJECTS' },
    { value: '5+', label: 'TECH STACKS' },
    { value: '100%', label: 'PROJECT DELIVERY' },
  ],
};

const DEFAULT_ABOUT_BOXES: AboutBoxesData = {
  cvTitle: 'Download CV',
  cvSubtitle: 'Get a copy of my resume to see my full professional journey and skills.',
  cvUrl: '/cv.pdf',
  githubSubtitle: 'Explore my open source contributions & repos.',
  githubUrl: 'https://github.com/HiruniYasoda?tab=overview&from=2026-02-01&to=2026-02-23',
  linkedinSubtitle: `Let's connect and expand our network.`,
  linkedinUrl: 'https://www.linkedin.com/in/hiruni-sethmini',
  platforms: [
    { name: 'HackerRank', url: 'https://www.hackerrank.com/profile/hirunisethmini' },
    { name: 'Kaggle', url: 'https://www.kaggle.com/hirunisethmini' },
    { name: 'Medium', url: 'https://medium.com/@hirunisethmini' },
  ],
};

const AboutSection: React.FC = () => {
  const { isAdmin } = useAdmin();
  const [aboutText, setAboutText] = useState<AboutTextData>(DEFAULT_ABOUT_TEXT);
  const [aboutBoxes, setAboutBoxes] = useState<AboutBoxesData>(DEFAULT_ABOUT_BOXES);

  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isBoxesModalOpen, setIsBoxesModalOpen] = useState(false);

  useEffect(() => {
    const savedText = localStorage.getItem('portfolio_about_text');
    const savedBoxes = localStorage.getItem('portfolio_about_boxes');

    if (savedText) {
      try {
        setAboutText(JSON.parse(savedText));
      } catch (e) {
        console.error('Error loading about text', e);
      }
    }

    if (savedBoxes) {
      try {
        setAboutBoxes(JSON.parse(savedBoxes));
      } catch (e) {
        console.error('Error loading about boxes', e);
      }
    }
  }, []);

  const handleSaveText = (updatedText: AboutTextData) => {
    setAboutText(updatedText);
    localStorage.setItem('portfolio_about_text', JSON.stringify(updatedText));
  };

  const handleSaveBoxes = (updatedBoxes: AboutBoxesData) => {
    setAboutBoxes(updatedBoxes);
    localStorage.setItem('portfolio_about_boxes', JSON.stringify(updatedBoxes));
  };

  // Font Size Resolver
  const getFontSizeClass = (size?: string) => {
    switch (size) {
      case 'sm':
        return 'text-sm';
      case 'lg':
        return 'text-lg md:text-xl';
      case 'xl':
        return 'text-xl md:text-2xl';
      case 'base':
      default:
        return 'text-base md:text-lg';
    }
  };

  // Helper for paragraphs list
  const activeParagraphs = aboutText.paragraphs && aboutText.paragraphs.length > 0
    ? aboutText.paragraphs
    : [aboutText.paragraph1, aboutText.paragraph2, aboutText.paragraph3].filter(Boolean) as string[];

  // Helper for stats list
  const activeStats = aboutText.stats && aboutText.stats.length > 0
    ? aboutText.stats
    : [
        { value: aboutText.stat1Value || '9+', label: aboutText.stat1Label || 'FULL-STACK PROJECTS' },
        { value: aboutText.stat2Value || '5+', label: aboutText.stat2Label || 'TECH STACKS' },
        { value: aboutText.stat3Value || '100%', label: aboutText.stat3Label || 'PROJECT DELIVERY' },
      ];

  // Helper for platform cards
  const activePlatforms: PlatformCardItem[] = aboutBoxes.platforms && aboutBoxes.platforms.length > 0
    ? aboutBoxes.platforms
    : [
        { name: 'HackerRank', url: aboutBoxes.hackerrankUrl || 'https://www.hackerrank.com/profile/hirunisethmini' },
        { name: 'Kaggle', url: aboutBoxes.kaggleUrl || 'https://www.kaggle.com/hirunisethmini' },
        { name: 'Medium', url: aboutBoxes.mediumUrl || 'https://medium.com/@hirunisethmini' },
      ];

  const getPlatformIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('code') || lower.includes('rank') || lower.includes('leet')) return <Code size={22} />;
    if (lower.includes('data') || lower.includes('kagg')) return <Database size={22} />;
    if (lower.includes('book') || lower.includes('med') || lower.includes('blog')) return <BookOpen size={22} />;
    return <Globe size={22} />;
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="about" className="relative min-h-screen w-full bg-black overflow-hidden flex items-center py-20">
      {/* 1. Text Content Edit Modal */}
      <AboutTextEditModal
        isOpen={isTextModalOpen}
        onClose={() => setIsTextModalOpen(false)}
        initialData={aboutText}
        onSave={handleSaveText}
      />

      {/* 2. Links & CV Edit Modal */}
      <AboutBoxesEditModal
        isOpen={isBoxesModalOpen}
        onClose={() => setIsBoxesModalOpen(false)}
        initialData={aboutBoxes}
        onSave={handleSaveBoxes}
      />

      {/* --- BACKGROUND: HOLLOW NEON CIRCLES --- */}
      <motion.div
        className="absolute -left-[10%] top-[20%] w-[600px] h-[600px] rounded-full border-[2px] border-purple-900/30 bg-transparent z-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 40px rgba(168,85,247,0.2), 0 0 40px rgba(168,85,247,0.2)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="absolute -right-[5%] -bottom-[10%] w-[300px] h-[300px] rounded-full border-[2px] border-purple-500/30 bg-transparent z-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 30px rgba(168,85,247,0.3), 0 0 30px rgba(168,85,247,0.3)' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Main Container */}
      <div className="container mx-auto px-6 max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-10">
        
        {/* --- LEFT SIDE: TEXT CONTENT & STATS --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative lg:pr-12 bg-black/40 p-6 md:p-8 rounded-3xl border border-purple-500/20 backdrop-blur-sm"
        >
          {/* Admin Edit Text Pencil Button (Clean top-right placement) */}
          {isAdmin && (
            <button
              onClick={() => setIsTextModalOpen(true)}
              className="absolute top-4 right-4 z-30 px-3.5 py-1.5 rounded-xl bg-purple-600 border border-purple-400/50 text-white shadow-[0_0_20px_rgba(168,85,247,0.7)] hover:scale-105 hover:bg-purple-500 transition-all flex items-center gap-1.5 text-xs font-bold"
              title="Edit About Text Content"
            >
              <Pencil size={13} />
              <span>Edit Text</span>
            </button>
          )}

          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight pr-24">
            {aboutText.heading.includes('Matter') ? (
              <>
                {aboutText.heading.replace('Matter', '').trim()} <span className="text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">Matter</span>
              </>
            ) : (
              aboutText.heading
            )}
          </motion.h2>

          <motion.div variants={itemVariants} className={`space-y-6 text-slate-300 font-light leading-relaxed mb-10 max-w-xl ${getFontSizeClass(aboutText.fontSize)}`}>
            {activeParagraphs.map((para, idx) => (
              <motion.p key={idx} whileHover={{ color: '#e2e8f0' }} transition={{ duration: 0.3 }}>
                {para}
              </motion.p>
            ))}
          </motion.div>

          {/* STATS WITH NEON BEAMS */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-8 md:gap-12 border-t border-purple-500/20 pt-8">
            {activeStats.map((st, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <div className="w-[2px] h-12 bg-purple-500 shadow-[0_0_15px_#a855f7]" />}
                <div className="group">
                  <h3 className="text-3xl font-bold text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.6)] group-hover:text-purple-300 transition-colors">
                    {st.value}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1 uppercase tracking-wider group-hover:text-slate-200 transition-colors">
                    {st.label.includes(' ') ? (
                      <>
                        {st.label.split(' ')[0]} <br /> {st.label.split(' ').slice(1).join(' ')}
                      </>
                    ) : (
                      st.label
                    )}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>

        {/* --- RIGHT SIDE: BENTO GRID GLASS CONTAINERS --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative grid grid-cols-1 md:grid-cols-2 gap-4 lg:max-w-[500px] w-full lg:ml-auto bg-black/40 p-4 md:p-6 rounded-3xl border border-purple-500/20 backdrop-blur-sm"
        >
          {/* Admin Edit Links & CV Pencil Button (Clean top-right placement) */}
          {isAdmin && (
            <button
              onClick={() => setIsBoxesModalOpen(true)}
              className="absolute -top-4 right-4 z-30 px-3.5 py-1.5 rounded-xl bg-purple-600 border border-purple-400/50 text-white shadow-[0_0_20px_rgba(168,85,247,0.7)] hover:scale-105 hover:bg-purple-500 transition-all flex items-center gap-1.5 text-xs font-bold"
              title="Edit Links & Upload CV"
            >
              <Pencil size={13} />
              <span>Edit Links & CV</span>
            </button>
          )}

          {/* 1. DOWNLOAD CV */}
          <motion.a
            variants={itemVariants}
            href={aboutBoxes.cvUrl}
            download="Hiruni_Yasoda_CV.pdf"
            className="md:col-span-2 bg-white/5 border border-purple-500/20 p-6 rounded-2xl backdrop-blur-md transition-all group cursor-pointer relative overflow-hidden"
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(168, 85, 247, 0.1)', borderColor: 'rgba(168, 85, 247, 0.5)' }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start justify-between relative z-10">
              <div>
                <h4 className="text-xl font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
                  {aboutBoxes.cvTitle}
                </h4>
                <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">
                  {aboutBoxes.cvSubtitle}
                </p>
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
            href={aboutBoxes.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-white/5 border border-purple-500/20 p-6 rounded-2xl backdrop-blur-md transition-all group cursor-pointer"
            whileHover={{ scale: 1.03, backgroundColor: 'rgba(168, 85, 247, 0.1)', borderColor: 'rgba(168, 85, 247, 0.5)' }}
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
                <p className="text-slate-400 text-xs group-hover:text-slate-300 transition-colors">
                  {aboutBoxes.githubSubtitle}
                </p>
              </div>
            </div>
          </motion.a>

          {/* 3. LINKEDIN */}
          <motion.a
            variants={itemVariants}
            href={aboutBoxes.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-white/5 border border-purple-500/20 p-6 rounded-2xl backdrop-blur-md transition-all group cursor-pointer"
            whileHover={{ scale: 1.03, backgroundColor: 'rgba(168, 85, 247, 0.1)', borderColor: 'rgba(168, 85, 247, 0.5)' }}
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
                <p className="text-slate-400 text-xs group-hover:text-slate-300 transition-colors">
                  {aboutBoxes.linkedinSubtitle}
                </p>
              </div>
            </div>
          </motion.a>

          {/* 4. DYNAMIC PLATFORM CARDS BAR (3 per row) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 bg-white/5 border border-purple-500/20 rounded-2xl backdrop-blur-md grid grid-cols-3 divide-x divide-purple-500/20 overflow-hidden"
          >
            {activePlatforms.map((plat, idx) => (
              <motion.a
                key={idx}
                href={plat.url}
                target="_blank"
                rel="noreferrer"
                className="p-4 flex flex-col items-center justify-center hover:bg-purple-900/20 transition-colors group relative"
                whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.15)' }}
              >
                <motion.div whileHover={{ y: -3 }} className="text-slate-400 group-hover:text-purple-400 mb-2 transition-colors">
                  {getPlatformIcon(plat.name)}
                </motion.div>
                <span className="text-xs text-slate-300 group-hover:text-white transition-colors text-center font-medium truncate max-w-full">
                  {plat.name}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;