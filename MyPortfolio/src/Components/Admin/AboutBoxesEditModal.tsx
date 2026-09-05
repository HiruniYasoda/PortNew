import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Upload, Link2, FileCheck, CheckCircle2, Plus, Trash2, Globe } from 'lucide-react';

export interface PlatformCardItem {
  name: string;
  url: string;
}

export interface AboutBoxesData {
  cvTitle: string;
  cvSubtitle: string;
  cvUrl: string;
  githubSubtitle: string;
  githubUrl: string;
  linkedinSubtitle: string;
  linkedinUrl: string;
  platforms: PlatformCardItem[];
  // Legacy fields
  hackerrankUrl?: string;
  kaggleUrl?: string;
  mediumUrl?: string;
}

interface AboutBoxesEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: AboutBoxesData;
  onSave: (updatedData: AboutBoxesData) => void;
}

export const AboutBoxesEditModal: React.FC<AboutBoxesEditModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}) => {
  const getInitialPlatforms = (): PlatformCardItem[] => {
    if (initialData.platforms && initialData.platforms.length > 0) {
      return initialData.platforms;
    }
    const legacy: PlatformCardItem[] = [];
    if (initialData.hackerrankUrl) legacy.push({ name: 'HackerRank', url: initialData.hackerrankUrl });
    if (initialData.kaggleUrl) legacy.push({ name: 'Kaggle', url: initialData.kaggleUrl });
    if (initialData.mediumUrl) legacy.push({ name: 'Medium', url: initialData.mediumUrl });
    return legacy.length > 0
      ? legacy
      : [
          { name: 'HackerRank', url: 'https://www.hackerrank.com/profile/hirunisethmini' },
          { name: 'Kaggle', url: 'https://www.kaggle.com/hirunisethmini' },
          { name: 'Medium', url: 'https://medium.com/@hirunisethmini' },
        ];
  };

  const [cvTitle, setCvTitle] = useState(initialData.cvTitle || 'Download CV');
  const [cvSubtitle, setCvSubtitle] = useState(initialData.cvSubtitle || 'Get a copy of my resume to see my full professional journey and skills.');
  const [cvUrl, setCvUrl] = useState(initialData.cvUrl || '/cv.pdf');

  const [githubSubtitle, setGithubSubtitle] = useState(initialData.githubSubtitle || 'Explore my open source contributions & repos.');
  const [githubUrl, setGithubUrl] = useState(initialData.githubUrl || 'https://github.com/HiruniYasoda');

  const [linkedinSubtitle, setLinkedinSubtitle] = useState(initialData.linkedinSubtitle || `Let's connect and expand our network.`);
  const [linkedinUrl, setLinkedinUrl] = useState(initialData.linkedinUrl || 'https://www.linkedin.com/in/hiruni-sethmini');

  const [platforms, setPlatforms] = useState<PlatformCardItem[]>(getInitialPlatforms());
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleCvFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Url = reader.result as string;
      setCvUrl(base64Url);
    };
    reader.readAsDataURL(file);
  };

  // Platform Handlers
  const handlePlatformChange = (index: number, field: 'name' | 'url', val: string) => {
    const updated = [...platforms];
    updated[index] = { ...updated[index], [field]: val };
    setPlatforms(updated);
  };

  const addPlatform = () => {
    setPlatforms([...platforms, { name: 'LeetCode', url: 'https://' }]);
  };

  const removePlatform = (index: number) => {
    if (platforms.length <= 1) {
      alert('You must keep at least one platform link.');
      return;
    }
    setPlatforms(platforms.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      cvTitle,
      cvSubtitle,
      cvUrl,
      githubSubtitle,
      githubUrl,
      linkedinSubtitle,
      linkedinUrl,
      platforms,
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
          className="relative w-full max-w-2xl bg-[#0b0a10] border border-purple-500/50 rounded-3xl p-6 md:p-8 shadow-[0_0_60px_rgba(168,85,247,0.4)] my-8 max-h-[90vh] overflow-y-auto custom-scrollbar"
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
              <Link2 size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Edit Box Layout, Links & CV</h3>
              <p className="text-xs text-purple-300/80 font-light">Upload CV, edit mini descriptions & add platform cards (3 per row).</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* 1. CV Upload & Card Details */}
            <div className="bg-purple-950/20 p-5 rounded-2xl border border-purple-500/30 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-purple-300 flex items-center gap-2">
                  <FileCheck size={18} /> Download CV Card & File Upload
                </label>
                {cvUrl && (
                  <span className="text-[10px] bg-green-500/20 border border-green-500/40 text-green-400 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 size={12} /> Custom CV Active
                  </span>
                )}
              </div>

              {/* Upload CV Button */}
              <div className="flex flex-col gap-2">
                <span className="text-xs text-slate-400">Upload New Resume / CV File (PDF)</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2.5 bg-purple-600/80 hover:bg-purple-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 border border-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                  >
                    <Upload size={16} /> Choose CV File (PDF)
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf,application/msword"
                    onChange={handleCvFileUpload}
                    className="hidden"
                  />
                  <span className="text-xs text-purple-300 truncate max-w-xs font-mono">
                    {cvUrl.startsWith('data:') ? 'Uploaded PDF file ready!' : cvUrl}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">CV Button Title</label>
                  <input
                    type="text"
                    required
                    value={cvTitle}
                    onChange={(e) => setCvTitle(e.target.value)}
                    className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">CV Subtitle / Mini Description</label>
                  <input
                    type="text"
                    required
                    value={cvSubtitle}
                    onChange={(e) => setCvSubtitle(e.target.value)}
                    className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
                  />
                </div>
              </div>
            </div>

            {/* 2. GitHub Card */}
            <div className="bg-purple-950/20 p-5 rounded-2xl border border-purple-500/30 flex flex-col gap-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                GitHub Card
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Mini Description</label>
                  <input
                    type="text"
                    required
                    value={githubSubtitle}
                    onChange={(e) => setGithubSubtitle(e.target.value)}
                    className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">GitHub Profile URL</label>
                  <input
                    type="url"
                    required
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
                  />
                </div>
              </div>
            </div>

            {/* 3. LinkedIn Card */}
            <div className="bg-purple-950/20 p-5 rounded-2xl border border-purple-500/30 flex flex-col gap-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                LinkedIn Card
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Mini Description</label>
                  <input
                    type="text"
                    required
                    value={linkedinSubtitle}
                    onChange={(e) => setLinkedinSubtitle(e.target.value)}
                    className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    required
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
                  />
                </div>
              </div>
            </div>

            {/* 4. Dynamic Platform Cards (3 per row) */}
            <div className="bg-purple-950/20 p-5 rounded-2xl border border-purple-500/30 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                  <Globe size={16} /> Dynamic Platform Cards Bar ({platforms.length})
                </label>
                <button
                  type="button"
                  onClick={addPlatform}
                  className="px-3 py-1.5 bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                >
                  <Plus size={14} /> Add Platform
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {platforms.map((plat, idx) => (
                  <div key={idx} className="p-3 bg-black/40 border border-purple-500/30 rounded-xl flex items-center gap-3">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-purple-300 block mb-1">Platform Name</label>
                        <input
                          type="text"
                          required
                          value={plat.name}
                          onChange={(e) => handlePlatformChange(idx, 'name', e.target.value)}
                          placeholder="e.g. HackerRank / Kaggle / Medium"
                          className="w-full bg-white/5 border border-purple-500/30 rounded-lg py-1.5 px-3 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-purple-300 block mb-1">Platform Link URL</label>
                        <input
                          type="url"
                          required
                          value={plat.url}
                          onChange={(e) => handlePlatformChange(idx, 'url', e.target.value)}
                          placeholder="https://..."
                          className="w-full bg-white/5 border border-purple-500/30 rounded-lg py-1.5 px-3 text-white text-xs"
                        />
                      </div>
                    </div>
                    {platforms.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePlatform(idx)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all mt-4"
                        title="Remove Platform Card"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
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
                <Save size={16} /> Save Links & CV Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
