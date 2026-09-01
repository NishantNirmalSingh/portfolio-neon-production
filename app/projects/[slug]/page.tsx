import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink, Calendar, Tag } from 'lucide-react';
import { projects } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: project.title,
    description: project.shortDescription,
  };
}

export default function ProjectDetail({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-[#02020f]">
      <Navbar />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[#00f0ff] mb-8 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Hero image */}
        <div className="h-64 md:h-80 rounded-2xl bg-gradient-to-br from-[rgba(0,240,255,0.07)] to-[rgba(124,58,237,0.1)] flex items-center justify-center border border-white/[0.06] mb-8 text-7xl">
          {project.category === 'Full Stack' ? '🏗️' :
           project.category === 'Web App' ? '🌐' :
           project.category === 'API / Backend' ? '⚡' : '⚙️'}
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="tag">{project.category}</span>
          {project.featured && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-[#00f0ff] to-[#7c3aed] text-black">
              FEATURED
            </span>
          )}
          <span className="ml-auto flex items-center gap-1 text-xs text-white/30">
            <Calendar size={12} />
            {project.createdAt}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-white mb-4">{project.title}</h1>
        <p className="text-lg text-white/50 mb-8 leading-relaxed">{project.shortDescription}</p>

        {/* Links */}
        <div className="flex gap-3 mb-10">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline gap-2">
              <Github size={16} /> View Source
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary gap-2">
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
        </div>

        {/* Full description */}
        <div className="glass rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-3">About This Project</h2>
          <p className="text-white/55 leading-relaxed">{project.fullDescription}</p>
        </div>

        {/* Tech stack */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Tag size={18} className="text-[#00f0ff]" /> Technologies Used
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-sm font-mono bg-[rgba(0,240,255,0.06)] text-[#00f0ff] border border-[rgba(0,240,255,0.15)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
