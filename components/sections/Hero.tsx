"use client";

import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCursor } from '@/components/providers/CursorProvider';
import { useAudio } from '@/components/providers/AudioProvider';
import { useState, useEffect } from 'react';

const socials = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:your@email.com', label: 'Email' },
];

export default function Hero() {
  const { setCursorType } = useCursor();
  const { playSound } = useAudio();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handlePointerEnter = () => setCursorType("pointer");
  const handlePointerLeave = () => setCursorType("default");

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Interactive 3D Element Background */}
      {mounted && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ perspective: 1000 }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15, rotateX: [0, 360], rotateY: [0, 360] }}
            transition={{ opacity: { duration: 2 }, rotateX: { duration: 40, repeat: Infinity, ease: "linear" }, rotateY: { duration: 30, repeat: Infinity, ease: "linear" } }}
            className="w-[300px] h-[300px] md:w-[600px] md:h-[600px]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute inset-0 border border-[#00f0ff] rounded-[30%] shadow-[0_0_80px_rgba(0,240,255,0.2)]" style={{ transform: 'translateZ(100px)' }} />
            <div className="absolute inset-0 border border-[#7c3aed] rounded-full shadow-[0_0_80px_rgba(124,58,237,0.2)] rotate-45" style={{ transform: 'translateZ(-50px) rotateX(45deg)' }} />
            <div className="absolute inset-0 border-2 border-white/5 rounded-lg" style={{ transform: 'translateZ(0px) rotateY(45deg)' }} />
          </motion.div>
        </div>
      )}

      {/* Radial Atmospheric Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.15),transparent_70%)] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-32 mt-16">
        
        {/* Subtle Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium mb-12 glass-tier-1 text-[#00f0ff] tracking-wide"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_#4ade80]" />
          INITIALIZING CONNECTION
        </motion.div>

        {/* Cinematic Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
          className="heading-cinematic mb-8"
        >
          Where Code Meets <br className="hidden md:block"/>
          <span className="bg-gradient-to-r from-[#00f0ff] via-[#7c3aed] to-[#f72585] text-transparent bg-clip-text">Imagination.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Full-stack developer crafting intelligent, immersive, and high-performance digital experiences.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        >
          <Link 
            href="/hire-me" 
            onMouseEnter={handlePointerEnter}
            onMouseLeave={handlePointerLeave}
            onClick={() => playSound("click")}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 hover:bg-[#00f0ff]/20 hover:border-[#00f0ff]/50 transition-all duration-500 overflow-hidden"
          >
            {/* Hover Glow Background */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#00f0ff]/0 via-[#00f0ff]/10 to-[#00f0ff]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            Start a Project
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <a
            href="#projects"
            onMouseEnter={handlePointerEnter}
            onMouseLeave={handlePointerLeave}
            className="px-8 py-4 text-sm font-medium text-white/60 hover:text-white transition-colors duration-300"
          >
            Explore Artifacts
          </a>
        </motion.div>

        {/* Social Dock */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              onMouseEnter={handlePointerEnter}
              onMouseLeave={handlePointerLeave}
              className="w-12 h-12 rounded-2xl glass-tier-2 interactive-hover flex items-center justify-center text-white/50 hover:text-[#00f0ff]"
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Deep Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-var(--bg-deep) to-transparent pointer-events-none" />
    </section>
  );
}
