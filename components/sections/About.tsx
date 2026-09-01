"use client";

import { motion } from 'framer-motion';
import { Database, Globe, Cpu, Cloud, Sparkles } from 'lucide-react';
import { useCursor } from '@/components/providers/CursorProvider';

const floatingIcons = [
  { icon: Globe, label: "Web", delay: 0 },
  { icon: Cpu, label: "AI", delay: 1.5 },
  { icon: Database, label: "Backend", delay: 3 },
  { icon: Cloud, label: "Cloud", delay: 4.5 },
];

export default function About() {
  const { setCursorType } = useCursor();

  return (
    <section id="about" className="py-32 relative z-10">
      
      {/* Aesthetic Section Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#00f0ff]/50 to-transparent" />
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#7c3aed]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Identity Story Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <Sparkles size={18} className="text-[#00f0ff]" />
              <h2 className="text-[#00f0ff] font-mono text-sm tracking-widest uppercase">
                Identity
              </h2>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white/90">
              I Engineer{' '}
              <span className="bg-gradient-to-r from-[#00f0ff] to-[#7c3aed] bg-clip-text text-transparent">
                Digital Realities.
              </span>
            </h3>

            <div className="glass-tier-2 rounded-3xl p-8 space-y-6 text-white/60 leading-relaxed font-light interactive-hover">
              <p>
                I am a full-stack developer obsessed with the intersection of high-performance engineering and stunning interactive design. My work revolves around treating the digital canvas as a living environment.
              </p>
              <p>
                From architecting scalable cloud backends and training machine learning pipelines, to handcrafting pixel-perfect CSS physics — I manage the complete lifecycle of a product.
              </p>
              <p>
                My philosophy is simple: <strong className="text-white font-medium">Maximum visual impact with zero performance cost.</strong> 
              </p>
            </div>

            <div className="flex gap-4 mt-2">
              <a 
                href="/hire-me" 
                onMouseEnter={() => setCursorType("pointer")}
                onMouseLeave={() => setCursorType("default")}
                className="px-6 py-3 rounded-xl glass-tier-2 text-white hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 border border-white/10 hover:border-[#00f0ff]/40 transition-all duration-300"
              >
                Collaborate
              </a>
            </div>
          </motion.div>

          {/* Floating Visual Element (Glowing Digital Crystal System) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative h-[400px] md:h-[500px] flex items-center justify-center pointer-events-none"
          >
            {/* Core Crystal */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="relative w-48 h-48 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#7c3aed]/20 to-[#00f0ff]/20 blur-xl" />
              <div className="w-24 h-24 rotate-45 glass-tier-1 border border-[#00f0ff]/50 shadow-[0_0_30px_rgba(0,240,255,0.3)] flex items-center justify-center backdrop-blur-md">
                <div className="w-16 h-16 border border-[#7c3aed]/50 shadow-[inset_0_0_20px_rgba(124,58,237,0.4)]" />
              </div>
            </motion.div>

            {/* Orbiting Symbols */}
            {floatingIcons.map((node, i) => {
              const radius = 140; // Orbit distance
              return (
                <motion.div
                  key={node.label}
                  animate={{ rotate: [0, 360] }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: -node.delay // Stagger starting positions along the orbit ring
                  }}
                  className="absolute w-[280px] h-[280px] flex items-center justify-between"
                  style={{ transformOrigin: "center center" }}
                >
                  <motion.div 
                    animate={{ rotate: [360, 0] }} // Counter-rotate so icons stay upright
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 glass-tier-3 rounded-full flex items-center justify-center border-[#00f0ff]/30 shadow-[0_0_15px_rgba(0,240,255,0.2)] ml-[-24px]"
                  >
                    <node.icon size={20} className="text-[#00f0ff]" />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
