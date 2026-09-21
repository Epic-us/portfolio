import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioProject } from "@/lib/types";

interface ProjectCardProps {
  project: PortfolioProject;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      className="project-card"
      href={`/projects/${project.slug}`}
      style={{ "--project-accent": project.accent } as React.CSSProperties}
    >
      <div className="project-card-topline">
        <span>0{index + 1}</span>
        <span>{project.year}</span>
      </div>
      <div className="project-card-body">
        <p className="eyebrow">{project.eyebrow}</p>
        <h3>{project.title}</h3>
        <p>{project.excerpt}</p>
      </div>
      <div className="tag-list">
        {project.skills.slice(0, 4).map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
      <div className="project-card-action">
        Открыть кейс <ArrowUpRight size={18} />
      </div>
    </Link>
  );
}
