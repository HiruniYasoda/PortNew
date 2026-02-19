import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Category, Project } from '../data/ProjectData';
import ProjectModal from '../Components/ProjectModel';
import WebProjects from '../Components/ProjectTabs/WebProjects';
import MobileProjects from '../Components/ProjectTabs/MobileProjects';
import SystemProjects from '../Components/ProjectTabs/SystemProjects';
import ConceptProjects from '../Components/ProjectTabs/ConceptProjects';


const ProjectsSection: React.FC = () => {
  const categories: Category[] = ['Web Projects', 'Mobile App', 'Systems', 'Concept & UX'];
  const [activeTab, setActiveTab] = useState<Category>('Web Projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative min-h-screen w-full bg-black overflow-hidden py-24">
      
      {/* Background Decor */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            My <span className="text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">Projects</span>
          </motion.h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
            A showcase of applications, systems, and concepts that solve real-world problems.
          </p>
        </div>

        {/* NAVIGATION TABS (SMOOTH ANIMATION) */}
        <div className="flex justify-center mb-16">
          <div className="relative flex flex-wrap justify-center bg-slate-900/50 p-1.5 rounded-full border border-purple-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.1)]">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 md:px-8 py-2.5 rounded-full text-sm md:text-base font-semibold transition-colors duration-300 z-10 ${
                  activeTab === tab ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {/* Framer Motion Sliding Pill */}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeProjectTab"
                    className="absolute inset-0 bg-purple-600 rounded-full shadow-[0_0_15px_#a855f7] -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* RENDER ACTIVE TAB */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'Web Projects' && <WebProjects onExplore={setSelectedProject} />}
            {activeTab === 'Mobile App' && <MobileProjects onExplore={setSelectedProject} />}
            {activeTab === 'Systems' && <SystemProjects onExplore={setSelectedProject} />}
            {activeTab === 'Concept & UX' && <ConceptProjects onExplore={setSelectedProject} />}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* POPUP MODAL MOUNT */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
      
    </section>
  );
};

export default ProjectsSection;