"use client";

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, ArrowRight, Code2 } from 'lucide-react';
import Link from 'next/link';
import { useCursor } from '@/components/providers/CursorProvider';
import { useAudio } from '@/components/providers/AudioProvider';

const links = [
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/yourhandle',
    href: 'https://github.com/yourhandle',
    color: 'hover:text-white',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/yourname',
    href: 'https://linkedin.com/in/yourname',
    color: 'hover:text-[#0077b5]',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'your@email.com',
    href: 'mailto:your@email.com',
    color: 'hover:text-[#00f0ff]',
  },
  {
    icon: Phone,
    label: 'Phone / WhatsApp',
    value: '+91 99054 90862',
    href: 'https://wa.me/919905490862',
    color: 'hover:text-[#4ade80]',
  },
];

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
];

export default function Footer() {
  const { setCursorType } = useCursor();
  const { playSound } = useAudio();

  return (
    <footer id="contact" className="relative pt-32 pb-8 overflow-hidden z-10 w-full">
      {/* Top Holographic Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-[#00f0ff]/50 to-transparent" />

      {/* CTA Core */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-24 relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-3xl p-12 md:p-20 text-center glass-tier-2 overflow-hidden interactive-hover group"
        >
          {/* Internal Reaction Core */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00f0ff]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative z-10">
            <h2 className="heading-cinematic text-4xl md:text-6xl mb-6">
              Initialize the Next <br/>
              <span className="bg-gradient-to-r from-[#00f0ff] to-[#7c3aed] text-transparent bg-clip-text">Phase.</span>
            </h2>
            <p className="text-white/50 mb-10 max-w-lg mx-auto font-light leading-relaxed">
              Available for ambitious freelance projects. Let&apos;s merge cutting-edge tech with premium design.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/hire-me" 
                onClick={() => playSound("click")}
                onMouseEnter={() => setCursorType("pointer")}
                onMouseLeave={() => setCursorType("default")}
                className="relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#00f0ff] to-[#7c3aed] text-black hover:opacity-90 active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.4)]"
              >
                Transmit Signal
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          {/* Brand Identity */}
          <div className="md:col-span-5">
            <Link 
               href="/" 
               className="flex items-center gap-3 mb-6 group inline-flex"
               onMouseEnter={() => setCursorType("pointer")}
               onMouseLeave={() => setCursorType("default")}
            >
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f0ff] to-[#7c3aed] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                <Code2 size={20} className="text-black" />
              </span>
              <span className="neon-text font-mono font-bold text-xl text-white group-hover:text-[#00f0ff] transition-colors">dev.port</span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed font-light max-w-sm">
              Architecting high-performance digital environments. Bringing ideas to life via code and imagination.
            </p>
          </div>

          {/* Navigation Matrix */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono font-bold text-white/70 mb-6 uppercase tracking-widest">Sys_Nav</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/40 hover:text-[#00f0ff] transition-colors font-light"
                    onMouseEnter={() => setCursorType("pointer")}
                    onMouseLeave={() => setCursorType("default")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Comms Link */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono font-bold text-white/70 mb-6 uppercase tracking-widest">Comms_Link</h4>
            <ul className="space-y-4">
              {links.map(({ icon: Icon, label, value, href, color }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 text-sm text-white/40 transition-colors font-light ${color}`}
                    onMouseEnter={() => setCursorType("pointer")}
                    onMouseLeave={() => setCursorType("default")}
                  >
                    <Icon size={16} className="flex-shrink-0" />
                    <span className="truncate">{value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Global Footer System Info */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 font-light">
            © {new Date().getFullYear()} dev.port. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-white/30 tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_5px_#00f0ff]" />
            SYSTEM_ONLINE
          </div>
        </div>
      </div>
    </footer>
  );
}
