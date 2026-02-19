import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Terminal, Cpu } from 'lucide-react';
import { Project } from '../data/ProjectData';

interface TextProjectCardProps {
  project: Project;
  onExplore: () => void;
}

const TextProjectCard: React.FC<TextProjectCardProps> = ({ project, onExplore }) => {
  // Choose a background icon based on category
  const BgIcon = project.category === 'Systems' ? Terminal : Cpu;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative flex flex-col h-full bg-white/5 border border-purple-500/30 rounded-2xl overflow-hidden backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] hover:border-purple-400 group"
    >
      {/* Background Abstract Glow & Icon */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-colors" />
      <BgIcon 
        size={120} 
        className="absolute -bottom-4 -right-4 text-purple-500/5 group-hover:text-purple-500/10 transition-colors transform -rotate-12" 
      />

      <div className="p-8 flex flex-col flex-grow relative z-10">
        <div className="flex items-center gap-3 mb-4">
           <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
           <span className="text-xs text-purple-300 uppercase tracking-wider font-semibold">
             {project.category}
           </span>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-slate-400 text-sm font-light leading-relaxed mb-8 flex-grow">
          {project.shortDesc}
        </p>
        
        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-4 mt-auto">
          <button 
            onClick={onExplore}
            className="flex-1 py-2.5 rounded-full bg-purple-500/10 border border-purple-500/50 text-purple-300 font-medium hover:bg-purple-500 hover:text-white transition-all text-sm shadow-[0_0_10px_rgba(168,85,247,0.1)] group-hover:border-purple-400"
          >
            Explore Details
          </button>
          
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-purple-500 hover:border-purple-500 transition-colors z-20">
              <Github size={20} />
            </a>
          )}
          {project.figma && (
            <a href={project.figma} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-purple-500 hover:border-purple-500 transition-colors z-20">
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TextProjectCard;