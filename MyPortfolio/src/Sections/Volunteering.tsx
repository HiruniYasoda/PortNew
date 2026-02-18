import React from 'react';
import { motion } from 'framer-motion';
import VolunteeringCard from '../Components/VCard';

// --- DATA ---
const volunteeringData = [
  {
    title: "Graphic Design Volunteer",
    subHeading: "ComURS 2025",
    italic: "Sabaragamuwa University Research Symposium",
  },
  {
    title: "Student Volunteer",
    subHeading: "Faculty of Computing, Sabaragamuwa University Sri Lanka",
  },
  {
    title: "Graphic Design Volunteer",
    subHeading: "SDG Task Force Project",
    italic: "Rotaract Club of Sabaragamuwa University Sri Lanka",
  },
  {
    title: "Organizing Committee (Financial)",
    subHeading: "Pixel Pioneers V1.0 (IEEE CS Chapter)",
    italic: "Faculty of Computing, Sabaragamuwa University Sri Lanka",
  },
  {
    title: "Graphic Design Volunteer",
    subHeading: "IEEE CS Chapter ",
    italic: "Faculty of Computing, Sabaragamuwa University Sri Lanka",
  }
];

const Volunteering: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-20">
      
      {/* HEADER */}
      <div className="text-center mb-16">
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          Giving <span className="text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]">Back</span>
        </motion.h3>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Contributing to the community through leadership, design, and organization.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
        {volunteeringData.map((item, index) => (
          <VolunteeringCard
            key={index}
            index={index}
            title={item.title}
            subHeading={item.subHeading}
            italic={item.italic}
          />
        ))}
      </div>

    </div>
  );
};

export default Volunteering;