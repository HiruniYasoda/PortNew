import React from 'react';
import { motion } from 'framer-motion';
import { Youtube } from 'lucide-react';
import AchievementCard from '../Components/ACard';

// --- DATA ---
const achievementsData = [
  {
    rank: "1st Runners Up",
    title: "SHECODERess V6.0",
    description: "The hack and design showdown.",
    organization: "IEEE (WIE) Student Branch affinity group, Uwa Wellassa University Sri Lanka",
    image: "she.png",
    stars: 5 // 5 Filled
  },
  {
    rank: "4th Place",
    title: "AlgoArena",
    description: "Inter-university coding competition.",
    organization: "IEEE Student Branch and Computer Society Chapter, University of Sri Jayewardenepura",
    image: "algoarenalogo.webp",
    stars: 4 // 4 Filled, 1 Outline
  },
  {
    rank: "Finalist",
    title: "𝐒𝐃𝐆 𝐒𝐩𝐫𝐢𝐧𝐭𝐬",
    description: "Coding competition focused on Sustainable Development Goals.",
    organization: "𝐈𝐄𝐄𝐄 𝐒𝐫𝐢 𝐋𝐚𝐧𝐤𝐚 𝐒𝐞𝐜𝐭𝐢𝐨𝐧 𝐒𝐈𝐆𝐇𝐓",
    image: "logo.png",
    stars: 3 // 3 Filled, 2 Outline
  },
  {
    rank: "Semi Finalist",
    title: "Dev{thon} 3.0",
    description: "Premier web development competition.",
    organization: "Leo Club, University of Moratuwa",
    image: "Devthon.png",
    stars: 2 // 2 Filled, 3 Outline
  },
  {
    rank: "Successfully Completed",
    title: "Innovate with Ballerina",
    description: "Idea hackathon powered by WSO2.",
    organization: "IEEE Student Branch, IEEE CS Student Branch Chapter of University of Moratuwa",
    image: "Ballerina-Integrator_Hero-Blage.webp",
    stars: 1 // 1 Filled, 4 Outline
  }
];

const Achievements: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-20">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col items-center text-center mb-16">
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
          transition={{ delay: 0.3, type: "spring" }}
          className="flex items-center gap-4 bg-white/10 border border-purple-500/30 px-6 py-3 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:bg-white/15 transition-all group"
        >
          {/* Team Logo */}
          <div className="w-10 h-10 rounded-full overflow-hidden bg-black border border-purple-400">
             <img src="/II.png" alt="Team Idea Igniters" className="w-full h-full object-cover" />
          </div>
          
          <div className="text-left">
            <span className="text-xs text-slate-400 uppercase tracking-wider block">Team</span>
            <span className="text-white font-bold text-lg leading-none">Idea Igniters</span>
          </div>

          <div className="h-8 w-[1px] bg-white/20 mx-2" />

          {/* YouTube Link */}
          <motion.a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-red-500"
            whileHover={{ scale: 1.2, color: "#ff0000" }}
          >
            <Youtube size={28} />
          </motion.a>
        </motion.div>
      </div>

      {/* --- CARDS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 mt-12">
        {achievementsData.map((item, index) => (
          <AchievementCard
            key={index}
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