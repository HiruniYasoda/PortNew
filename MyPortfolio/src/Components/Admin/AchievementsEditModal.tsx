import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Plus, Trash2, Trophy, Star, Image as ImageIcon } from 'lucide-react';
import { ImageDropzone } from './ImageDropzone';

export interface AchievementItem {
  id?: string | number;
  rank: string;
  title: string;
  description: string;
  organization: string;
  image: string;
  stars: number;
}

export interface AchievementsData {
  teamName?: string;
  teamLogo?: string;
  youtubeUrl?: string;
  achievements: AchievementItem[];
}

interface AchievementsEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: AchievementsData;
  onSave: (updatedData: AchievementsData) => void;
}

export const AchievementsEditModal: React.FC<AchievementsEditModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}) => {
  const [teamName, setTeamName] = useState(initialData.teamName || 'Idea Igniters');
  const [teamLogo, setTeamLogo] = useState(initialData.teamLogo || 'II.png');
  const [youtubeUrl, setYoutubeUrl] = useState(initialData.youtubeUrl || 'https://youtube.com');
  const [achievements, setAchievements] = useState<AchievementItem[]>(initialData.achievements || []);

  if (!isOpen) return null;

  const addAchievement = () => {
    const newItem: AchievementItem = {
      id: `ach-${Date.now()}`,
      rank: 'Winner / Finalist',
      title: 'Competition Title',
      description: 'Brief description of hackathon / award.',
      organization: 'Organizing Body / University',
      image: 'she.png',
      stars: 5,
    };
    setAchievements([...achievements, newItem]);
  };

  const removeAchievement = (index: number) => {
    if (achievements.length <= 1) {
      alert('You must keep at least one achievement card.');
      return;
    }
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  const updateAchievementField = (index: number, key: keyof AchievementItem, val: any) => {
    setAchievements(
      achievements.map((item, i) => (i === index ? { ...item, [key]: val } : item))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      teamName,
      teamLogo,
      youtubeUrl,
      achievements,
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
              <Trophy size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Edit Achievements</h3>
              <p className="text-xs text-purple-300/80 font-light">
                Add, edit, or remove achievement cards, team details, and star ratings.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
            {/* 1. TEAM DETAILS */}
            <div className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-2xl flex flex-col gap-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                Team & YouTube Link
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Team Name</label>
                  <input
                    type="text"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. Idea Igniters"
                    className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Team Logo File / URL</label>
                  <input
                    type="text"
                    value={teamLogo}
                    onChange={(e) => setTeamLogo(e.target.value)}
                    placeholder="e.g. II.png"
                    className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">YouTube URL</label>
                  <input
                    type="text"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://youtube.com/..."
                    className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
                  />
                </div>
              </div>
            </div>

            {/* 2. ACHIEVEMENTS LIST */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                  Achievement Cards ({achievements.length})
                </span>
                <button
                  type="button"
                  onClick={addAchievement}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                >
                  <Plus size={15} /> Add Achievement Card
                </button>
              </div>

              {achievements.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-2xl flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                    <span className="text-xs font-bold text-purple-400 bg-purple-900/50 px-2.5 py-1 rounded-md border border-purple-500/30">
                      Card #{idx + 1} - {item.rank}
                    </span>
                    {achievements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAchievement(idx)}
                        className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-all text-xs font-bold flex items-center gap-1"
                      >
                        <Trash2 size={14} /> Remove Card
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-purple-300 block mb-1">Rank / Placing</label>
                      <input
                        type="text"
                        required
                        value={item.rank}
                        onChange={(e) => updateAchievementField(idx, 'rank', e.target.value)}
                        placeholder="e.g. 1st Runners Up"
                        className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-purple-300 block mb-1">Competition Title</label>
                      <input
                        type="text"
                        required
                        value={item.title}
                        onChange={(e) => updateAchievementField(idx, 'title', e.target.value)}
                        placeholder="e.g. SHECODERess V6.0"
                        className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-purple-300 block mb-1">Star Rating (1 to 5)</label>
                      <select
                        value={item.stars}
                        onChange={(e) => updateAchievementField(idx, 'stars', parseInt(e.target.value) || 5)}
                        className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs font-bold cursor-pointer"
                      >
                        <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
                        <option value={4}>4 Stars ⭐⭐⭐⭐</option>
                        <option value={3}>3 Stars ⭐⭐⭐</option>
                        <option value={2}>2 Stars ⭐⭐</option>
                        <option value={1}>1 Star ⭐</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-purple-300 block mb-1">Short Description</label>
                      <input
                        type="text"
                        required
                        value={item.description}
                        onChange={(e) => updateAchievementField(idx, 'description', e.target.value)}
                        placeholder="e.g. The hack and design showdown."
                        className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-purple-300 block mb-1">Organizing Body</label>
                      <input
                        type="text"
                        required
                        value={item.organization}
                        onChange={(e) => updateAchievementField(idx, 'organization', e.target.value)}
                        placeholder="e.g. IEEE Student Branch..."
                        className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
                      />
                    </div>
                  </div>

                  {/* Image Dropzone for Achievement Logo */}
                  <div>
                    <label className="text-[11px] font-bold text-purple-300 block mb-1 flex items-center gap-1">
                      <ImageIcon size={13} /> Achievement Badge / Image Logo
                    </label>
                    <ImageDropzone
                      currentImage={item.image}
                      onImageSelected={(imageDataUrl) => updateAchievementField(idx, 'image', imageDataUrl)}
                    />
                  </div>
                </div>
              ))}
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
                <Save size={16} /> Save Achievements
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
