import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Trash2, Plus, Sparkles } from 'lucide-react';
import { Project, Category } from '../../data/ProjectData';
import { ImageDropzone } from './ImageDropzone';

interface ProjectEditModalProps {
  isOpen: boolean;
  projectToEdit?: Project | null;
  defaultCategory?: Category;
  onClose: () => void;
  onSave: (project: Project) => void;
  onDelete?: (id: number) => void;
}

export const ProjectEditModal: React.FC<ProjectEditModalProps> = ({
  isOpen,
  projectToEdit,
  defaultCategory = 'Web Projects',
  onClose,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<Category>(defaultCategory);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [newTech, setNewTech] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');

  useEffect(() => {
    if (projectToEdit) {
      setTitle(projectToEdit.title || '');
      setTagline(projectToEdit.tagline || '');
      setCategory(projectToEdit.category || defaultCategory);
      setDescription(projectToEdit.description || '');
      setImage(projectToEdit.image || '');
      setTechnologies(projectToEdit.technologies || []);
      setLiveUrl(projectToEdit.liveUrl || '');
      setGithubUrl(projectToEdit.githubUrl || '');
    } else {
      // Blank for new item
      setTitle('');
      setTagline('');
      setCategory(defaultCategory);
      setDescription('');
      setImage('/projects/placeholder.png');
      setTechnologies(['React', 'Node.js', 'Tailwind CSS']);
      setLiveUrl('');
      setGithubUrl('');
    }
  }, [projectToEdit, defaultCategory, isOpen]);

  const handleAddTech = () => {
    if (newTech.trim() && !technologies.includes(newTech.trim())) {
      setTechnologies([...technologies, newTech.trim()]);
      setNewTech('');
    }
  };

  const handleRemoveTech = (techToRemove: string) => {
    setTechnologies(technologies.filter((t) => t !== techToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProject: Project = {
      id: projectToEdit ? projectToEdit.id : Date.now(),
      title,
      tagline,
      category,
      description,
      image: image || '/projects/placeholder.png',
      technologies,
      liveUrl,
      githubUrl,
      keyFeatures: projectToEdit?.keyFeatures || ['Responsive Modern Interface', 'Secure API Integration'],
    };

    onSave(updatedProject);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0a0a0d] border border-purple-500/40 rounded-3xl p-6 md:p-8 shadow-[0_0_60px_rgba(168,85,247,0.3)] my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-purple-500/20 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-500/20 rounded-xl text-purple-400 border border-purple-500/30">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {projectToEdit ? 'Edit Project' : 'Add New Project'}
                </h3>
                <p className="text-xs text-slate-400">Fill in details and drop an image below</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* 1. Title & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1 block">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Agri-Tech Management Portal"
                  className="w-full bg-white/5 border border-purple-500/30 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-purple-400 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1 block">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full bg-slate-900 border border-purple-500/30 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-purple-400 transition-all"
                >
                  <option value="Web Projects">Web Projects</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Systems">Systems</option>
                  <option value="Concept & UX">Concept & UX</option>
                </select>
              </div>
            </div>

            {/* 2. Tagline */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1 block">
                Short Tagline / Subtitle
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Smart crop monitoring dashboard with IoT analytics"
                className="w-full bg-white/5 border border-purple-500/30 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-purple-400 transition-all"
              />
            </div>

            {/* 3. Drag & Drop Image Uploader */}
            <ImageDropzone currentImageUrl={image} onImageSelected={(url) => setImage(url)} />

            {/* 4. Full Description */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1 block">
                Detailed Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe project purpose, core architecture, and key achievements..."
                className="w-full bg-white/5 border border-purple-500/30 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-purple-400 transition-all resize-none"
              />
            </div>

            {/* 5. Tech Stack Tags */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1 block">
                Technologies Used
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
                  placeholder="e.g. Next.js, MongoDB"
                  className="flex-1 bg-white/5 border border-purple-500/30 rounded-xl py-2 px-3 text-white text-xs focus:outline-none focus:border-purple-400"
                />
                <button
                  type="button"
                  onClick={handleAddTech}
                  className="px-4 py-2 bg-purple-600/30 border border-purple-500 text-purple-300 text-xs font-bold rounded-xl hover:bg-purple-600 hover:text-white transition-all flex items-center gap-1"
                >
                  <Plus size={14} /> Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-xs"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* 6. Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1 block">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://myproject.com"
                  className="w-full bg-white/5 border border-purple-500/30 rounded-xl py-2.5 px-4 text-white text-xs focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1 block">
                  GitHub Repository URL
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/user/project"
                  className="w-full bg-white/5 border border-purple-500/30 rounded-xl py-2.5 px-4 text-white text-xs focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-between border-t border-purple-500/20 pt-4 mt-2">
              {projectToEdit && onDelete ? (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this project?')) {
                      onDelete(projectToEdit.id);
                      onClose();
                    }
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600/20 border border-red-500/50 text-red-400 text-xs font-bold hover:bg-red-600 hover:text-white transition-all"
                >
                  <Trash2 size={16} /> Delete Project
                </button>
              ) : <div />}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-white/5 text-slate-400 text-xs font-semibold hover:bg-white/10 hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all transform active:scale-95"
                >
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
