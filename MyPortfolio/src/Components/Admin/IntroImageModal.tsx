import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Image as ImageIcon } from 'lucide-react';
import { ImageDropzone } from './ImageDropzone';

interface IntroImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage: string;
  onSave: (newImageUrl: string) => void;
}

export const IntroImageModal: React.FC<IntroImageModalProps> = ({
  isOpen,
  onClose,
  currentImage,
  onSave,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(currentImage);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(selectedImage);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-[#0b0a10] border border-purple-500/50 rounded-3xl p-6 md:p-8 shadow-[0_0_60px_rgba(168,85,247,0.4)] overflow-hidden"
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
              <ImageIcon size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Update Profile Photo</h3>
              <p className="text-xs text-purple-300/80 font-light">Drag & drop or upload a new picture.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <ImageDropzone
              currentImageUrl={selectedImage}
              onImageSelected={(url) => setSelectedImage(url)}
            />

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
                <Save size={16} /> Save Profile Photo
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
