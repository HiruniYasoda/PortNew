import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Facebook, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear(); // Will show 2026

  // Smooth scroll handler for Quick Links
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full bg-[#020202] border-t border-purple-500/20 pt-16 pb-8 overflow-hidden">
      
      {/* Background Subtle Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-purple-600/10 rounded-[100%] blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* 1. Brand & Tagline */}
          <div className="flex flex-col items-start">
            <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
              Hiruni <span className="text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">Yasoda</span>
            </h3>
            <p className="text-slate-400 font-light leading-relaxed max-w-sm mb-6">
              Full-stack developer & UI/UX enthusiast. Crafting digital experiences with clean code and intuitive design.
            </p>
            <a 
              href="mailto:hirunisethmini@gmail.com" 
              className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors group"
            >
              <div className="p-2 rounded-full bg-purple-500/10 group-hover:bg-purple-500 group-hover:shadow-[0_0_15px_#a855f7] transition-all">
                <Mail size={16} />
              </div>
              hirunisethmini@gmail.com
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
                <a href="https://github.com/HiruniYasoda" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-purple-500 hover:border-purple-500 hover:text-white hover:shadow-[0_0_15px_#a855f7] transition-all group">
                  <Github size={18} className="group-hover:scale-110 transition-transform" />
                </a>
                
                {/* LinkedIn */}
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-purple-500 hover:border-purple-500 hover:text-white hover:shadow-[0_0_15px_#a855f7] transition-all group">
                  <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
                </a>

                {/* Facebook */}
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-purple-500 hover:border-purple-500 hover:text-white hover:shadow-[0_0_15px_#a855f7] transition-all group">
                  <Facebook size={18} className="group-hover:scale-110 transition-transform" />
                </a>

                {/* Instagram */}
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-purple-500 hover:border-purple-500 hover:text-white hover:shadow-[0_0_15px_#a855f7] transition-all group">
                  <Instagram size={18} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm font-light text-center md:text-left">
            &copy; {currentYear} All Rights Reserved by <span className="text-purple-400 font-medium">hirunisethmini@gmail.com</span>
          </p>
          
          <p className="text-slate-500 text-sm font-light flex items-center gap-1">
            Built with <Heart size={14} className="text-purple-500 fill-purple-500 animate-pulse" /> by Hiruni
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;