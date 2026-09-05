import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pencil } from 'lucide-react';
import VolunteeringCard from '../Components/VCard';
import { useAdmin } from '../Context/AdminContext';
import {
  VolunteeringEditModal,
  VolunteeringSectionData,
  VolunteeringItem,
} from '../Components/Admin/VolunteeringEditModal';

// --- DEFAULT DATA ---
const DEFAULT_VOLUNTEERING: VolunteeringItem[] = [
  {
    title: 'Graphic Design Volunteer',
    subHeading: 'ComURS 2025',
    italic: 'Sabaragamuwa University Research Symposium',
  },
  {
    title: 'Student Volunteer',
    subHeading: 'Faculty of Computing, Sabaragamuwa University Sri Lanka',
  },
  {
    title: 'Graphic Design Volunteer',
    subHeading: 'SDG Task Force Project',
    italic: 'Rotaract Club of Sabaragamuwa University Sri Lanka',
  },
  {
    title: 'Organizing Committee (Financial)',
    subHeading: 'Pixel Pioneers V1.0 (IEEE CS Chapter)',
    italic: 'Faculty of Computing, Sabaragamuwa University Sri Lanka',
  },
  {
    title: 'Graphic Design Volunteer',
    subHeading: 'IEEE CS Chapter ',
    italic: 'Faculty of Computing, Sabaragamuwa University Sri Lanka',
  },
];

const Volunteering: React.FC = () => {
  const { isAdmin } = useAdmin();
  const [data, setData] = useState<VolunteeringSectionData>({ volunteering: DEFAULT_VOLUNTEERING });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_volunteering_data');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse volunteering data', e);
      }
    }
  }, []);

  const handleSave = (updated: VolunteeringSectionData) => {
    setData(updated);
    localStorage.setItem('portfolio_volunteering_data', JSON.stringify(updated));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-20 relative">
      {/* Edit Modal */}
      <VolunteeringEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={data}
        onSave={handleSave}
      />

      {/* HEADER */}
      <div className="text-center mb-16 relative">
        {isAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute top-0 right-0 z-30 px-4 py-2 rounded-xl bg-purple-600 border border-purple-400/50 text-white shadow-[0_0_20px_rgba(168,85,247,0.7)] hover:scale-105 hover:bg-purple-500 transition-all flex items-center gap-1.5 text-xs font-bold"
            title="Edit Volunteering"
          >
            <Pencil size={14} />
            <span>Edit Volunteering</span>
          </button>
        )}

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
        {data.volunteering.map((item, index) => (
          <VolunteeringCard
            key={item.id || index}
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