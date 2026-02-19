import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Play, X, Lightbulb, AlertTriangle, GraduationCap } from 'lucide-react';
import { Project, getEmbedUrl } from '../data/ProjectData';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const embedUrl = getEmbedUrl(project.demo);
  const isYoutube = embedUrl?.includes('youtube.com/embed');
  const hasMedia = ['Web Projects', 'Mobile App'].includes(project.category);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#0a0a0a] border border-purple-500/40 rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.2)] custom-scrollbar flex flex-col"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/60 hover:bg-purple-500 text-slate-300 hover:text-white rounded-full transition-all backdrop-blur-md border border-white/10"
        >
          <X size={20} />
        </button>

        {/* HEADER / MEDIA SECTION */}
        {hasMedia ? (
          <div className="w-full aspect-video md:aspect-[21/9] bg-black relative border-b border-purple-500/20">
             {isYoutube ? (
               <iframe 
                 src={embedUrl || undefined} /* FIXED TYPE ERROR HERE */
                 className="w-full h-full" 
                 allow="autoplay; fullscreen" 
               />
             ) : (
               <img src={`/${project.image}`} alt={project.title} className="w-full h-full object-cover opacity-80" />
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
          </div>
        ) : (
          <div className="w-full h-32 bg-gradient-to-br from-purple-900/40 to-black relative border-b border-purple-500/20 flex items-center px-8">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
          </div>
        )}

        {/* CONTENT SECTION */}
        <div className="p-6 md:p-8 flex-grow -mt-10 relative z-10">
          
          {/* Title & Tags */}
          <div className="mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold tracking-widest uppercase mb-3 backdrop-blur-md">
              {project.category}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              {project.title}
            </h2>
            
            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-sm font-medium transition-colors border border-white/10 hover:border-purple-500/50">
                  <Github size={16} /> Repository
                </a>
              )}
              {project.demo && !isYoutube && (
                 <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600/80 hover:bg-purple-500 text-white text-sm font-medium transition-colors shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                   <Play size={16} /> Live Demo
                 </a>
              )}
              {project.figma && (
                 <a href={project.figma} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600/80 hover:bg-purple-500 text-white text-sm font-medium transition-colors shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                   <ExternalLink size={16} /> View Figma
                 </a>
              )}
            </div>
          </div>

          {/* BENTO GRID DETAILS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Concept */}
            <div className="md:col-span-2 bg-white/5 border border-purple-500/20 rounded-2xl p-5">
              <h3 className="text-sm text-purple-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                <Lightbulb size={16} /> The Concept
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">{project.concept}</p>
              <div className="mt-3 pt-3 border-t border-white/5">
                <p className="text-slate-400 text-xs"><strong className="text-slate-200">Innovativeness:</strong> {project.innovativeness}</p>
              </div>
            </div>
            
            {/* Problems Faced */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
              <h3 className="text-sm text-red-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                 <AlertTriangle size={16} /> Challenges
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">{project.problems}</p>
            </div>
            
            {/* What I Learned */}
            <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-5">
              <h3 className="text-sm text-green-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                 <GraduationCap size={16} /> Key Learnings
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">{project.learned}</p>
            </div>

          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;