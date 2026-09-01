import { Project, Skill, Service } from '@/types';

// ============================================================
// PORTFOLIO PROJECTS — Demo data (replace with Firestore data)
// ============================================================
export const projects: Project[] = [
  {
    id: '1',
    title: 'CCL IT Service Management System',
    slug: 'ccl-it-service-management',
    shortDescription:
      'A full-featured IT helpdesk and asset management system with role-based access, ticket tracking, and a Kinetic Terminal dark UI.',
    fullDescription: `An end-to-end IT service management platform built for CCL. Features include multi-role authentication (admin, IT staff, user), ticket submission and lifecycle tracking, asset inventory management, and a rich analytics dashboard. The UI uses a custom dark "Kinetic Terminal" aesthetic with glassmorphism panels.`,
    category: 'Full Stack',
    technologies: ['React', 'Node.js', 'MySQL', 'Express', 'JWT', 'Render', 'Vercel'],
    images: [],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
    published: true,
    createdAt: '2026-08-01',
  },
  {
    id: '2',
    title: 'Ajrasakha Voice Intelligence Platform',
    slug: 'ajrasakha-voice-ai',
    shortDescription:
      'A multilingual voice AI platform with real-time audio visualization, glassmorphism UI, and advanced animation effects.',
    fullDescription: `A stunning multilingual voice AI interface featuring real-time audio waveform visualization, dynamic glassmorphism UI, micro-animations, and a fully interactive experience. Built with cutting-edge web audio APIs and premium design patterns.`,
    category: 'Web App',
    technologies: ['React', 'Web Audio API', 'Python', 'FastAPI', 'WebSockets'],
    images: [],
    githubUrl: 'https://github.com',
    featured: true,
    published: true,
    createdAt: '2026-02-01',
  },
  {
    id: '3',
    title: 'NLP Preprocessing Toolkit',
    slug: 'nlp-preprocessing-toolkit',
    shortDescription:
      'A Streamlit-based NLP application with TF-IDF implementation from scratch using regex-based tokenization.',
    fullDescription: `An interactive NLP preprocessing toolkit built with Streamlit. Implements TF-IDF calculation from scratch using pure Python and regex, supports multiple documents, and provides visual breakdowns of term frequencies and scores.`,
    category: 'Other',
    technologies: ['Python', 'Streamlit', 'NLTK', 'Regex', 'Pandas'],
    images: [],
    githubUrl: 'https://github.com',
    featured: false,
    published: true,
    createdAt: '2026-01-01',
  },
  {
    id: '4',
    title: 'Lottery Prediction Web App',
    slug: 'lottery-prediction-app',
    shortDescription:
      'A machine-learning web application that predicts lottery numbers using historical CSV data and probabilistic models.',
    fullDescription: `A web application that ingests historical lottery draw data from CSV, trains statistical and ML models, and generates predictions. Features interactive result visualization and continuous data retraining capability.`,
    category: 'Web App',
    technologies: ['Python', 'Scikit-learn', 'Streamlit', 'Pandas', 'NumPy'],
    images: [],
    githubUrl: 'https://github.com',
    featured: false,
    published: true,
    createdAt: '2025-12-01',
  },
];

// ============================================================
// SKILLS
// ============================================================
export const skills: Skill[] = [
  // Frontend
  { name: 'React', icon: '⚛️', category: 'Frontend', level: 'Expert' },
  { name: 'Next.js', icon: '▲', category: 'Frontend', level: 'Expert' },
  { name: 'TypeScript', icon: '🔷', category: 'Frontend', level: 'Advanced' },
  { name: 'Tailwind CSS', icon: '🎨', category: 'Frontend', level: 'Expert' },
  { name: 'Framer Motion', icon: '🎬', category: 'Frontend', level: 'Advanced' },
  // Backend
  { name: 'Node.js', icon: '🟢', category: 'Backend', level: 'Expert' },
  { name: 'Express.js', icon: '🚂', category: 'Backend', level: 'Expert' },
  { name: 'Python', icon: '🐍', category: 'Backend', level: 'Expert' },
  { name: 'FastAPI', icon: '⚡', category: 'Backend', level: 'Advanced' },
  { name: 'REST APIs', icon: '🔗', category: 'Backend', level: 'Expert' },
  // Database
  { name: 'MySQL', icon: '🐬', category: 'Database', level: 'Advanced' },
  { name: 'PostgreSQL', icon: '🐘', category: 'Database', level: 'Advanced' },
  { name: 'Firebase', icon: '🔥', category: 'Database', level: 'Advanced' },
  { name: 'MongoDB', icon: '🍃', category: 'Database', level: 'Intermediate' },
  // DevOps
  { name: 'Git / GitHub', icon: '🐙', category: 'DevOps', level: 'Expert' },
  { name: 'Vercel', icon: '▲', category: 'DevOps', level: 'Advanced' },
  { name: 'Render', icon: '🚀', category: 'DevOps', level: 'Advanced' },
  { name: 'Docker', icon: '🐳', category: 'DevOps', level: 'Intermediate' },
  // Tools
  { name: 'VS Code', icon: '💙', category: 'Tools', level: 'Expert' },
  { name: 'Figma', icon: '🎭', category: 'Tools', level: 'Intermediate' },
  { name: 'Postman', icon: '📮', category: 'Tools', level: 'Expert' },
];

// ============================================================
// SERVICES
// ============================================================
export const services: Service[] = [
  {
    title: 'Web Application Development',
    description:
      'Full-stack web apps built with modern frameworks — from MVPs to production-grade systems with auth, databases, and admin panels.',
    icon: '🌐',
    features: ['Next.js / React frontends', 'Node.js / FastAPI backends', 'Database design & integration', 'Admin dashboards'],
  },
  {
    title: 'API Design & Integration',
    description:
      'RESTful and GraphQL APIs, third-party integrations (payment gateways, CRMs, cloud services), and microservice architecture.',
    icon: '🔗',
    features: ['REST & GraphQL APIs', 'Third-party integrations', 'Authentication & security', 'API documentation'],
  },
  {
    title: 'Automation & Scripting',
    description:
      'Custom automation scripts, bots, data pipelines, and workflow tools that save hours of repetitive work.',
    icon: '⚙️',
    features: ['Web scraping & crawling', 'Data pipelines', 'Task automation', 'Report generation'],
  },
  {
    title: 'UI/UX Frontend Development',
    description:
      'Pixel-perfect, animated, responsive interfaces that make a great impression — from landing pages to complex dashboards.',
    icon: '✨',
    features: ['Premium design systems', 'Micro-animations', 'Responsive layouts', 'Performance optimization'],
  },
];
