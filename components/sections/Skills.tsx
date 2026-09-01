"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '@/components/providers/CursorProvider';
import { skills } from '@/lib/data';
import { Code2 } from 'lucide-react';

// Force an exact 8 nodes for a clean circular constellation
const coreSkills = skills.slice(0, 8); 

export default function Skills() {
  const { setCursorType } = useCursor();
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const radius = { md: 220, sm: 140 }; // orbit radius
  const center = { x: 300, y: 300 };   // svg coordinates center

  const handleEnter = (index: number | null) => {
    setCursorType("pointer");
    setActiveNode(index);
  };

  const handleLeave = () => {
    setCursorType("default");
    setActiveNode(null);
  };

  return (
    <section id="skills" className="py-32 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-16 relative z-20">
          <h2 className="heading-cinematic text-4xl md:text-5xl mb-4">Evolution of Skill</h2>
          <p className="text-white/50 max-w-xl mx-auto font-light">
            An interconnected ecosystem of technologies designed to support rapid scaling and robust infrastructure.
          </p>
        </div>

        <div className="relative w-full max-w-[600px] mx-auto hidden sm:flex items-center justify-center p-8">
          
          {/* Active Skill Details Display */}
          <div className="absolute top-4 left-4 z-30 pointer-events-none">
            <AnimatePresence mode="wait">
              {activeNode !== null ? (
                <motion.div 
                  key={coreSkills[activeNode].name}
                  initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                  className="glass-tier-3 p-6 rounded-2xl border-[#00f0ff]/30 shadow-[0_0_30px_rgba(0,240,255,0.2)] md:w-64"
                >
                  <div className="text-3xl mb-3">{coreSkills[activeNode].icon}</div>
                  <h3 className="text-xl font-bold text-white tracking-wide mb-1">{coreSkills[activeNode].name}</h3>
                  <div className="text-[#00f0ff] text-xs font-mono tracking-widest">{coreSkills[activeNode].category}</div>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-white/30 text-sm font-light mt-4"
                >
                  Hover a node to inspect parameters.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative w-[500px] h-[500px]">
            {/* SVG Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600">
              {coreSkills.map((_, i) => {
                const angle = (i / coreSkills.length) * Math.PI * 2;
                const x = center.x + Math.cos(angle) * radius.md;
                const y = center.y + Math.sin(angle) * radius.md;
                const isActive = activeNode === i;
                const isHoveredSystem = activeNode !== null;
                
                return (
                  <motion.line
                    key={`line-${i}`}
                    x1={center.x}
                    y1={center.y}
                    x2={x}
                    y2={y}
                    stroke={isActive ? "#00f0ff" : isHoveredSystem ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.15)"}
                    strokeWidth={isActive ? 3 : 1}
                    animate={{
                      strokeDasharray: isActive ? "5, 5" : "none",
                      strokeDashoffset: isActive ? [0, 40] : 0,
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                );
              })}
            </svg>

            {/* Central Node */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              className="absolute top-[50%] left-[50%] w-24 h-24 -mt-12 -ml-12 glass-tier-2 rounded-full border-[#7c3aed]/50 shadow-[0_0_40px_rgba(124,58,237,0.3)] flex items-center justify-center cursor-default z-20 hover:scale-105 transition-transform"
              onMouseEnter={() => handleEnter(null)}
              onMouseLeave={handleLeave}
            >
              <div className="text-center">
                <Code2 className="mx-auto text-[#7c3aed] mb-1" size={24} />
                <div className="text-[10px] font-bold tracking-widest text-[#7c3aed]">CORE</div>
              </div>
            </motion.div>

            {/* Orbiting Nodes */}
            {coreSkills.map((skill, i) => {
              const angle = (i / coreSkills.length) * Math.PI * 2;
              const isActive = activeNode === i;
              const isHoveredSystem = activeNode !== null;

              return (
                <motion.div
                  key={skill.name}
                  className={`absolute top-[50%] left-[50%] z-20 flex items-center justify-center rounded-full transition-all duration-300 ${
                    isActive ? 'w-16 h-16 -mt-8 -ml-8 glass-tier-3 border-[#00f0ff]' : 'w-12 h-12 -mt-6 -ml-6 glass-tier-1 hover:border-[#00f0ff]/50'
                  } ${isHoveredSystem && !isActive ? 'opacity-30 scale-90' : 'opacity-100 scale-100'}`}
                  initial={{
                    x: Math.cos(angle) * (radius.md + 50),
                    y: Math.sin(angle) * (radius.md + 50),
                    opacity: 0
                  }}
                  whileInView={{
                    x: Math.cos(angle) * radius.md,
                    y: Math.sin(angle) * radius.md,
                    opacity: 1
                  }}
                  animate={{
                    y: [Math.sin(angle) * radius.md, Math.sin(angle) * radius.md - 10, Math.sin(angle) * radius.md]
                  }}
                  transition={{
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
                    default: { type: "spring", stiffness: 100, damping: 20 }
                  }}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={handleLeave}
                >
                  <span className={`text-xl transition-all duration-300 ${isActive ? 'scale-125' : ''}`}>
                    {skill.icon}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Mobile Fallback Grid (Responsive Safety) */}
        <div className="sm:hidden grid grid-cols-3 gap-4">
          {skills.map((skill) => (
             <div key={skill.name} className="glass-tier-1 p-4 rounded-xl flex flex-col items-center justify-center gap-2">
                <div className="text-2xl">{skill.icon}</div>
                <div className="text-[10px] uppercase font-mono tracking-wider font-bold text-white/50 text-center">{skill.name}</div>
             </div>
          ))}
        </div>

      </div>
    </section>
  );
}
