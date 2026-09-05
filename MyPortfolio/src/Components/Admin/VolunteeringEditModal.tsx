import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Plus, Trash2, HeartHandshake } from 'lucide-react';

export interface VolunteeringItem {
  id?: string | number;
  title: string;
  subHeading: string;
  italic?: string;
}

export interface VolunteeringSectionData {
  volunteering: VolunteeringItem[];
}

interface VolunteeringEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: VolunteeringSectionData;
  onSave: (updatedData: VolunteeringSectionData) => void;
}

export const VolunteeringEditModal: React.FC<VolunteeringEditModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}) => {
  const [volunteering, setVolunteering] = useState<VolunteeringItem[]>(
    initialData.volunteering || []
  );

  if (!isOpen) return null;

  const addVolunteering = () => {
    const newItem: VolunteeringItem = {
      id: `vol-${Date.now()}`,
      title: 'Volunteer Role Title',
      subHeading: 'Event / Organization Name',
      italic: 'Affiliation / Faculty details',
    };
    setVolunteering([...volunteering, newItem]);
  };

  const removeVolunteering = (index: number) => {
    if (volunteering.length <= 1) {
      alert('You must keep at least one volunteering card.');
      return;
    }
    setVolunteering(volunteering.filter((_, i) => i !== index));
  };

  const updateVolunteeringField = (index: number, key: keyof VolunteeringItem, val: any) => {
    setVolunteering(
      volunteering.map((item, i) => (i === index ? { ...item, [key]: val } : item))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      volunteering,
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
              <HeartHandshake size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Edit Volunteering Activities</h3>
              <p className="text-xs text-purple-300/80 font-light">
                Add, edit, or remove volunteer work, community contributions, and leadership roles.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                  Volunteering Cards ({volunteering.length})
                </span>
                <button
                  type="button"
                  onClick={addVolunteering}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                >
                  <Plus size={15} /> Add Volunteering Card
                </button>
              </div>

              {volunteering.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-2xl flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                    <span className="text-xs font-bold text-purple-400 bg-purple-900/50 px-2.5 py-1 rounded-md border border-purple-500/30">
                      Card #{idx + 1}
                    </span>
                    {volunteering.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVolunteering(idx)}
                        className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-all text-xs font-bold flex items-center gap-1"
                      >
                        <Trash2 size={14} /> Remove Card
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-purple-300 block mb-1">Role Title</label>
                      <input
                        type="text"
                        required
                        value={item.title}
                        onChange={(e) => updateVolunteeringField(idx, 'title', e.target.value)}
                        placeholder="e.g. Graphic Design Volunteer"
                        className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-purple-300 block mb-1">Sub Heading / Event</label>
                      <input
                        type="text"
                        required
                        value={item.subHeading}
                        onChange={(e) => updateVolunteeringField(idx, 'subHeading', e.target.value)}
                        placeholder="e.g. ComURS 2025"
                        className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-purple-300 block mb-1">Affiliation / Italic (Optional)</label>
                      <input
                        type="text"
                        value={item.italic || ''}
                        onChange={(e) => updateVolunteeringField(idx, 'italic', e.target.value)}
                        placeholder="e.g. Sabaragamuwa University..."
                        className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs italic"
                      />
                    </div>
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
                <Save size={16} /> Save Volunteering
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
