import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Play } from 'lucide-react';
import { Project, getEmbedUrl } from '../data/ProjectData';

interface ProjectCardProps {
  project: Project;
  onExplore: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onExplore }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = getEmbedUrl(project.demo);
  const isYoutube = embedUrl?.includes('youtube.com/embed');

  // Fallback image logic
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    (e.currentTarget as HTMLImageElement).src = "https://placehold.co/600x400/1a1a1a/a855f7?text=Project+Image";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="flex flex-col h-full bg-transparent border border-purple-500/50 rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:border-purple-400 transition-all group"
    >
      {/* MEDIA CONTAINER */}
      <div className="relative w-full aspect-video border-b border-purple-500/30 overflow-hidden bg-black/80 flex items-center justify-center">
        {isPlaying && isYoutube ? (
          <iframe 
            src={embedUrl || undefined} /* FIXED TYPE ERROR HERE */
            title={project.title}
            className="w-full h-full relative z-20"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        ) : (
          <>
            {/* LAYER 1: Blurred Background Fill */}
            <div 
               className="absolute inset-0 bg-cover bg-center blur-2xl scale-125 opacity-50 transition-transform duration-700 group-hover:scale-150"
               style={{ backgroundImage: `url(/${project.image})` }}
            >
               <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* LAYER 2: The Main Image */}
            <img 
              src={`/${project.image}`} 
              alt={project.title} 
              className="relative z-10 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 p-2"
              onError={handleImageError}
            />

            {/* Play Button Overlay */}
            {project.demo && (
              <div 
                className="absolute inset-0 z-20 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => {
                  if (isYoutube) setIsPlaying(true);
                  else window.open(project.demo, '_blank');
                }}
              >
                <div className="w-14 h-14 rounded-full bg-purple-500/80 flex items-center justify-center backdrop-blur-md shadow-[0_0_15px_#a855f7] hover:scale-110 transition-transform">
                  <Play className="text-white ml-1" fill="currentColor" size={24} />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-grow relative z-10 bg-black/20 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm font-light leading-relaxed mb-6 flex-grow">
          {project.shortDesc}
        </p>
        
        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-4 mt-auto">
          <button 
            onClick={onExplore}
            className="flex-1 py-2.5 rounded-full border border-purple-500 text-purple-300 font-medium hover:bg-purple-500 hover:text-white transition-all text-sm shadow-[0_0_10px_rgba(168,85,247,0.2)]"
          >
            Explore
          </button>
          
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-purple-500 hover:border-purple-500 transition-colors">
              <Github size={20} />
            </a>
          )}
          {project.figma && (
            <a href={project.figma} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-purple-500 hover:border-purple-500 transition-colors">
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;