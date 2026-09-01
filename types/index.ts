// ============================================================
// Core data types for the freelancing website
// ============================================================

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: ProjectCategory;
  technologies: string[];
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt?: string;
}

export type ProjectCategory =
  | 'Web App'
  | 'API / Backend'
  | 'Mobile'
  | 'Automation'
  | 'Full Stack'
  | 'Other';

export interface ProjectRequest {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectName: string;
  projectDescription: string;
  projectType: ProjectType;
  attachmentUrl?: string;
  attachmentName?: string;
  estimatedBudget: BudgetRange;
  targetDeadline: string;
  status: RequestStatus;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ProjectType =
  | 'web-app'
  | 'api'
  | 'mobile'
  | 'automation'
  | 'fullstack'
  | 'other';

export type BudgetRange =
  | 'under-10k'
  | '10k-50k'
  | '50k-1L'
  | '1L-5L'
  | 'above-5L'
  | 'discuss';

export type RequestStatus =
  | 'NEW'
  | 'REVIEWING'
  | 'CONTACTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'ARCHIVED'
  | 'REJECTED';

export interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
  level: 'Expert' | 'Advanced' | 'Intermediate';
}

export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools';

export interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}
