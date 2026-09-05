import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Sliders, Mail, Github, Linkedin, Facebook, Instagram, Heart, Copyright } from 'lucide-react';

export interface FooterSectionData {
  brandName?: string;
  brandHighlight?: string;
  introText?: string;
  email?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  copyrightText?: string;
  builtWithText?: string;
}

interface FooterEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: FooterSectionData;
  onSave: (updatedData: FooterSectionData) => void;
}

export const FooterEditModal: React.FC<FooterEditModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}) => {
  const [brandName, setBrandName] = useState(initialData.brandName || 'Hiruni');
  const [brandHighlight, setBrandHighlight] = useState(initialData.brandHighlight || 'Yasoda');
  const [introText, setIntroText] = useState(
    initialData.introText ||
      'Full-stack developer & UI/UX enthusiast. Crafting digital experiences with clean code and intuitive design.'
  );
  const [email, setEmail] = useState(initialData.email || 'hirunisethmini@gmail.com');
  const [githubUrl, setGithubUrl] = useState(initialData.githubUrl || 'https://github.com/HiruniYasoda');
  const [linkedinUrl, setLinkedinUrl] = useState(initialData.linkedinUrl || 'https://linkedin.com');
  const [facebookUrl, setFacebookUrl] = useState(initialData.facebookUrl || 'https://facebook.com');
  const [instagramUrl, setInstagramUrl] = useState(initialData.instagramUrl || 'https://instagram.com');
  const [copyrightText, setCopyrightText] = useState(
    initialData.copyrightText || 'All Rights Reserved by hirunisethmini@gmail.com'
  );
  const [builtWithText, setBuiltWithText] = useState(initialData.builtWithText || 'Built with ❤️ by Hiruni');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      brandName,
      brandHighlight,
      introText,
      email,
      githubUrl,
      linkedinUrl,
      facebookUrl,
      instagramUrl,
      copyrightText,
      builtWithText,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-3xl bg-[#0b0a10] border border-purple-500/50 rounded-3xl p-6 md:p-8 shadow-[0_0_60px_rgba(168,85,247,0.4)] my-8 max-h-[90vh] overflow-y-auto custom-scrollbar flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all z-10"
          >
            <X size={20} />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-6 border-b border-purple-500/25 pb-4">
            <div className="p-3 bg-purple-600/30 rounded-2xl text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-500/40">
              <Sliders size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Edit Footer Content & Links</h3>
              <p className="text-xs text-purple-300/80 font-light">
                Edit brand intro bio, email pill, social media URLs, and bottom copyright credit bar.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
            {/* 1. BRAND & INTRO */}
            <div className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-2xl flex flex-col gap-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                Brand Name & Intro Bio
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Brand First Part</label>
                  <input
                    type="text"
                    required
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="e.g. Hiruni"
                    className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Brand Highlight Part</label>
                  <input
                    type="text"
                    required
                    value={brandHighlight}
                    onChange={(e) => setBrandHighlight(e.target.value)}
                    placeholder="e.g. Yasoda"
                    className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Footer Intro Description</label>
                <textarea
                  rows={2}
                  required
                  value={introText}
                  onChange={(e) => setIntroText(e.target.value)}
                  placeholder="Full-stack developer & UI/UX enthusiast..."
                  className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs resize-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1 flex items-center gap-1">
                  <Mail size={13} /> Footer Email Pill
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hirunisethmini@gmail.com"
                  className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
                />
              </div>
            </div>

            {/* 2. SOCIAL MEDIA LINKS */}
            <div className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-2xl flex flex-col gap-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                Social Media Platform Links
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1 flex items-center gap-1">
                    <Github size={13} /> GitHub URL
                  </label>
                  <input
                    type="text"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1 flex items-center gap-1">
                    <Linkedin size={13} /> LinkedIn URL
                  </label>
                  <input
                    type="text"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1 flex items-center gap-1">
                    <Facebook size={13} /> Facebook URL
                  </label>
                  <input
                    type="text"
                    value={facebookUrl}
                    onChange={(e) => setFacebookUrl(e.target.value)}
                    placeholder="https://facebook.com/..."
                    className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1 flex items-center gap-1">
                    <Instagram size={13} /> Instagram URL
                  </label>
                  <input
                    type="text"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    placeholder="https://instagram.com/..."
                    className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
                  />
                </div>
              </div>
            </div>

            {/* 3. COPYRIGHT & BOTTOM CREDIT */}
            <div className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-2xl flex flex-col gap-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                Copyright Notice & Built-With Credit
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1 flex items-center gap-1">
                    <Copyright size={13} /> Copyright Text (After Year)
                  </label>
                  <input
                    type="text"
                    required
                    value={copyrightText}
                    onChange={(e) => setCopyrightText(e.target.value)}
                    placeholder="All Rights Reserved by hhirunisethmini@gmail.com"
                    className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1 flex items-center gap-1">
                    <Heart size={13} /> Built With Credit Text
                  </label>
                  <input
                    type="text"
                    required
                    value={builtWithText}
                    onChange={(e) => setBuiltWithText(e.target.value)}
                    placeholder="Built with ❤️ by Hiruni"
                    className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t border-purple-500/20 mt-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] transition-all flex items-center gap-2"
              >
                <Save size={16} /> Save Footer Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
