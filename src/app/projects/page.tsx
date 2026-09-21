import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Проекты",
  description: "Кейсы по системному анализу, API, данным и тестированию.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="section-shell listing-page">
      <div className="listing-intro">
        <p className="eyebrow">Архив решений</p>
        <h1>Проекты</h1>
        <p>
          Разбор задачи, принятых решений и проверяемых артефактов — от процесса до API и модели
          данных.
        </p>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project._id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
