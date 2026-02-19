import React from 'react';
import TextProjectCard from '../ProjectTextCard'; // Using the text card
import { projectsData, Project } from '../../data/ProjectData';

const SystemProjects: React.FC<{ onExplore: (p: Project) => void }> = ({ onExplore }) => {
  const filtered = projectsData.filter(p => p.category === 'Systems');
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-stretch max-w-5xl mx-auto">
      {filtered.map(project => <TextProjectCard key={project.id} project={project} onExplore={() => onExplore(project)} />)}
    </div>
  );
};
export default SystemProjects;