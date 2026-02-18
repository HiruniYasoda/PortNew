import React from 'react';
import { motion, Variants } from 'framer-motion'; // 1. Import Variants
import { Star } from 'lucide-react';

interface AchievementCardProps {
  rank: string;
  title: string;
  description: string;
  organization: string;
  image: string;
  index: number;
  starCount: number;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ 
  rank, 
  title, 
  description, 
  organization, 
  image, 
  index,
  starCount
}) => {
  
  // 2. Explicitly type as 'Variants'
  const containerVariants: Variants = {
    hover: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // 3. Explicitly type as 'Variants'
  const starVariants: Variants = {
    initial: { y: 0, scale: 1, textShadow: "0 0 0px transparent" },
    hover: { 
      y: -3, 
      scale: 1.2,
      textShadow: "0 0 8px rgb(168,85,247)",
      transition: { type: "spring", stiffness: 300 } 
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative w-full max-w-sm mx-auto"
    >
      {/* CARD CONTAINER */}
      <motion.div 
        className="relative bg-white/5 border border-purple-500/50 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-[40px] p-6 pt-12 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)] h-full flex flex-col justify-between overflow-visible"
        whileHover="hover"
        initial="initial"
        transition={{ duration: 0.3 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Hover Border Glow Effect */}
        <motion.div 
          className="absolute inset-0 rounded-[inherit] border-2 border-purple-400/0"
          variants={{
            hover: { borderColor: "rgba(168, 85, 247, 0.8)", boxShadow: "0 0 30px rgba(168,85,247,0.3)" }
          }}
        />
        
        {/* CIRCULAR IMAGE */}
        <motion.div 
          className="absolute -top-10 right-6 w-20 h-20 rounded-full border-4 border-black bg-slate-900 flex items-center justify-center overflow-hidden shadow-[0_0_15px_#a855f7] z-20"
          variants={{
            hover: { scale: 1.1, rotate: 5 }
          }}
        >
           <img 
             src={`/${image}`} 
             alt={title} 
             className="w-full h-full object-cover" 
             onError={(e) => {
               (e.target as HTMLImageElement).src = "https://placehold.co/100x100/purple/white?text=Logo";
             }}
           />
        </motion.div>

        {/* CONTENT */}
        <div className="mb-6 relative z-10">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-white mb-1">
            {rank}
          </h3>
          <h4 className="text-lg font-semibold text-white mb-2 leading-tight">
            {title}
          </h4>
          <p className="text-sm text-slate-300 mb-3 font-light italic">
             {description}
          </p>
          
          <div className="flex items-start gap-2 mt-3 pt-3 border-t border-white/10">
             <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0 shadow-[0_0_5px_#a855f7]" />
             <p className="text-xs text-slate-400 leading-relaxed">
               {organization}
             </p>
          </div>
        </div>

        {/* STAR RATING BAR */}
        <motion.div 
          className="bg-black/40 border border-purple-500/30 rounded-full px-4 py-2 w-fit flex gap-1 shadow-[inset_0_0_10px_rgba(168,85,247,0.1)] relative z-10"
          variants={containerVariants}
        >
           {[...Array(5)].map((_, i) => {
             const isFilled = i < starCount;
             return (
               <motion.div key={i} variants={starVariants}>
                 <Star 
                   size={14} 
                   fill={isFilled ? "#a855f7" : "transparent"} 
                   strokeWidth={isFilled ? 0 : 2}
                   className={`
                     ${isFilled ? "text-purple-500 drop-shadow-[0_0_5px_#a855f7]" : "text-purple-500/60"}
                   `}
                 />
               </motion.div>
             );
           })}
        </motion.div>

      </motion.div>
    </motion.div>
  );
};

export default AchievementCard;