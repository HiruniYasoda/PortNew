import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Facebook, Mail, Heart, Lock, ShieldCheck, Pencil } from 'lucide-react';
import { useAdmin } from '../Context/AdminContext';
import { FooterEditModal, FooterSectionData } from '../Components/Admin/FooterEditModal';

const DEFAULT_FOOTER_DATA: FooterSectionData = {
  brandName: 'Hiruni',
  brandHighlight: 'Yasoda',
  introText:
    'Full-stack developer & UI/UX enthusiast. Crafting digital experiences with clean code and intuitive design.',
  email: 'hirunisethmini@gmail.com',
  githubUrl: 'https://github.com/HiruniYasoda',
  linkedinUrl: 'https://linkedin.com',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  copyrightText: 'All Rights Reserved by hhirunisethmini@gmail.com',
  builtWithText: 'Built with ❤️ by Hiruni',
};

const Footer: React.FC = () => {
  const { openLoginModal, isAdmin } = useAdmin();
  const currentYear = new Date().getFullYear();

  const [footerData, setFooterData] = useState<FooterSectionData>(DEFAULT_FOOTER_DATA);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_footer_data');
    if (saved) {
      try {
        setFooterData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse footer data', e);
      }
    }
  }, []);

  const handleSave = (updated: FooterSectionData) => {
    setFooterData(updated);
    localStorage.setItem('portfolio_footer_data', JSON.stringify(updated));
  };

  // Smooth scroll handler for Quick Links
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const brandName = footerData.brandName || 'Hiruni';
  const brandHighlight = footerData.brandHighlight || 'Yasoda';
  const introText =
    footerData.introText ||
    'Full-stack developer & UI/UX enthusiast. Crafting digital experiences with clean code and intuitive design.';
  const email = footerData.email || 'hirunisethmini@gmail.com';
  const githubUrl = footerData.githubUrl || 'https://github.com/HiruniYasoda';
  const linkedinUrl = footerData.linkedinUrl || '#';
  const facebookUrl = footerData.facebookUrl || '#';
  const instagramUrl = footerData.instagramUrl || '#';
  const copyrightText = footerData.copyrightText || `All Rights Reserved by ${email}`;
  const builtWithText = footerData.builtWithText || 'Built with ❤️ by Hiruni';

  return (
    <footer className="relative w-full bg-[#020202] border-t border-purple-500/20 pt-16 pb-8 overflow-hidden">
      {/* Edit Modal */}
      <FooterEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={footerData}
        onSave={handleSave}
      />

      {/* Background Subtle Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-purple-600/10 rounded-[100%] blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Floating Pencil Button for Admin */}
        {isAdmin && (
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-purple-600 border border-purple-400/50 text-white shadow-[0_0_20px_rgba(168,85,247,0.7)] hover:scale-105 hover:bg-purple-500 transition-all flex items-center gap-1.5 text-xs font-bold"
              title="Edit Footer Content"
            >
              <Pencil size={14} />
              <span>Edit Footer</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* 1. Brand & Tagline */}
          <div className="flex flex-col items-start">
            <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
              {brandName} <span className="text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">{brandHighlight}</span>
            </h3>
            <p className="text-slate-400 font-light leading-relaxed max-w-sm mb-6">
              {introText}
            </p>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors group"
            >
              <div className="p-2 rounded-full bg-purple-500/10 group-hover:bg-purple-500 group-hover:shadow-[0_0_15px_#a855f7] transition-all">
                <Mail size={16} />
              </div>
              {email}
            </a>
          </div>

          {/* 2. Quick Links */}
          <div className="flex flex-col items-start md:items-center">
            <div>
              <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'About', 'Skills', 'Highlights', 'Projects', 'Contact'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-slate-400 hover:text-purple-400 transition-colors text-sm font-light flex items-center gap-2 group relative overflow-hidden"
                    >
                      <span className="w-0 h-[1px] bg-purple-400 group-hover:w-3 transition-all duration-300" />
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. Social Media */}
          <div className="flex flex-col items-start md:items-end">
            <div>
              <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Connect</h4>
              <div className="flex gap-4">
                {/* GitHub */}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-purple-500 hover:border-purple-500 hover:text-white hover:shadow-[0_0_15px_#a855f7] transition-all group"
                  >
                    <Github size={18} className="group-hover:scale-110 transition-transform" />
                  </a>
                )}

                {/* LinkedIn */}
                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-purple-500 hover:border-purple-500 hover:text-white hover:shadow-[0_0_15px_#a855f7] transition-all group"
                  >
                    <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
                  </a>
                )}

                {/* Facebook */}
                {facebookUrl && (
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-purple-500 hover:border-purple-500 hover:text-white hover:shadow-[0_0_15px_#a855f7] transition-all group"
                  >
                    <Facebook size={18} className="group-hover:scale-110 transition-transform" />
                  </a>
                )}

                {/* Instagram */}
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-purple-500 hover:border-purple-500 hover:text-white hover:shadow-[0_0_15px_#a855f7] transition-all group"
                  >
                    <Instagram size={18} className="group-hover:scale-110 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm font-light text-center md:text-left">
            &copy; {currentYear} {copyrightText}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={openLoginModal}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                isAdmin
                  ? 'bg-green-500/20 border-green-500/50 text-green-300 shadow-[0_0_10px_rgba(34,197,94,0.3)]'
                  : 'bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500 hover:text-white shadow-[0_0_10px_rgba(168,85,247,0.2)]'
              }`}
            >
              {isAdmin ? <ShieldCheck size={14} /> : <Lock size={14} />}
              <span>{isAdmin ? 'Admin Active ✏️' : 'Admin Login'}</span>
            </button>

            <p className="text-slate-500 text-sm font-light flex items-center gap-1">
              {builtWithText.includes('❤️') ? (
                <>
                  {builtWithText.split('❤️')[0]}
                  <Heart size={14} className="text-purple-500 fill-purple-500 animate-pulse inline" />
                  {builtWithText.split('❤️')[1]}
                </>
              ) : (
                builtWithText
              )}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;