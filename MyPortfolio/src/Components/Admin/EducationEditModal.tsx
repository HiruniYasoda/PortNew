import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Plus, Trash2, GraduationCap, Award, ListPlus } from 'lucide-react';

export interface EducationItem {
  id: string | number;
  title: string;
  subtitle: string;
  italic?: string;
  points: string[];
}

export interface QualificationItem {
  id?: string | number;
  title: string;
  subtitle: string;
  points: string[];
}

export interface EducationSectionData {
  timeline: EducationItem[];
  otherQualifications: QualificationItem[];
}

interface EducationEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: EducationSectionData;
  onSave: (updatedData: EducationSectionData) => void;
}

export const EducationEditModal: React.FC<EducationEditModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}) => {
  const [timeline, setTimeline] = useState<EducationItem[]>(initialData.timeline || []);
  const [otherQualifications, setOtherQualifications] = useState<QualificationItem[]>(
    initialData.otherQualifications || []
  );
  const [activeTab, setActiveTab] = useState<'timeline' | 'other'>('timeline');

  if (!isOpen) return null;

  // --- TIMELINE HELPERS ---
  const addTimelineItem = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      title: 'New Qualification / Degree',
      subtitle: 'Institution Name (Year - Year)',
      italic: 'Certification Body (Optional)',
      points: ['Distinction / Major Detail', 'Key Highlight'],
    };
    setTimeline([...timeline, newItem]);
  };

  const removeTimelineItem = (index: number) => {
    if (timeline.length <= 1) {
      alert('You must keep at least one timeline milestone.');
      return;
    }
    setTimeline(timeline.filter((_, i) => i !== index));
  };

  const updateTimelineField = (index: number, key: keyof EducationItem, val: any) => {
    setTimeline(
      timeline.map((item, i) => (i === index ? { ...item, [key]: val } : item))
    );
  };

  const addPointToTimeline = (itemIndex: number) => {
    setTimeline(
      timeline.map((item, i) =>
        i === itemIndex ? { ...item, points: [...item.points, 'New Point Detail'] } : item
      )
    );
  };

  const removePointFromTimeline = (itemIndex: number, pointIndex: number) => {
    setTimeline(
      timeline.map((item, i) =>
        i === itemIndex
          ? { ...item, points: item.points.filter((_, pIdx) => pIdx !== pointIndex) }
          : item
      )
    );
  };

  const updateTimelinePointText = (itemIndex: number, pointIndex: number, text: string) => {
    setTimeline(
      timeline.map((item, i) =>
        i === itemIndex
          ? {
              ...item,
              points: item.points.map((p, pIdx) => (pIdx === pointIndex ? text : p)),
            }
          : item
      )
    );
  };

  // --- OTHER QUALIFICATIONS HELPERS ---
  const addOtherItem = () => {
    const newItem: QualificationItem = {
      id: `qual-${Date.now()}`,
      title: 'Certification / Exam Title',
      subtitle: 'Awarding Body & Year',
      points: ['Result or Grade Detail'],
    };
    setOtherQualifications([...otherQualifications, newItem]);
  };

  const removeOtherItem = (index: number) => {
    setOtherQualifications(otherQualifications.filter((_, i) => i !== index));
  };

  const updateOtherField = (index: number, key: keyof QualificationItem, val: any) => {
    setOtherQualifications(
      otherQualifications.map((item, i) => (i === index ? { ...item, [key]: val } : item))
    );
  };

  const addPointToOther = (itemIndex: number) => {
    setOtherQualifications(
      otherQualifications.map((item, i) =>
        i === itemIndex ? { ...item, points: [...item.points, 'New Detail'] } : item
      )
    );
  };

  const removePointFromOther = (itemIndex: number, pointIndex: number) => {
    setOtherQualifications(
      otherQualifications.map((item, i) =>
        i === itemIndex
          ? { ...item, points: item.points.filter((_, pIdx) => pIdx !== pointIndex) }
          : item
      )
    );
  };

  const updateOtherPointText = (itemIndex: number, pointIndex: number, text: string) => {
    setOtherQualifications(
      otherQualifications.map((item, i) =>
        i === itemIndex
          ? {
              ...item,
              points: item.points.map((p, pIdx) => (pIdx === pointIndex ? text : p)),
            }
          : item
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      timeline,
      otherQualifications,
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
              <GraduationCap size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Edit Education & Qualifications</h3>
              <p className="text-xs text-purple-300/80 font-light">
                Add, edit, or remove timeline milestones and other academic qualifications.
              </p>
            </div>
          </div>

          {/* Sub-Tab Navigation inside Modal */}
          <div className="flex gap-2 mb-6 border-b border-purple-500/20 pb-3">
            <button
              type="button"
              onClick={() => setActiveTab('timeline')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'timeline'
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <GraduationCap size={15} />
              <span>Timeline Map ({timeline.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('other')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'other'
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Award size={15} />
              <span>Other Qualifications ({otherQualifications.length})</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
            {/* 1. TIMELINE MILESTONES TAB */}
            {activeTab === 'timeline' && (
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                    Timeline Milestones (Map snakes row by row as you add)
                  </span>
                  <button
                    type="button"
                    onClick={addTimelineItem}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                  >
                    <Plus size={15} /> Add Education Milestone
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {timeline.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-2xl flex flex-col gap-3 relative"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-purple-500/20 pb-2">
                        <span className="text-xs font-bold text-purple-400 bg-purple-900/50 px-2.5 py-1 rounded-md border border-purple-500/30">
                          Milestone #{idx + 1}
                        </span>
                        {timeline.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTimelineItem(idx)}
                            className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-all text-xs font-bold flex items-center gap-1"
                            title="Remove Milestone"
                          >
                            <Trash2 size={14} /> Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-purple-300 block mb-1">Title / Degree</label>
                          <input
                            type="text"
                            required
                            value={item.title}
                            onChange={(e) => updateTimelineField(idx, 'title', e.target.value)}
                            placeholder="e.g. B.Sc(Hons) Computing"
                            className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-purple-300 block mb-1">Subtitle / Years</label>
                          <input
                            type="text"
                            required
                            value={item.subtitle}
                            onChange={(e) => updateTimelineField(idx, 'subtitle', e.target.value)}
                            placeholder="e.g. 2024 - Present"
                            className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-purple-300 block mb-1">
                            Body / Tag (Optional)
                          </label>
                          <input
                            type="text"
                            value={item.italic || ''}
                            onChange={(e) => updateTimelineField(idx, 'italic', e.target.value)}
                            placeholder="e.g. Pearson Assured"
                            className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs italic"
                          />
                        </div>
                      </div>

                      {/* Bullet points for this milestone */}
                      <div className="mt-2 bg-black/40 p-3 rounded-xl border border-purple-500/20 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                            <ListPlus size={13} /> Key Points / Institution
                          </label>
                          <button
                            type="button"
                            onClick={() => addPointToTimeline(idx)}
                            className="px-2 py-0.5 bg-purple-600/80 hover:bg-purple-600 text-white text-[11px] font-bold rounded-md transition-all flex items-center gap-1"
                          >
                            <Plus size={12} /> Add Point
                          </button>
                        </div>

                        {item.points.map((pointText, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-2">
                            <input
                              type="text"
                              required
                              value={pointText}
                              onChange={(e) => updateTimelinePointText(idx, pIdx, e.target.value)}
                              className="flex-1 bg-white/5 border border-purple-500/30 rounded-lg py-1 px-2.5 text-white text-xs"
                            />
                            <button
                              type="button"
                              onClick={() => removePointFromTimeline(idx, pIdx)}
                              className="p-1 text-red-400 hover:text-red-300"
                              title="Delete point"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. OTHER QUALIFICATIONS TAB */}
            {activeTab === 'other' && (
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                    Other Qualifications & Diplomas
                  </span>
                  <button
                    type="button"
                    onClick={addOtherItem}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                  >
                    <Plus size={15} /> Add Qualification
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {otherQualifications.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-2xl flex flex-col gap-3"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-purple-500/20 pb-2">
                        <span className="text-xs font-bold text-purple-400 bg-purple-900/50 px-2.5 py-1 rounded-md border border-purple-500/30">
                          Qualification #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeOtherItem(idx)}
                          className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-all text-xs font-bold flex items-center gap-1"
                          title="Remove Qualification"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-purple-300 block mb-1">Title</label>
                          <input
                            type="text"
                            required
                            value={item.title}
                            onChange={(e) => updateOtherField(idx, 'title', e.target.value)}
                            placeholder="e.g. Visharada (Violin)"
                            className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-purple-300 block mb-1">Subtitle / Body</label>
                          <input
                            type="text"
                            required
                            value={item.subtitle}
                            onChange={(e) => updateOtherField(idx, 'subtitle', e.target.value)}
                            placeholder="e.g. Bhatkhande Sangit Vidyapith (2024)"
                            className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
                          />
                        </div>
                      </div>

                      {/* Points */}
                      <div className="mt-2 bg-black/40 p-3 rounded-xl border border-purple-500/20 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-semibold text-slate-300">Bullet Points</label>
                          <button
                            type="button"
                            onClick={() => addPointToOther(idx)}
                            className="px-2 py-0.5 bg-purple-600/80 hover:bg-purple-600 text-white text-[11px] font-bold rounded-md transition-all flex items-center gap-1"
                          >
                            <Plus size={12} /> Add Point
                          </button>
                        </div>

                        {item.points.map((pointText, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={pointText}
                              onChange={(e) => updateOtherPointText(idx, pIdx, e.target.value)}
                              className="flex-1 bg-white/5 border border-purple-500/30 rounded-lg py-1 px-2.5 text-white text-xs"
                            />
                            <button
                              type="button"
                              onClick={() => removePointFromOther(idx, pIdx)}
                              className="p-1 text-red-400 hover:text-red-300"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Footer Buttons */}
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
                <Save size={16} /> Save Education Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
