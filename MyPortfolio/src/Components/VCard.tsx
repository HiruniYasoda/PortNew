import React from 'react';
import { motion, Variants } from 'framer-motion';
import { HeartHandshake } from 'lucide-react';

interface VolunteeringCardProps {
  title: string;
  subHeading: string;
  italic?: string;
  index: number;
}

const VolunteeringCard: React.FC<VolunteeringCardProps> = ({ 
  title, 
  subHeading, 
  italic, 
  index 
}) => {

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1 }
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      className="relative w-full max-w-sm mx-auto group"
    >
      {/* CARD CONTAINER */}
      <div className="relative h-full bg-white/5 border border-purple-500/30 rounded-2xl p-8 overflow-hidden backdrop-blur-md transition-colors group-hover:border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
        
        {/* GLOWING CORNER (Top Left) */}
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-gradient-to-br from-purple-600 to-transparent rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
        
        {/* ICON (Replacing Number) */}
        <div className="absolute top-0 left-0 p-4">
           <div className="bg-purple-500/20 p-2 rounded-br-2xl rounded-tl-xl backdrop-blur-sm border-r border-b border-purple-500/30 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <HeartHandshake size={24} />
           </div>
        </div>

        {/* CONTENT */}
        <div className="mt-8 relative z-10">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
            {title}
          </h3>
          
          <div className="w-10 h-[2px] bg-purple-500/50 mb-4 group-hover:w-20 transition-all duration-500" />
          
          <div className="space-y-1">
            <p className="text-sm text-slate-300 leading-relaxed font-light">
               {subHeading}
             </p>
             {italic && <p className="text-xs text-purple-300 italic font-medium">{italic}</p>}
             
          </div>
        </div>

        {/* GLOWING BOTTOM RIGHT ACCENT (Neon Bubble) */}
        <div className="absolute bottom-4 right-4">
           <motion.div 
             className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]"
             animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
             transition={{ duration: 2, repeat: Infinity }}
           />
           {/* Decorative corner shape */}
           <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-tl from-purple-600/20 to-transparent rounded-full blur-lg" />
        </div>

      </div>
    </motion.div>
  );
};

export default VolunteeringCard;