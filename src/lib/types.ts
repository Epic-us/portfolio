export type ArtifactType =
  | "architecture"
  | "api"
  | "process"
  | "data"
  | "prototype"
  | "testing";

export interface ProjectArtifact {
  _key: string;
  type: ArtifactType;
  title: string;
  description: string;
  code?: string;
  url?: string;
}

export interface PortfolioProject {
  _id: string;
  title: string;
  slug: string;
  eyebrow: string;
  excerpt: string;
  problem: string;
  solution: string;
  role: string;
  status: "draft" | "published";
  featured: boolean;
  isDemo: boolean;
  skills: string[];
  repoUrl?: string;
  demoUrl?: string;
  year: string;
  accent: string;
  artifacts: ProjectArtifact[];
}

export interface GitHubRepository {
  name: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
  url: string;
}

export interface SiteProfile {
  name: string;
  professionalTitle: string;
  availability: string;
  about: string;
  email?: string;
  telegramUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  seoTitle: string;
  seoDescription: string;
}
