import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Sparkles, FileText, Award } from 'lucide-react';

export interface IntroTextData {
  tagline: string;
  greeting: string;
  name: string;
  bio: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
}

interface IntroTextEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: IntroTextData;
  onSave: (updatedData: IntroTextData) => void;
}

export const IntroTextEditModal: React.FC<IntroTextEditModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}) => {
  const [formData, setFormData] = useState<IntroTextData>(initialData);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0b0a10] border border-purple-500/50 rounded-3xl p-6 md:p-8 shadow-[0_0_60px_rgba(168,85,247,0.4)] my-8 max-h-[90vh] overflow-y-auto custom-scrollbar"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all z-10"
          >
            <X size={20} />
          </button>

          {/* Modal Header with Purple Accent */}
          <div className="flex items-center gap-3 mb-6 border-b border-purple-500/25 pb-4">
            <div className="p-3 bg-purple-600/30 rounded-2xl text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-500/40">
              <Sparkles size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Edit Hero Text Content</h3>
              <p className="text-xs text-purple-300/80 font-light">Update your tagline, greeting, name, bio description & statistics.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Tagline */}
            <div className="bg-purple-950/20 p-4 rounded-2xl border border-purple-500/30">
              <label className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1.5 block">
                Top Roles Tagline
              </label>
              <input
                type="text"
                required
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="e.g. Full-Stack Developer | AI & ML Enthusiast | Cloud & DevOps"
                className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
              />
            </div>

            {/* Greeting Title & Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-950/20 p-4 rounded-2xl border border-purple-500/30">
                <label className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1.5 block">
                  Greeting Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.greeting}
                  onChange={(e) => setFormData({ ...formData, greeting: e.target.value })}
                  placeholder="e.g. Hi there, I am"
                  className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                />
              </div>
              <div className="bg-purple-950/20 p-4 rounded-2xl border border-purple-500/30">
                <label className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1.5 block">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Hiruni Yasoda"
                  className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                />
              </div>
            </div>

            {/* Bio Description */}
            <div className="bg-purple-950/20 p-4 rounded-2xl border border-purple-500/30">
              <label className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1.5 block flex items-center gap-1.5">
                <FileText size={16} /> Bio Paragraph Text
              </label>
              <textarea
                rows={3}
                required
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Enter intro bio..."
                className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 resize-none"
              />
            </div>

            {/* Stats (3 columns) */}
            <div className="bg-purple-950/20 p-4 rounded-2xl border border-purple-500/30">
              <label className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-3 block flex items-center gap-1.5">
                <Award size={16} /> Experience Statistics
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Stat 1 */}
                <div className="p-3 bg-black/40 border border-purple-500/30 rounded-xl flex flex-col gap-2">
                  <span className="text-[11px] font-bold text-purple-300">STAT 1</span>
                  <input
                    type="text"
                    required
                    value={formData.stat1Value}
                    onChange={(e) => setFormData({ ...formData, stat1Value: e.target.value })}
                    placeholder="Value (e.g. 1+)"
                    className="w-full bg-white/5 border border-purple-500/30 rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:border-purple-400"
                  />
                  <input
                    type="text"
                    required
                    value={formData.stat1Label}
                    onChange={(e) => setFormData({ ...formData, stat1Label: e.target.value })}
                    placeholder="Label (e.g. YEAR EXP.)"
                    className="w-full bg-white/5 border border-purple-500/30 rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:border-purple-400"
                  />
                </div>

                {/* Stat 2 */}
                <div className="p-3 bg-black/40 border border-purple-500/30 rounded-xl flex flex-col gap-2">
                  <span className="text-[11px] font-bold text-purple-300">STAT 2</span>
                  <input
                    type="text"
                    required
                    value={formData.stat2Value}
                    onChange={(e) => setFormData({ ...formData, stat2Value: e.target.value })}
                    placeholder="Value (e.g. 9+)"
                    className="w-full bg-white/5 border border-purple-500/30 rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:border-purple-400"
                  />
                  <input
                    type="text"
                    required
                    value={formData.stat2Label}
                    onChange={(e) => setFormData({ ...formData, stat2Label: e.target.value })}
                    placeholder="Label (e.g. PROJECTS)"
                    className="w-full bg-white/5 border border-purple-500/30 rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:border-purple-400"
                  />
                </div>

                {/* Stat 3 */}
                <div className="p-3 bg-black/40 border border-purple-500/30 rounded-xl flex flex-col gap-2">
                  <span className="text-[11px] font-bold text-purple-300">STAT 3</span>
                  <input
                    type="text"
                    required
                    value={formData.stat3Value}
                    onChange={(e) => setFormData({ ...formData, stat3Value: e.target.value })}
                    placeholder="Value (e.g. 2+)"
                    className="w-full bg-white/5 border border-purple-500/30 rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:border-purple-400"
                  />
                  <input
                    type="text"
                    required
                    value={formData.stat3Label}
                    onChange={(e) => setFormData({ ...formData, stat3Label: e.target.value })}
                    placeholder="Label (e.g. HAPPY CLIENTS)"
                    className="w-full bg-white/5 border border-purple-500/30 rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-2">
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
                <Save size={16} /> Save Text Content
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
