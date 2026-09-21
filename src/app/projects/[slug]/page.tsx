import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Code2, ExternalLink } from "lucide-react";
import { ArtifactBlock } from "@/components/artifact-block";
import { getProject, getProjects } from "@/lib/content";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (await getProjects()).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.excerpt };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <article className="case-page" style={{ "--project-accent": project.accent } as React.CSSProperties}>
      <header className="case-hero section-shell">
        <Link className="back-link" href="/projects">
          <ArrowLeft size={16} /> Все проекты
        </Link>
        <div className="case-title-row">
          <div>
            <p className="eyebrow">{project.eyebrow}</p>
            <h1>{project.title}</h1>
          </div>
          <span className="case-year">{project.year}</span>
        </div>
        <p className="case-lead">{project.excerpt}</p>
        <div className="case-meta">
          <div>
            <span>Роль</span>
            <p>{project.role}</p>
          </div>
          <div>
            <span>Инструменты</span>
            <div className="tag-list">
              {project.skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </div>
          <div className="case-links">
            {project.repoUrl && (
              <a href={project.repoUrl} rel="noreferrer" target="_blank">
                <Code2 size={17} /> GitHub
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} rel="noreferrer" target="_blank">
                <ExternalLink size={17} /> Демо
              </a>
            )}
          </div>
        </div>
        {project.isDemo && (
          <div className="demo-notice">
            <strong>Демонстрационный кейс.</strong> Создан для портфолио и показывает подход к
            проектированию, а не коммерческий опыт.
          </div>
        )}
      </header>

      <section className="case-summary section-shell">
        <article>
          <span>01 / Проблема</span>
          <h2>Исходная ситуация</h2>
          <p>{project.problem}</p>
        </article>
        <article>
          <span>02 / Решение</span>
          <h2>Что спроектировано</h2>
          <p>{project.solution}</p>
        </article>
      </section>

      <section className="artifacts-list section-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Артефакты</p>
            <h2>Решение изнутри</h2>
          </div>
        </div>
        {project.artifacts.map((artifact, index) => (
          <ArtifactBlock key={artifact._key} artifact={artifact} index={index} />
        ))}
      </section>
    </article>
  );
}
