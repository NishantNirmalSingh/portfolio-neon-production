"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '@/components/providers/CursorProvider';

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Services', href: '/#services' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setCursorType } = useCursor();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out flex justify-center ${
        scrolled ? 'pt-4' : 'pt-6'
      }`}
    >
      <motion.div
        layout
        className={`w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 rounded-2xl ${
          scrolled ? 'w-[95%] md:w-[80%] glass-tier-2 border-[rgba(0,240,255,0.2)] py-2' : 'w-full py-4 border-transparent bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg group"
            onMouseEnter={() => setCursorType("pointer")}
            onMouseLeave={() => setCursorType("default")}
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#7c3aed] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <Code2 size={16} className="text-black" />
            </span>
            <span className="neon-text font-mono tracking-tight text-white group-hover:text-[#00f0ff] transition-colors">dev.port</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onMouseEnter={() => setCursorType("pointer")}
                onMouseLeave={() => setCursorType("default")}
                className="px-4 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/[0.05] transition-all duration-300 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link 
              href="/hire-me" 
              onMouseEnter={() => setCursorType("pointer")}
              onMouseLeave={() => setCursorType("default")}
              className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#00f0ff] to-[#7c3aed] text-black hover:opacity-90 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              Hire Me
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="md:hidden absolute top-[100%] left-4 right-4 mt-2 glass-tier-3 rounded-2xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm text-white/70 hover:text-[#00f0ff] hover:bg-white/[0.06] transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2">
                <Link
                  href="/hire-me"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary w-full justify-center shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                >
                  Hire Me
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
