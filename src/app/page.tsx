import Link from "next/link";
import { ArrowDown, ArrowRight, Braces, Database, GitBranch, Workflow } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/lib/content";

const competencies = [
  {
    icon: Workflow,
    title: "Требования и процессы",
    text: "Перевожу бизнес-задачи в однозначные требования, сценарии и модели процессов.",
  },
  {
    icon: Braces,
    title: "API и интеграции",
    text: "Проектирую REST-контракты, статусы ошибок и взаимодействие между системами.",
  },
  {
    icon: Database,
    title: "Данные",
    text: "Создаю логические модели, проверяю гипотезы SQL-запросами и учитываю аудит.",
  },
  {
    icon: GitBranch,
    title: "Проверка решений",
    text: "Связываю требования с критериями приёмки, тест-кейсами и наблюдаемыми результатами.",
  },
];

export default async function HomePage() {
  const projects = (await getProjects()).filter((project) => project.featured).slice(0, 3);

  return (
    <>
      <section className="hero section-shell">
        <div className="hero-kicker">
          <span className="status-dot" /> Открыт к проектам и предложениям
        </div>
        <div className="hero-layout">
          <div>
            <p className="eyebrow">Портфолио системного аналитика</p>
            <h1>
              Из хаоса требований —
              <span> в работающую систему.</span>
            </h1>
          </div>
          <div className="hero-aside">
            <p>
              Проектирую API, структуры данных и пользовательские сценарии. Документирую решения
              так, чтобы ими одинаково понимали бизнес, разработка и тестирование.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/projects">
                Смотреть проекты <ArrowRight size={17} />
              </Link>
              <a className="button button-secondary" href="#about">
                Обо мне <ArrowDown size={17} />
              </a>
            </div>
          </div>
        </div>
        <div className="hero-terminal" aria-label="Основные направления работы">
          <div className="terminal-bar">
            <span /> <span /> <span />
            <p>analyst.profile</p>
          </div>
          <div className="terminal-content">
            <p><span>role</span>: system_analyst</p>
            <p><span>focus</span>: [requirements, api, data, qa]</p>
            <p><span>principle</span>: &quot;clarity over complexity&quot;</p>
            <p className="terminal-cursor"><span>status</span>: building_portfolio_</p>
          </div>
        </div>
      </section>

      <section className="section-shell section-block" id="projects">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Избранные кейсы</p>
            <h2>Решения, которые можно проверить</h2>
          </div>
          <Link className="text-link" href="/projects">
            Все проекты <ArrowRight size={16} />
          </Link>
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="section-shell section-block" id="about">
        <div className="section-heading about-heading">
          <div>
            <p className="eyebrow">Как я работаю</p>
            <h2>Не просто документы — связная модель решения</h2>
          </div>
          <p>
            Каждый артефакт отвечает на конкретный вопрос и связан с остальными: требование — со
            сценарием, сценарий — с API и данными, а результат — с проверкой.
          </p>
        </div>
        <div className="competency-grid">
          {competencies.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className="competency-card">
              <div className="competency-number">0{index + 1}</div>
              <Icon size={25} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell contact-band">
        <div>
          <p className="eyebrow">Следующий шаг</p>
          <h2>Обсудим задачу?</h2>
        </div>
        <a className="button button-light" href="mailto:hello@example.com">
          Написать мне <ArrowRight size={17} />
        </a>
      </section>
    </>
  );
}
