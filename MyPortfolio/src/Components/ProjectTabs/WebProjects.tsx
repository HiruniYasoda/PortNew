import React from 'react';
import ProjectCard from '../ProjectCard';
import { projectsData, Project } from '../../data/ProjectData';

const WebProjects: React.FC<{ onExplore: (p: Project) => void }> = ({ onExplore }) => {
  const filtered = projectsData.filter(p => p.category === 'Web Projects');
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-stretch max-w-7xl mx-auto">
      {filtered.map(project => <ProjectCard key={project.id} project={project} onExplore={() => onExplore(project)} />)}
    </div>
  );
};
export default WebProjects;