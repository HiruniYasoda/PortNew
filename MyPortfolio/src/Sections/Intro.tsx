import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pencil } from 'lucide-react';
import { useAdmin } from '../Context/AdminContext';
import { IntroTextEditModal, IntroTextData } from '../Components/Admin/IntroTextEditModal';
import { IntroImageModal } from '../Components/Admin/IntroImageModal';

const DEFAULT_INTRO_TEXT: IntroTextData = {
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
};

const DEFAULT_IMAGE = '/Pro.jpg';

const IntroSection: React.FC = () => {
  const { isAdmin } = useAdmin();
  const [introText, setIntroText] = useState<IntroTextData>(DEFAULT_INTRO_TEXT);
  const [profileImage, setProfileImage] = useState<string>(DEFAULT_IMAGE);

  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    const savedText = localStorage.getItem('portfolio_intro_text');
    const savedImage = localStorage.getItem('portfolio_intro_image');

    if (savedText) {
      try {
        setIntroText(JSON.parse(savedText));
      } catch (e) {
        console.error('Error loading intro text', e);
      }
    }

    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleSaveText = (updatedText: IntroTextData) => {
    setIntroText(updatedText);
    localStorage.setItem('portfolio_intro_text', JSON.stringify(updatedText));
  };

  const handleSaveImage = (newImage: string) => {
    setProfileImage(newImage);
    localStorage.setItem('portfolio_intro_image', newImage);
  };

  return (
    <section id="home" className="relative min-h-screen w-full bg-black overflow-hidden flex items-center pt-32 md:pt-40">
      {/* 1. Text Content Edit Modal */}
      <IntroTextEditModal
        isOpen={isTextModalOpen}
        onClose={() => setIsTextModalOpen(false)}
        initialData={introText}
        onSave={handleSaveText}
      />

      {/* 2. Image Upload Modal */}
      <IntroImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        currentImage={profileImage}
        onSave={handleSaveImage}
      />

      {/* --- BACKGROUND: GEOMETRIC CIRCLES --- */}
      <motion.div
        className="absolute -right-[5%] -bottom-[10%] w-[300px] h-[300px] rounded-full border-[2px] border-purple-500/30 bg-transparent z-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 30px rgba(168,85,247,0.3), 0 0 30px rgba(168,85,247,0.3)' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/20 blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-purple-800/10 blur-[120px] pointer-events-none" />

      {/* --- MAIN CONTENT --- */}
      <div className="container mx-auto px-6 max-w-7xl relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
        {/* --- LEFT SIDE: HERO TEXT CONTAINER --- */}
        <motion.div
          className="relative bg-black/60 p-6 md:p-14 rounded-[30px] md:rounded-[40px] border border-purple-500/50 backdrop-blur-2xl shadow-[0_0_40px_rgba(168,85,247,0.3)] overflow-hidden"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          {/* Internal Glow Effect */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/10 blur-3xl" />

          {/* Top Tagline & Admin Edit Button Header Bar (Clean flex alignment with zero overlap on mobile!) */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/40 border border-purple-400/40 text-purple-300 text-xs md:text-sm font-medium shadow-[0_0_15px_rgba(168,85,247,0.15)] max-w-full"
            >
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shrink-0 shadow-[0_0_10px_#a855f7]" />
              <span className="leading-snug">{introText.tagline}</span>
            </motion.div>

            {isAdmin && (
              <button
                onClick={() => setIsTextModalOpen(true)}
                className="self-start sm:self-auto shrink-0 px-4 py-2 rounded-xl bg-purple-600 border border-purple-400/50 text-white shadow-[0_0_20px_rgba(168,85,247,0.7)] hover:scale-105 hover:bg-purple-500 transition-all flex items-center gap-2 text-xs font-bold z-30"
                title="Edit Hero Text Content"
              >
                <Pencil size={14} />
                <span>Edit Content</span>
              </button>
            )}
          </div>

          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            {introText.greeting} <br />
            <span className="text-white drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">
              {introText.name}
            </span>
          </h1>

          <p className="text-base md:text-xl text-slate-300 leading-relaxed font-light max-w-lg mb-10">
            {introText.bio}
          </p>

          {/* --- STATS SECTION --- */}
          <div className="flex items-center gap-6 md:gap-8 border-t border-purple-500/20 pt-8 flex-wrap">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                {introText.stat1Value}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-widest">{introText.stat1Label}</span>
            </div>
            <div className="w-[1px] h-10 bg-purple-500/20" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                {introText.stat2Value}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-widest">{introText.stat2Label}</span>
            </div>
            <div className="w-[1px] h-10 bg-purple-500/20" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                {introText.stat3Value}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-widest">{introText.stat3Label}</span>
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT SIDE: PROFILE IMAGE CONTAINER --- */}
        <motion.div
          className="relative flex flex-col items-center justify-center py-10 md:py-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* "GET IN TOUCH" BUTTON */}
          <motion.a
            href="#contact"
            className="mb-6 md:mb-0 md:absolute top-0 right-0 md:right-4 md:-top-12 px-8 py-3 rounded-full bg-black/40 border border-purple-500/60 text-white font-medium backdrop-blur-md z-50 cursor-pointer"
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

          {/* Profile Image Circle */}
          <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center group">
            {/* ROTATING RING */}
            <motion.div
              className="absolute inset-0 w-full h-full rounded-full overflow-hidden flex items-center justify-center scale-110 pointer-events-none"
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
                src={profileImage}
                alt={introText.name}
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />

              {/* Admin Profile Picture Pencil Overlay */}
              {isAdmin && (
                <button
                  onClick={() => setIsImageModalOpen(true)}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2 z-20 cursor-pointer rounded-full"
                  title="Change Profile Photo"
                >
                  <div className="p-3 bg-purple-600 border border-purple-400/50 rounded-full shadow-[0_0_25px_rgba(168,85,247,0.9)] hover:scale-110 transition-all">
                    <Pencil size={22} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-200 bg-purple-950/80 px-3 py-1 rounded-full border border-purple-500/40 shadow-lg">
                    Change Photo
                  </span>
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