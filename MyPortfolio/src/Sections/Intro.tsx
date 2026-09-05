import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pencil } from 'lucide-react';
import { useAdmin } from '../Context/AdminContext';
import { IntroEditModal, IntroData } from '../Components/Admin/IntroEditModal';

const DEFAULT_INTRO: IntroData = {
  tagline: 'Full-Stack Developer | AI & ML Enthusiast | Cloud & DevOps',
  greeting: 'Hi there, I am',
  name: 'Hiruni Yasoda',
  bio: 'I am a Passionate developer driven by the courage to explore the unknown. With a Creative mind and unrelenting dedication.',
  stat1Value: '1+',
  stat1Label: 'Year Exp.',
  stat2Value: '9+',
  stat2Label: 'Projects',
  stat3Value: '2+',
  stat3Label: 'Happy Clients',
  profileImage: '/Pro.jpg',
};

const IntroSection: React.FC = () => {
  const { isAdmin } = useAdmin();
  const [introData, setIntroData] = useState<IntroData>(DEFAULT_INTRO);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_intro_data');
    if (saved) {
      try {
        setIntroData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved intro data', e);
      }
    }
  }, []);

  const handleSave = (updated: IntroData) => {
    setIntroData(updated);
    localStorage.setItem('portfolio_intro_data', JSON.stringify(updated));
  };

  return (
    <section id="home" className="relative min-h-screen w-full bg-black overflow-hidden flex items-center pt-40">
      {/* Edit Modal */}
      <IntroEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={introData}
        onSave={handleSave}
      />

      {/* --- BACKGROUND: LARGE GEOMETRIC CIRCLES (Static & Elegant) --- */}
      <motion.div
        className="absolute -right-[5%] -bottom-[10%] w-[300px] h-[300px] rounded-full border-[2px] border-purple-500/30 bg-transparent z-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 30px rgba(168,85,247,0.3), 0 0 30px rgba(168,85,247,0.3)' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Circle 1: Top Left - Subtle Purple Gradient */}
      <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/20 blur-[100px] pointer-events-none" />

      {/* Circle 2: Bottom Right - Subtle Purple Gradient */}
      <div className="absolute top-[40%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-purple-800/10 blur-[120px] pointer-events-none" />

      {/* --- MAIN CONTENT --- */}
      <div className="container mx-auto px-6 max-w-7xl relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
        {/* --- LEFT SIDE: TEXT CONTAINER --- */}
        <motion.div
          className="relative bg-black/60 p-8 md:p-14 rounded-[40px] border border-purple-500/50 backdrop-blur-2xl shadow-[0_0_40px_rgba(168,85,247,0.3)] overflow-hidden group"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          {/* Internal Glow Effect */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/10 blur-3xl" />

          {/* Admin General Edit Button */}
          {isAdmin && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="absolute top-6 right-6 z-30 p-3 rounded-full bg-purple-600/90 text-white shadow-[0_0_20px_rgba(168,85,247,0.8)] hover:scale-110 hover:bg-purple-500 transition-all flex items-center gap-2 text-xs font-bold"
              title="Edit Hero Section Content"
            >
              <Pencil size={16} />
              <span>Edit Hero</span>
            </button>
          )}

          {/* Tagline */}
          <div className="relative inline-block mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/40 border border-purple-400/40 text-purple-300 text-sm font-medium shadow-[0_0_15px_rgba(168,85,247,0.15)] pr-8"
            >
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_10px_#a855f7]" />
              {introData.tagline}
            </motion.div>
            {isAdmin && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="absolute -right-2 top-1/2 -translate-y-1/2 p-1.5 bg-purple-600 text-white rounded-full hover:scale-110 transition-all shadow-[0_0_10px_rgba(168,85,247,0.7)]"
                title="Edit Tagline"
              >
                <Pencil size={12} />
              </button>
            )}
          </div>

          <div className="relative">
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              {introData.greeting} <br />
              <span className="text-white drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">
                {introData.name}
              </span>
            </h1>
            {isAdmin && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="absolute right-0 top-2 p-2 bg-purple-600 text-white rounded-full hover:scale-110 transition-all shadow-[0_0_10px_rgba(168,85,247,0.7)]"
                title="Edit Name & Greeting"
              >
                <Pencil size={14} />
              </button>
            )}
          </div>

          <div className="relative">
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light max-w-lg mb-10">
              {introData.bio}
            </p>
            {isAdmin && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="absolute -left-3 -bottom-2 p-1.5 bg-purple-600 text-white rounded-full hover:scale-110 transition-all shadow-[0_0_10px_rgba(168,85,247,0.7)]"
                title="Edit Bio Description"
              >
                <Pencil size={12} />
              </button>
            )}
          </div>

          {/* --- STATS SECTION --- */}
          <div className="relative flex items-center gap-8 border-t border-purple-500/20 pt-8">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                {introData.stat1Value}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-widest">{introData.stat1Label}</span>
            </div>
            <div className="w-[1px] h-10 bg-purple-500/20" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                {introData.stat2Value}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-widest">{introData.stat2Label}</span>
            </div>
            <div className="w-[1px] h-10 bg-purple-500/20" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                {introData.stat3Value}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-widest">{introData.stat3Label}</span>
            </div>

            {isAdmin && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="ml-auto p-2 bg-purple-600 text-white rounded-full hover:scale-110 transition-all shadow-[0_0_10px_rgba(168,85,247,0.7)]"
                title="Edit Statistics"
              >
                <Pencil size={14} />
              </button>
            )}
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
          <motion.a
            href="#contact"
            className="absolute top-0 right-0 md:right-4 md:-top-12 px-8 py-3 rounded-full bg-black/40 border border-purple-500/60 text-white font-medium backdrop-blur-md z-50 cursor-pointer"
            animate={{
              boxShadow: ['0 0 0px #a855f7', '0 0 15px #a855f7', '0 0 0px #a855f7'],
              borderColor: ['#a855f7', '#d8b4fe', '#a855f7'],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px #a855f7' }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>

          {/* Profile Image Container */}
          <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] flex items-center justify-center group">
            {/* ROTATING RING EFFECT */}
            <motion.div
              className="absolute inset-0 w-full h-full rounded-full overflow-hidden flex items-center justify-center scale-110"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
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
                src={introData.profileImage}
                alt={introData.name}
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />

              {/* Admin Pencil Overlay on Image */}
              {isAdmin && (
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2 z-20 cursor-pointer"
                  title="Change Profile Image (Drag & Drop)"
                >
                  <div className="p-3 bg-purple-600 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.9)]">
                    <Pencil size={20} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-200">Change Image</span>
                </button>
              )}
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