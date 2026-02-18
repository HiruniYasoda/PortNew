import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Brain, Users, Lightbulb, MessageSquare, Crown } from 'lucide-react';

// --- DATA ---
const softSkills = [
  { label: "Problem Solving", level: 90, icon: Brain },
  { label: "Teamwork", level: 85, icon: Users },
  { label: "Creativity", level: 95, icon: Lightbulb },
  { label: "Communication", level: 80, icon: MessageSquare },
  { label: "Leadership", level: 85, icon: Crown },
];

// --- CIRCULAR COMPONENT ---
interface CircularSkillProps {
  label: string;
  level: number;
  icon: React.ElementType;
  index: number;
}

const CircularSkill: React.FC<CircularSkillProps> = ({ label, level, icon: Icon, index }) => {
  const size = 120;
  const strokeWidth = 5; // Reduced thickness to match linear bars (h-2 is approx 8px, but visual weight feels lighter on circles)
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate stroke offset
  const strokeDashoffset = circumference - (level / 100) * circumference;

  // Calculate position for the "White Laser Tip"
  // -90 degrees offset because SVG starts at 3 o'clock, we want 12 o'clock
  const angle = (level / 100) * 360; 
  const angleInRad = (angle - 90) * (Math.PI / 180);
  const tipX = center + radius * Math.cos(angleInRad);
  const tipY = center + radius * Math.sin(angleInRad);

  const circleVariants: Variants = {
    hidden: { strokeDashoffset: circumference, opacity: 0 },
    visible: { 
      strokeDashoffset: strokeDashoffset, 
      opacity: 1,
      transition: { duration: 2, ease: "easeOut", delay: index * 0.2 } 
    }
  };

  const tipVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.5, delay: 1.5 + (index * 0.2) } 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 group">
      <div className="relative" style={{ width: size, height: size }}>
        
        {/* SVG Container */}
        <svg width={size} height={size} className="transform -rotate-90">
          <defs>
            {/* EXACT GRADIENT from technical bars: purple-900 -> purple-500 -> purple-400 */}
            <linearGradient id={`neonGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#581c87" />   {/* purple-900 */}
              <stop offset="50%" stopColor="#a855f7" />  {/* purple-500 */}
              <stop offset="100%" stopColor="#c084fc" /> {/* purple-400 */}
            </linearGradient>
          </defs>

          {/* Background Track (Matches bg-slate-800/50) */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#1e293b" // slate-800
            strokeOpacity="0.5"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Animated Progress Circle */}
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            stroke={`url(#neonGradient-${index})`}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            variants={circleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            // Subtle clean glow, removed heavy drop-shadow
            style={{ 
              filter: `drop-shadow(0 0 4px rgba(168, 85, 247, 0.6))` 
            }}
          />
        </svg>

        {/* WHITE LASER TIP (Positioned dynamically) */}
        <motion.div
          variants={tipVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          // Matches the w-1.5 h-1.5 from linear bars
          className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#fff] z-10"
          style={{
            left: tipX - 3, // Center the div (width/2)
            top: tipY - 3,
          }}
        />

        {/* Icon & Percentage Center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <Icon size={24} className="text-purple-300 mb-2 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
          <span className="text-sm font-bold tracking-wider">{level}%</span>
        </div>
      </div>

      {/* Label */}
      <h3 className="text-lg font-semibold text-white tracking-wide group-hover:text-purple-300 transition-colors">
        {label}
      </h3>
    </div>
  );
};

// --- MAIN COMPONENT ---
const SoftSkills: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-8">
      {/* Intro Text for Soft Skills */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
          Interpersonal Skills
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Essential abilities that drive successful collaboration, leadership, and efficient project delivery in dynamic environments.
        </p>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8 place-items-center">
        {softSkills.map((skill, index) => (
          <CircularSkill
            key={index}
            index={index}
            label={skill.label}
            level={skill.level}
            icon={skill.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default SoftSkills;