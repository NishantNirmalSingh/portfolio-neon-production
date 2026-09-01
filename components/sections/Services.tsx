"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { services } from '@/lib/data';
import { useCursor } from '@/components/providers/CursorProvider';
import { useAudio } from '@/components/providers/AudioProvider';

export default function Services() {
  const { setCursorType } = useCursor();
  const { playSound } = useAudio();

  return (
    <section id="services" className="py-32 relative z-10">
      
      {/* Magical Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7c3aed]/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-[#7c3aed]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-2/3 right-0 w-96 h-96 bg-[#00f0ff]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full glass-tier-1 text-xs font-mono text-[#7c3aed] uppercase tracking-widest border border-[#7c3aed]/30 shadow-[0_0_10px_rgba(124,58,237,0.2)]">
            Capabilities
          </div>
          <h2 className="heading-cinematic text-4xl md:text-5xl mb-4">Engineering Services</h2>
          <p className="text-white/50 max-w-xl mx-auto font-light">
            End-to-end digital architecture designed to scale seamlessly. 
          </p>
        </motion.div>

        {/* Floating Magical Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              animate={{ y: [0, -10, 0] }}
              style={{ transition: `y ${3 + (i % 2)}s ease-in-out infinite` }} // Staggered gentle float
              className="glass-tier-2 rounded-3xl p-8 group relative overflow-hidden"
              onMouseEnter={() => setCursorType("text")} // Or pointer if they become clickable later
              onMouseLeave={() => setCursorType("default")}
            >
              {/* Internal Holographic Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/0 to-[#7c3aed]/0 group-hover:from-[#00f0ff]/5 group-hover:to-[#7c3aed]/10 transition-colors duration-500 opacity-50" />
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Glowing Icon Container */}
                <div className="w-16 h-16 rounded-2xl glass-tier-3 flex items-center justify-center border border-[#00f0ff]/20 shadow-[inset_0_0_20px_rgba(0,240,255,0.1)] group-hover:shadow-[inset_0_0_20px_rgba(0,240,255,0.3),_0_0_15px_rgba(0,240,255,0.2)] group-hover:scale-110 transition-all duration-500 mb-6">
                  <span className="text-4xl filter drop-shadow-[0_0_8px_#00f0ff]">{service.icon}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">{service.title}</h3>
                
                <p className="text-sm text-white/50 leading-relaxed flex-1 font-light mb-6">
                  {service.description}
                </p>

                {/* Sub Features as Glowing Points */}
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-white/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
                      <span className="font-light">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Holographic CTA */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.4 }}
           className="text-center"
        >
          <Link 
            href="/hire-me" 
            onClick={() => playSound("click")}
            onMouseEnter={() => setCursorType("pointer")}
            onMouseLeave={() => setCursorType("default")}
            className="group relative inline-flex items-center gap-4 px-10 py-4 glass-tier-3 rounded-full text-[#7c3aed] font-bold text-sm tracking-widest uppercase hover:text-[#00f0ff] hover:border-[#00f0ff]/50 transition-all duration-500 shadow-[0_0_30px_rgba(124,58,237,0.2)] hover:shadow-[0_0_50px_rgba(0,240,255,0.4)]"
          >
            Initiate Protocol
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
