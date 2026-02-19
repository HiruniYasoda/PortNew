import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Instagram, Facebook, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading_quick' | 'loading_custom' | 'success' | 'error'>('idle');

  // --- EMAILJS CONFIGURATION ---
  const SERVICE_ID = 'service_ehti07g';
  const TEMPLATE_ID = 'template_ko247mj';
  const PUBLIC_KEY = 'g_-VssX9A2YuuYmc9';

  const handleQuickMail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please fill in your Name and Email first!");
      return;
    }

    setStatus('loading_quick');

    const templateParams = {
      user_name: name,
      user_email: email,
      subject: "Interested in your Portfolio! (Quick Connect)",
      message: "Hi Hiruni, I came across your portfolio and was really impressed by your projects and skills. I'd love to get in touch to discuss potential opportunities and collaborations. Let me know when you might be available for a quick chat!"
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => handleSuccess())
      .catch((err) => handleError(err));
  };

  const handleCustomMail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields before sending a custom message.");
      return;
    }

    setStatus('loading_custom');

    const templateParams = {
      user_name: name,
      user_email: email,
      subject: subject,
      message: message
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => handleSuccess())
      .catch((err) => handleError(err));
  };

  const handleSuccess = () => {
    setStatus('success');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setStatus('idle'), 5000);
  };

  const handleError = (err: any) => {
    console.error('EmailJS Error:', err);
    setStatus('error');
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact" className="relative min-h-screen w-full bg-[#050505] overflow-hidden py-24 flex flex-col items-center justify-center">
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col">
        
        {/* ================= STATIC CENTERED HEADING ================= */}
        <div className="w-full flex justify-center mb-16 md:mb-20">
          <h2 className="text-6xl md:text-7xl font-bold text-white tracking-tighter">
            Contact <span className="text-purple-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]">Me</span>
          </h2>
        </div>

        {/* ================= LAYOUT CONTAINER ================= */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-16 w-full overflow-hidden pb-10">
          
          {/* ================= LEFT SIDE: SLIDES FROM LEFT ================= */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-5/12 relative flex items-center justify-center min-h-[400px] md:min-h-[500px]"
          >
            
            {/* The Hollow Glowing Circle */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full border-[2px] border-purple-500/50 bg-transparent z-0 pointer-events-none"
              style={{ boxShadow: "inset 0 0 40px rgba(168,85,247,0.4), 0 0 40px rgba(168,85,247,0.4)" }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Social Links */}
            <div className="relative z-10 flex flex-col gap-8 w-full max-w-[280px]">
              
              {/* Phone */}
              <div className="flex items-start gap-4 group cursor-pointer w-full">
                <div className="text-purple-400 group-hover:text-purple-300 transition-colors drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] mt-1">
                  <Phone size={24} />
                </div>
                <div className="flex flex-col">
                  <a href="tel:+94785948622" className="text-white text-xl font-medium tracking-wide group-hover:text-purple-300 transition-colors">
                    +94 78 594 8622
                  </a>
                  <span className="text-slate-400 text-sm font-light mt-1 group-hover:text-slate-300 transition-colors">
                    Direct line for professional inquiries and quick chats.
                  </span>
                </div>
              </div>

              {/* Facebook */}
              <div className="flex items-start gap-4 group cursor-pointer w-full">
                <div className="text-purple-400 group-hover:text-purple-300 transition-colors drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] mt-1">
                  <Facebook size={24} />
                </div>
                <div className="flex flex-col">
                  <a href="#" target="_blank" className="text-white text-xl font-medium tracking-wide group-hover:text-purple-300 transition-colors">
                    Facebook Profile
                  </a>
                  <span className="text-slate-400 text-sm font-light mt-1 group-hover:text-slate-300 transition-colors">
                    Discover my passions, humor, and a glimpse into my daily life.
                  </span>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-4 group cursor-pointer w-full">
                <div className="text-purple-400 group-hover:text-purple-300 transition-colors drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] mt-1">
                  <Instagram size={24} />
                </div>
                <div className="flex flex-col">
                  <a href="#" target="_blank" className="text-white text-xl font-medium tracking-wide group-hover:text-purple-300 transition-colors">
                    @hiruni.yasoda
                  </a>
                  <span className="text-slate-400 text-sm font-light mt-1 group-hover:text-slate-300 transition-colors">
                    A visual journey of my travels, creative moments, and designs.
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* ================= RIGHT SIDE: SLIDES FROM RIGHT ================= */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-7/12 relative z-10 flex flex-col md:pl-10"
          >
            
            {/* Framed Form Area */}
            <div className="pt-10 pl-6 md:pl-12 border-t border-l border-purple-500/40 rounded-tl-[60px] relative">
              <form onSubmit={handleCustomMail} className="flex flex-col gap-10">
                
                {/* --- 1. CORE INFO (Name & Email) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative group">
                    <input 
                      type="text" 
                      id="user_name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder=" "
                      className="peer w-full bg-transparent border-b border-slate-500 text-white pb-3 pt-5 focus:outline-none focus:border-purple-400 transition-colors shadow-[0_15px_15px_-15px_transparent] focus:shadow-[0_15px_15px_-15px_rgba(168,85,247,0.6)]"
                    />
                    <label htmlFor="user_name" className="absolute left-0 top-0 text-slate-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-focus:top-0 peer-focus:text-sm peer-focus:text-purple-400 font-medium cursor-text">
                      Full Name
                    </label>
                  </div>

                  <div className="relative group">
                    <input 
                      type="email" 
                      id="user_email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder=" "
                      className="peer w-full bg-transparent border-b border-slate-500 text-white pb-3 pt-5 focus:outline-none focus:border-purple-400 transition-colors shadow-[0_15px_15px_-15px_transparent] focus:shadow-[0_15px_15px_-15px_rgba(168,85,247,0.6)]"
                    />
                    <label htmlFor="user_email" className="absolute left-0 top-0 text-slate-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-focus:top-0 peer-focus:text-sm peer-focus:text-purple-400 font-medium cursor-text">
                      E-mail Address
                    </label>
                  </div>
                </div>

                {/* --- 2. QUICK MAIL SECTION --- */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
                   <div className="text-left">
                     <h4 className="text-purple-300 font-medium flex items-center gap-2">
                       <Zap className="text-yellow-400 fill-yellow-400" size={16} /> Quick Connect
                     </h4>
                     <p className="text-slate-400 text-sm font-light">Send a templated greeting instantly.</p>
                   </div>
                   <button 
                     type="button" 
                     onClick={handleQuickMail}
                     disabled={status !== 'idle'}
                     className="w-full sm:w-auto whitespace-nowrap px-8 py-3 rounded-full bg-purple-600/20 border border-purple-500 text-purple-300 hover:bg-purple-600 hover:text-white font-medium transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] disabled:opacity-50"
                   >
                     {status === 'loading_quick' ? 'Sending...' : 'Quick Send'}
                   </button>
                </div>

                {/* DIVIDER */}
                <div className="flex items-center gap-4 py-2">
                  <div className="flex-1 h-[1px] bg-slate-800" />
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Mail By Yourself</span>
                  <div className="flex-1 h-[1px] bg-slate-800" />
                </div>

                {/* --- 3. CUSTOM MAIL (Subject & Content) --- */}
                <div className="relative group">
                    <input 
                      type="text" 
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder=" "
                      className="peer w-full bg-transparent border-b border-slate-500 text-white pb-3 pt-5 focus:outline-none focus:border-purple-400 transition-colors shadow-[0_15px_15px_-15px_transparent] focus:shadow-[0_15px_15px_-15px_rgba(168,85,247,0.6)]"
                    />
                    <label htmlFor="subject" className="absolute left-0 top-0 text-slate-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-focus:top-0 peer-focus:text-sm peer-focus:text-purple-400 font-medium cursor-text">
                      Subject
                    </label>
                </div>

                <div className="relative group">
                    <textarea 
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder=" "
                      className="peer w-full bg-transparent border-b border-slate-500 text-white pb-3 pt-5 focus:outline-none focus:border-purple-400 transition-colors resize-none shadow-[0_15px_15px_-15px_transparent] focus:shadow-[0_15px_15px_-15px_rgba(168,85,247,0.6)]"
                    />
                    <label htmlFor="message" className="absolute left-0 top-0 text-slate-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-focus:top-0 peer-focus:text-sm peer-focus:text-purple-400 font-medium cursor-text">
                      Content
                    </label>
                </div>

                {/* STATUS INDICATORS */}
                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-green-400 bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                    <CheckCircle2 size={18} /> <span className="text-sm">Message sent successfully!</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-red-400 bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                    <AlertCircle size={18} /> <span className="text-sm">Error sending message. Try again later.</span>
                  </motion.div>
                )}

                {/* Custom Submit Button */}
                <button 
                  type="submit" 
                  disabled={status !== 'idle'}
                  className="group relative flex items-center justify-center gap-3 w-full py-4 rounded-lg bg-white text-black font-bold text-lg hover:bg-purple-400 transition-all overflow-hidden disabled:opacity-50 mt-4 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]"
                >
                  {status === 'loading_custom' ? 'Sending...' : 'Send Custom Message'}
                  {!status.includes('loading') && <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>

              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* GLOBAL CSS TO FIX BROWSER AUTOFILL STYLING */}
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active,
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:hover,
        textarea:-webkit-autofill:focus,
        textarea:-webkit-autofill:active {
          transition: background-color 5000s ease-in-out 0s;
          -webkit-text-fill-color: white !important;
        }
      `}</style>

    </section>
  );
};

export default ContactSection;