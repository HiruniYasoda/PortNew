import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Pencil } from 'lucide-react';
import AchievementCard from '../Components/ACard';
import { useAdmin } from '../Context/AdminContext';
import {
  AchievementsEditModal,
  AchievementsData,
  AchievementItem,
} from '../Components/Admin/AchievementsEditModal';

// --- DEFAULT DATA ---
const DEFAULT_ACHIEVEMENTS: AchievementItem[] = [
  {
    rank: '1st Runners Up',
    title: 'SHECODERess V6.0',
    description: 'The hack and design showdown.',
    organization: 'IEEE (WIE) Student Branch affinity group, Uwa Wellassa University Sri Lanka',
    image: 'she.png',
    stars: 5,
  },
  {
    rank: '4th Place',
    title: 'AlgoArena',
    description: 'Inter-university coding competition.',
    organization: 'IEEE Student Branch and Computer Society Chapter, University of Sri Jayewardenepura',
    image: 'algoarenalogo.webp',
    stars: 4,
  },
  {
    rank: 'Finalist',
    title: '𝐒𝐃𝐆 𝐒𝐩𝐫𝐢𝐧𝐭𝐬',
    description: 'Coding competition focused on Sustainable Development Goals.',
    organization: '𝐈𝐄𝐄𝐄 𝐒𝐫𝐢 𝐋𝐚𝐧𝐤𝐚 𝐒𝐞𝐜𝐭𝐢𝐨𝐧 𝐒𝐈𝐆𝐇𝐓',
    image: 'logo.png',
    stars: 3,
  },
  {
    rank: 'Semi Finalist',
    title: 'Dev{thon} 3.0',
    description: 'Premier web development competition.',
    organization: 'Leo Club, University of Moratuwa',
    image: 'Devthon.png',
    stars: 2,
  },
  {
    rank: 'Successfully Completed',
    title: 'Innovate with Ballerina',
    description: 'Idea hackathon powered by WSO2.',
    organization: 'IEEE Student Branch, IEEE CS Student Branch Chapter of University of Moratuwa',
    image: 'Ballerina-Integrator_Hero-Blage.webp',
    stars: 1,
  },
];

const DEFAULT_ACHIEVEMENTS_DATA: AchievementsData = {
  teamName: 'Idea Igniters',
  teamLogo: 'II.png',
  youtubeUrl: 'https://youtube.com',
  achievements: DEFAULT_ACHIEVEMENTS,
};

const Achievements: React.FC = () => {
  const { isAdmin } = useAdmin();
  const [data, setData] = useState<AchievementsData>(DEFAULT_ACHIEVEMENTS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_achievements_data');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse achievements data', e);
      }
    }
  }, []);

  const handleSave = (updated: AchievementsData) => {
    setData(updated);
    localStorage.setItem('portfolio_achievements_data', JSON.stringify(updated));
  };

  const teamName = data.teamName || 'Idea Igniters';
  const teamLogo = data.teamLogo || 'II.png';
  const youtubeUrl = data.youtubeUrl || 'https://youtube.com';

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-20 relative">
      {/* Edit Modal */}
      <AchievementsEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={data}
        onSave={handleSave}
      />

      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col items-center text-center mb-16 relative">
        {isAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute top-0 right-0 z-30 px-4 py-2 rounded-xl bg-purple-600 border border-purple-400/50 text-white shadow-[0_0_20px_rgba(168,85,247,0.7)] hover:scale-105 hover:bg-purple-500 transition-all flex items-center gap-1.5 text-xs font-bold"
            title="Edit Achievements"
          >
            <Pencil size={14} />
            <span>Edit Achievements</span>
          </button>
        )}

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          Our <span className="text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]">Achievements</span>
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 max-w-2xl text-lg mb-8"
        >
          Milestones we have conquered together as a dedicated team, pushing boundaries in innovation and code.
        </motion.p>

        {/* TEAM BADGE (Glass Bubble) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="flex items-center gap-4 bg-white/10 border border-purple-500/30 px-6 py-3 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:bg-white/15 transition-all group"
        >
          {/* Team Logo */}
          <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-900 border border-purple-400 flex items-center justify-center">
            <img
              src={teamLogo.startsWith('data:') || teamLogo.startsWith('http') || teamLogo.startsWith('/') ? teamLogo : `/${teamLogo}`}
              alt={teamName}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/purple/white?text=Team';
              }}
            />
          </div>

          <div className="text-left">
            <span className="text-xs text-slate-400 uppercase tracking-wider block">Team</span>
            <span className="text-white font-bold text-lg leading-none">{teamName}</span>
          </div>

          <div className="h-8 w-[1px] bg-white/20 mx-2" />

          {/* YouTube Link */}
          <motion.a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500"
            whileHover={{ scale: 1.2, color: '#ff0000' }}
          >
            <Youtube size={28} />
          </motion.a>
        </motion.div>
      </div>

      {/* --- CARDS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 mt-12">
        {data.achievements.map((item, index) => (
          <AchievementCard
            key={item.id || index}
            index={index}
            rank={item.rank}
            title={item.title}
            description={item.description}
            organization={item.organization}
            image={item.image}
            starCount={item.stars}
          />
        ))}
      </div>
    </div>
  );
};

export default Achievements;