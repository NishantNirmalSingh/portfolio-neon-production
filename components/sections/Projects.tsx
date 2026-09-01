"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { projects } from '@/lib/data';
import { ProjectCategory } from '@/types';
import { useCursor } from '@/components/providers/CursorProvider';
import { useAudio } from '@/components/providers/AudioProvider';

const categories: ProjectCategory[] = ['Full Stack', 'Web App', 'API / Backend', 'Mobile', 'Automation', 'Other'];

export default function Projects() {
  const [active, setActive] = useState<ProjectCategory | 'All'>('All');
  const { setCursorType } = useCursor();
  const { playSound } = useAudio();

  const filtered = active === 'All'
    ? projects.filter((p) => p.published)
    : projects.filter((p) => p.published && p.category === active);

  return (
    <section id="projects" className="py-32 relative z-10 w-full">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#00f0ff]/5 blur-[200px] pointer-events-none -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
           <h2 className="heading-cinematic text-4xl md:text-5xl mb-4">Gallery of Creations</h2>
           <p className="text-white/50 max-w-xl mx-auto font-light">
             Interactive artifacts showcasing high-fidelity execution across the stack.
           </p>
        </motion.div>

        {/* Filter Holographic Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {(['All', ...categories] as const).map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActive(cat);
                  playSound("click");
                }}
                onMouseEnter={() => setCursorType("pointer")}
                onMouseLeave={() => setCursorType("default")}
                className={`relative px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 overflow-hidden ${
                  isActive
                    ? 'text-black font-bold'
                    : 'glass-tier-1 text-white/50 hover:text-white hover:border-[#00f0ff]/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] to-[#7c3aed] -z-10"
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            )
          })}
        </div>

        {/* Artifact Gallery Map */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -30 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
                className="group relative glass-tier-2 rounded-3xl overflow-hidden flex flex-col hover:border-[#00f0ff]/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,240,255,0.15)]"
              >
                {/* Artifact Cover / Window */}
                <div className="h-56 relative w-full overflow-hidden border-b border-white/5">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#02020f]/80 to-transparent z-10 pointer-events-none mix-blend-multiply" />
                  <div className="absolute inset-0 bg-[#00f0ff]/5 group-hover:scale-110 transition-transform duration-700 ease-out flex items-center justify-center">
                    <div className="text-7xl opacity-20 group-hover:opacity-60 transition-opacity duration-500 drop-shadow-[0_0_20px_#00f0ff]">
                      {project.category === 'Full Stack' ? '🏗️' :
                       project.category === 'Web App' ? '🌐' :
                       project.category === 'API / Backend' ? '⚡' : '⚙️'}
                    </div>
                  </div>
                  
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-gradient-to-r from-[#00f0ff] to-[#7c3aed] rounded-full text-[9px] font-mono font-bold tracking-widest text-black shadow-[0_0_15px_#00f0ff]">
                      FEATURED
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1 relative z-20 bg-gradient-to-b from-transparent to-[#010108]/80">
                  <span className="text-[#00f0ff] text-xs font-mono tracking-widest mb-3 uppercase">
                    {project.category}
                  </span>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00f0ff] transition-colors leading-tight">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-white/50 leading-relaxed mb-6 flex-1 font-light">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-mono glass-tier-1 text-white/70 border-white/10 group-hover:border-[#00f0ff]/20 transition-colors">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2.5 py-1 rounded-md text-[10px] uppercase font-mono glass-tier-1 text-white/40">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions Matrix */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <Link
                      href={`/projects/${project.slug}`}
                      onMouseEnter={() => setCursorType("pointer")}
                      onMouseLeave={() => setCursorType("default")}
                      onClick={() => playSound("click")}
                      className="flex items-center gap-2 text-sm text-[#00f0ff] font-bold group/link"
                    >
                      <span className="relative">
                        Initialize
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-[#00f0ff] group-hover/link:w-full transition-all duration-300" />
                      </span> 
                      <ArrowRight size={16} className="group-hover/link:translate-x-1 group-hover/link:text-white transition-all shadow-sm" />
                    </Link>
                    
                    <div className="flex gap-2">
                       {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full glass-tier-1 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                          onMouseEnter={() => setCursorType("pointer")}
                          onMouseLeave={() => setCursorType("default")}
                        >
                          <Github size={14} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full glass-tier-1 flex items-center justify-center text-white/40 hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 transition-colors"
                          onMouseEnter={() => setCursorType("pointer")}
                          onMouseLeave={() => setCursorType("default")}
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="w-full text-center py-24 text-white/30 font-mono text-sm tracking-widest uppercase">
            No artifacts detected in this sector.
          </div>
        )}
      </div>
    </section>
  );
}
