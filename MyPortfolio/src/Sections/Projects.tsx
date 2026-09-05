import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Category, Project, projectsData as initialProjects } from '../data/ProjectData';
import ProjectModal from '../Components/ProjectModel';
import ProjectCard from '../Components/ProjectCard';
import { ProjectEditModal } from '../Components/Admin/ProjectEditModal';
import { useAdmin } from '../Context/AdminContext';

const ProjectsSection: React.FC = () => {
  const { isAdmin } = useAdmin();
  const categories: Category[] = ['Web Projects', 'Mobile App', 'Systems', 'Concept & UX'];
  const [activeTab, setActiveTab] = useState<Category>('Web Projects');
  
  const [projectsList, setProjectsList] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Admin Edit Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const filteredProjects = projectsList.filter((p) => p.category === activeTab);

  const handleSaveProject = (savedProject: Project) => {
    setProjectsList((prev) => {
      const exists = prev.some((p) => String(p.id) === String(savedProject.id));
      if (exists) {
        return prev.map((p) => (String(p.id) === String(savedProject.id) ? savedProject : p));
      }
      return [...prev, savedProject];
    });
  };

  const handleDeleteProject = (id: string | number) => {
    setProjectsList((prev) => prev.filter((p) => String(p.id) !== String(id)));
  };

  const openAddModal = () => {
    setEditingProject(null);
    setIsEditModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setIsEditModalOpen(true);
  };

  return (
    <section id="projects" className="relative min-h-screen w-full bg-black overflow-hidden py-24">
      {/* Background Decor */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
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

        {/* NAVIGATION TABS */}
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

        {/* PROJECTS GRID WITH INLINE ADMIN CARDS */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-stretch max-w-7xl mx-auto"
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onExplore={() => setSelectedProject(project)}
                onEdit={() => openEditModal(project)}
              />
            ))}

            {/* ➕ ADD NEW PROJECT CARD (Visible when Admin Mode is active) */}
            {isAdmin && (
              <motion.div
                onClick={openAddModal}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center justify-center min-h-[320px] p-8 border-2 border-dashed border-purple-500/50 hover:border-purple-400 rounded-2xl bg-purple-950/10 hover:bg-purple-900/20 cursor-pointer transition-all text-center group shadow-[0_0_20px_rgba(168,85,247,0.15)]"
              >
                <div className="w-16 h-16 rounded-full bg-purple-500/20 text-purple-400 border border-purple-400/40 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-[0_0_20px_#a855f7]">
                  <Plus size={32} />
                </div>
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  Add New {activeTab}
                </h4>
                <p className="text-xs text-slate-400 font-light max-w-xs">
                  Click to open form & drag-and-drop a project screenshot.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* EXPLORE MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* ADMIN EDIT / ADD MODAL */}
      <ProjectEditModal
        isOpen={isEditModalOpen}
        projectToEdit={editingProject}
        defaultCategory={activeTab}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProject}
        onDelete={(id) => handleDeleteProject(id)}
      />
    </section>
  );
};

export default ProjectsSection;