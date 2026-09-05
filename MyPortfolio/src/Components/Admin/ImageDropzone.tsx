import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

interface ImageDropzoneProps {
  currentImageUrl?: string;
  onImageSelected: (urlOrBase64: string) => void;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({ currentImageUrl, onImageSelected }) => {
  const [preview, setPreview] = useState<string>(currentImageUrl || '');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WEBP)');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreview(base64String);
      onImageSelected(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = () => {
    setPreview('');
    onImageSelected('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-purple-300">
        Project Image (Drag & Drop or Click)
      </label>

      {preview ? (
        <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-purple-500/40 group shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          <img src={preview} alt="Upload Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-purple-600 text-white text-xs font-bold rounded-xl shadow-lg hover:bg-purple-500 transition-all"
            >
              Change Image
            </button>
            <button
              type="button"
              onClick={removeImage}
              className="p-2 bg-red-600/80 text-white rounded-xl hover:bg-red-600 transition-all"
            >
              <X size={18} />
            </button>
          </div>
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-green-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-md">
            <CheckCircle2 size={12} /> Image Ready
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full h-40 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 cursor-pointer transition-all ${
            isDragging
              ? 'border-purple-400 bg-purple-500/20 scale-[1.01]'
              : 'border-purple-500/30 bg-white/5 hover:border-purple-400/60 hover:bg-white/10'
          }`}
        >
          <div className="p-3 bg-purple-500/20 rounded-full text-purple-400 mb-3 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <Upload size={22} />
          </div>
          <p className="text-sm font-medium text-white text-center">
            Drag & Drop image here, or <span className="text-purple-400 underline">browse</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">Supports PNG, JPG, WEBP (Auto Cloud Upload)</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        className="hidden"
      />
    </div>
  );
};
