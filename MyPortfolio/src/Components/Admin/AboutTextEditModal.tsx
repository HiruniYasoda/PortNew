import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, FileText, Award, Plus, Trash2, Type } from 'lucide-react';

export interface StatItem {
  value: string;
  label: string;
}

export interface AboutTextData {
  heading: string;
  paragraphs: string[];
  fontSize?: string; // 'sm' | 'base' | 'lg' | 'xl'
  stats: StatItem[];
  // Legacy fields for backward compatibility
  paragraph1?: string;
  paragraph2?: string;
  paragraph3?: string;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
}

interface AboutTextEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: AboutTextData;
  onSave: (updatedData: AboutTextData) => void;
}

export const AboutTextEditModal: React.FC<AboutTextEditModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}) => {
  // Convert legacy format if needed
  const getInitialParagraphs = (): string[] => {
    if (initialData.paragraphs && initialData.paragraphs.length > 0) {
      return initialData.paragraphs;
    }
    const legacy: string[] = [];
    if (initialData.paragraph1) legacy.push(initialData.paragraph1);
    if (initialData.paragraph2) legacy.push(initialData.paragraph2);
    if (initialData.paragraph3) legacy.push(initialData.paragraph3);
    return legacy.length > 0 ? legacy : ['Enter your description paragraph here...'];
  };

  const getInitialStats = (): StatItem[] => {
    if (initialData.stats && initialData.stats.length > 0) {
      return initialData.stats;
    }
    const legacy: StatItem[] = [];
    if (initialData.stat1Value) legacy.push({ value: initialData.stat1Value, label: initialData.stat1Label || '' });
    if (initialData.stat2Value) legacy.push({ value: initialData.stat2Value, label: initialData.stat2Label || '' });
    if (initialData.stat3Value) legacy.push({ value: initialData.stat3Value, label: initialData.stat3Label || '' });
    return legacy.length > 0 ? legacy : [{ value: '9+', label: 'FULL-STACK PROJECTS' }];
  };

  const [heading, setHeading] = useState(initialData.heading || 'Crafting Digital Experiences That Matter');
  const [fontSize, setFontSize] = useState(initialData.fontSize || 'base');
  const [paragraphs, setParagraphs] = useState<string[]>(getInitialParagraphs());
  const [stats, setStats] = useState<StatItem[]>(getInitialStats());

  if (!isOpen) return null;

  // Paragraph Helpers
  const handleParagraphChange = (index: number, val: string) => {
    const updated = [...paragraphs];
    updated[index] = val;
    setParagraphs(updated);
  };

  const addParagraph = () => {
    setParagraphs([...paragraphs, '']);
  };

  const removeParagraph = (index: number) => {
    if (paragraphs.length <= 1) {
      alert('You must have at least one paragraph.');
      return;
    }
    setParagraphs(paragraphs.filter((_, i) => i !== index));
  };

  // Stat Helpers
  const handleStatChange = (index: number, key: 'value' | 'label', val: string) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [key]: val };
    setStats(updated);
  };

  const addStat = () => {
    setStats([...stats, { value: '10+', label: 'NEW METRIC' }]);
  };

  const removeStat = (index: number) => {
    if (stats.length <= 1) {
      alert('You must have at least one statistic.');
      return;
    }
    setStats(stats.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      heading,
      fontSize,
      paragraphs,
      stats,
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
              <FileText size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Edit About Text Content</h3>
              <p className="text-xs text-purple-300/80 font-light">Add/remove paragraphs, stats & adjust text font size.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Heading & Font Size Control */}
            <div className="bg-purple-950/20 p-5 rounded-2xl border border-purple-500/30 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1.5 block">
                  Main Heading Title
                </label>
                <input
                  type="text"
                  required
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                  placeholder="e.g. Crafting Digital Experiences That Matter"
                  className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1.5 block flex items-center gap-1">
                  <Type size={14} /> Font Size
                </label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-3 px-3 text-white text-sm focus:outline-none focus:border-purple-400 cursor-pointer"
                >
                  <option value="sm">Small Text</option>
                  <option value="base">Normal (Base)</option>
                  <option value="lg">Large Text</option>
                  <option value="xl">Extra Large</option>
                </select>
              </div>
            </div>

            {/* Dynamic Paragraphs Section */}
            <div className="bg-purple-950/20 p-5 rounded-2xl border border-purple-500/30 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-purple-300 flex items-center gap-2">
                  <FileText size={16} /> Description Paragraphs ({paragraphs.length})
                </label>
                <button
                  type="button"
                  onClick={addParagraph}
                  className="px-3 py-1.5 bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                >
                  <Plus size={14} /> Add Paragraph
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {paragraphs.map((para, idx) => (
                  <div key={idx} className="relative flex flex-col gap-1.5 bg-black/40 p-3 rounded-xl border border-purple-500/30">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-purple-300">Paragraph {idx + 1}</span>
                      {paragraphs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeParagraph(idx)}
                          className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition-all flex items-center gap-1 text-[11px]"
                          title="Remove Paragraph"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      )}
                    </div>
                    <textarea
                      rows={3}
                      required
                      value={para}
                      onChange={(e) => handleParagraphChange(idx, e.target.value)}
                      placeholder={`Enter text for paragraph ${idx + 1}...`}
                      className="w-full bg-white/5 border border-purple-500/20 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-purple-400 resize-y min-h-[70px]"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Key Performance Statistics Section */}
            <div className="bg-purple-950/20 p-5 rounded-2xl border border-purple-500/30 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                  <Award size={16} /> Key Performance Statistics ({stats.length})
                </label>
                <button
                  type="button"
                  onClick={addStat}
                  className="px-3 py-1.5 bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                >
                  <Plus size={14} /> Add Stat
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.map((st, idx) => (
                  <div key={idx} className="relative p-3.5 bg-black/40 border border-purple-500/30 rounded-xl flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-purple-300">STAT {idx + 1}</span>
                      {stats.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeStat(idx)}
                          className="p-1 text-red-400 hover:text-red-300 transition-all"
                          title="Remove Stat"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      required
                      value={st.value}
                      onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                      placeholder="Value (e.g. 9+)"
                      className="w-full bg-white/5 border border-purple-500/30 rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:border-purple-400"
                    />
                    <input
                      type="text"
                      required
                      value={st.label}
                      onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                      placeholder="Label (e.g. TECH STACKS)"
                      className="w-full bg-white/5 border border-purple-500/30 rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:border-purple-400"
                    />
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
                <Save size={16} /> Save Text Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
