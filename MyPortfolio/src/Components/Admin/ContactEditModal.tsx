import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Save,
  Plus,
  Trash2,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  Github,
  Twitter,
  Mail,
  Globe,
  MessageSquare,
} from 'lucide-react';

export type ContactLinkType =
  | 'phone'
  | 'email'
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'github'
  | 'twitter'
  | 'website'
  | 'custom';

export interface ContactLinkItem {
  id: string;
  type: ContactLinkType;
  title: string;
  subtitle?: string;
  url: string;
}

export interface ContactSectionData {
  sectionTitle?: string;
  links: ContactLinkItem[];
}

interface ContactEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ContactSectionData;
  onSave: (updatedData: ContactSectionData) => void;
}

export const ContactEditModal: React.FC<ContactEditModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}) => {
  const [sectionTitle, setSectionTitle] = useState(initialData.sectionTitle || 'Contact Me');
  const [links, setLinks] = useState<ContactLinkItem[]>(initialData.links || []);

  if (!isOpen) return null;

  const addLink = () => {
    const newLink: ContactLinkItem = {
      id: `link-${Date.now()}`,
      type: 'website',
      title: 'Platform Link Name',
      subtitle: 'Short description of this platform link.',
      url: 'https://',
    };
    setLinks([...links, newLink]);
  };

  const removeLink = (index: number) => {
    if (links.length <= 1) {
      alert('You must keep at least one contact link.');
      return;
    }
    setLinks(links.filter((_, i) => i !== index));
  };

  const updateLinkField = (index: number, key: keyof ContactLinkItem, val: any) => {
    setLinks(
      links.map((item, i) => (i === index ? { ...item, [key]: val } : item))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      sectionTitle,
      links,
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
              <Phone size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Edit Contact & Platform Links</h3>
              <p className="text-xs text-purple-300/80 font-light">
                Add, edit, or remove phone numbers, social media handles, and platform links.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
            {/* 1. SECTION TITLE */}
            <div className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-2xl flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                Contact Section Heading
              </label>
              <input
                type="text"
                required
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                placeholder="e.g. Contact Me"
                className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs font-bold"
              />
            </div>

            {/* 2. PLATFORM LINKS LIST */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                  Platform Links & Info ({links.length})
                </span>
                <button
                  type="button"
                  onClick={addLink}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                >
                  <Plus size={15} /> Add New Platform Link
                </button>
              </div>

              {links.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-2xl flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                    <span className="text-xs font-bold text-purple-400 bg-purple-900/50 px-2.5 py-1 rounded-md border border-purple-500/30">
                      Link #{idx + 1}
                    </span>
                    {links.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLink(idx)}
                        className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-all text-xs font-bold flex items-center gap-1"
                      >
                        <Trash2 size={14} /> Delete Link
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-purple-300 block mb-1">Platform / Icon Type</label>
                      <select
                        value={item.type}
                        onChange={(e) => updateLinkField(idx, 'type', e.target.value as ContactLinkType)}
                        className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs font-bold cursor-pointer"
                      >
                        <option value="phone">Phone / Mobile 📞</option>
                        <option value="email">Email ✉️</option>
                        <option value="facebook">Facebook 👤</option>
                        <option value="instagram">Instagram 📸</option>
                        <option value="linkedin">LinkedIn 💼</option>
                        <option value="github">GitHub 🐙</option>
                        <option value="twitter">Twitter / X 🐦</option>
                        <option value="website">Website / Portfolio 🌐</option>
                        <option value="custom">Custom Link 💬</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-purple-300 block mb-1">Title / Handle Text</label>
                      <input
                        type="text"
                        required
                        value={item.title}
                        onChange={(e) => updateLinkField(idx, 'title', e.target.value)}
                        placeholder="e.g. +94 78 594 8622 or @hiruni.yasoda"
                        className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-purple-300 block mb-1">Clickable URL / Tel / Mailto</label>
                      <input
                        type="text"
                        required
                        value={item.url}
                        onChange={(e) => updateLinkField(idx, 'url', e.target.value)}
                        placeholder="e.g. tel:+94785948622 or https://..."
                        className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-purple-300 block mb-1">Description / Subtitle</label>
                    <input
                      type="text"
                      value={item.subtitle || ''}
                      onChange={(e) => updateLinkField(idx, 'subtitle', e.target.value)}
                      placeholder="e.g. Direct line for professional inquiries..."
                      className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
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
                <Save size={16} /> Save Contact Links
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
