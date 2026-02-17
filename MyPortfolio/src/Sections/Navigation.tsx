import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Highlights', href: '#highlights' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <>
      {/* CSS: MATCHING GLOW EFFECTS */}
      <style>{`
        /* 1. Logo Glow (White Text + Purple Shadow) */
        .neon-text {
          color: #fff;
          text-shadow: 
            0 0 5px #fff,
            0 0 10px #a855f7,
            0 0 20px #a855f7,
            0 0 40px #d8b4fe;
        }

        /* 2. Line Glow (White Line + Purple Shadow) 
           Exaclty matches the text shadow stack above */
        .neon-line {
          background-color: #fff;
          box-shadow: 
            0 0 5px #fff,
            0 0 10px #a855f7,
            0 0 20px #a855f7,
            0 0 40px #d8b4fe;
        }
      `}</style>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-md py-4 shadow-lg shadow-purple-900/20' : 'bg-black py-6'
        }`}
      >
        <div className="container mx-auto px-6 relative flex items-center justify-between">
          
          {/* LEFT: LOGO (Neon) */}
          <a href="#home" className="text-3xl font-bold tracking-tighter neon-text transition-transform hover:scale-105">
            Hello ,
          </a>

          {/* CENTER: DESKTOP MENU */}
          {/* Absolute centered to keep it perfectly in the middle */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative group text-gray-300 hover:text-white font-medium text-sm tracking-wide transition-colors duration-300"
              >
                {item.name}
                
                {/* NEON HOVER LINE */}
                {/* Same 12px gap (-bottom-3) */}
                <span className="absolute left-0 -bottom-3 h-[2px] w-0 neon-line transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* RIGHT: MOBILE TOGGLE */}
          <div className="md:hidden ml-auto">
            <button 
              className="text-white hover:text-purple-400 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-black border-t border-gray-900 mt-4"
          >
            <div className="flex flex-col px-6 py-4 space-y-4 text-center">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white hover:drop-shadow-[0_0_5px_rgba(168,85,247,0.8)] text-lg font-medium transition-all"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
};

export default Navigation;