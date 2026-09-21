import config from "@payload-config";
import { getPayload } from "payload";
import { fallbackProjects } from "@/lib/fallback-data";
import type { ArtifactType, PortfolioProject, SiteProfile } from "@/lib/types";

const fallbackProfile: SiteProfile = {
  name: "System Analyst",
  professionalTitle: "Портфолио системного аналитика",
  availability: "Открыт к проектам и предложениям",
  about:
    "Проектирую API, структуры данных и пользовательские сценарии. Документирую решения так, чтобы их одинаково понимали бизнес, разработка и тестирование.",
  email: "hello@example.com",
  githubUrl: "https://github.com/Epic-us/portfolio",
  seoTitle: "Портфолио системного аналитика",
  seoDescription:
    "Проекты по системному анализу: требования, REST API, модели данных, бизнес-процессы и тестирование.",
};

type RelatedSkill = number | string | { title?: string | null };

interface PayloadArtifact {
  id?: string | null;
  artifactType?: ArtifactType | null;
  title?: string | null;
  description?: string | null;
  code?: string | null;
  externalUrl?: string | null;
  file?: number | string | { url?: string | null } | null;
}

interface PayloadProject {
  id: number | string;
  title?: string | null;
  slug?: string | null;
  eyebrow?: string | null;
  excerpt?: string | null;
  caseStudy?: {
    problem?: string | null;
    solution?: string | null;
    role?: string | null;
  } | null;
  skills?: RelatedSkill[] | null;
  artifacts?: PayloadArtifact[] | null;
  repoUrl?: string | null;
  demoUrl?: string | null;
  year?: number | null;
  accent?: string | null;
  featured?: boolean | null;
  isDemo?: boolean | null;
  _status?: "draft" | "published" | null;
}

function mapProject(document: PayloadProject): PortfolioProject | null {
  if (!document.title || !document.slug || !document.eyebrow || !document.excerpt) return null;

  const caseStudy = document.caseStudy;
  return {
    _id: String(document.id),
    title: document.title,
    slug: document.slug,
    eyebrow: document.eyebrow,
    excerpt: document.excerpt,
    problem: caseStudy?.problem ?? "",
    solution: caseStudy?.solution ?? "",
    role: caseStudy?.role ?? "",
    status: document._status === "draft" ? "draft" : "published",
    featured: Boolean(document.featured),
    isDemo: document.isDemo ?? true,
    skills: (document.skills ?? [])
      .map((skill) => (typeof skill === "object" ? skill.title : null))
      .filter((skill): skill is string => Boolean(skill)),
    repoUrl: document.repoUrl ?? undefined,
    demoUrl: document.demoUrl ?? undefined,
    year: String(document.year ?? new Date().getFullYear()),
    accent: document.accent ?? "#6ee7b7",
    artifacts: (document.artifacts ?? [])
      .filter(
        (artifact): artifact is PayloadArtifact & {
          artifactType: ArtifactType;
          title: string;
          description: string;
        } => Boolean(artifact.artifactType && artifact.title && artifact.description),
      )
      .map((artifact, index) => ({
        _key: artifact.id ?? `${document.id}-${index}`,
        type: artifact.artifactType,
        title: artifact.title,
        description: artifact.description,
        code: artifact.code ?? undefined,
        url:
          artifact.externalUrl ??
          (typeof artifact.file === "object" ? artifact.file?.url ?? undefined : undefined),
      })),
  };
}

async function loadPayload() {
  if (!process.env.DATABASE_URL) return null;
  return getPayload({ config });
}

export async function getSiteProfile(): Promise<SiteProfile> {
  try {
    const payload = await loadPayload();
    if (!payload) return fallbackProfile;

    const settings = await payload.findGlobal({
      slug: "site-settings",
      depth: 1,
      fallbackLocale: "en",
      locale: "ru",
      overrideAccess: false,
    });
    return {
      name: settings.name || fallbackProfile.name,
      professionalTitle: settings.professionalTitle || fallbackProfile.professionalTitle,
      availability: settings.availability || fallbackProfile.availability,
      about: settings.about || fallbackProfile.about,
      email: settings.email || fallbackProfile.email,
      telegramUrl: settings.telegramUrl || undefined,
      githubUrl: settings.githubUrl || fallbackProfile.githubUrl,
      linkedinUrl: settings.linkedinUrl || undefined,
      seoTitle: settings.seoTitle || fallbackProfile.seoTitle,
      seoDescription: settings.seoDescription || fallbackProfile.seoDescription,
    };
  } catch (error) {
    console.error("Failed to load site settings from Payload", error);
    return fallbackProfile;
  }
}

export async function getProjects(): Promise<PortfolioProject[]> {
  try {
    const payload = await loadPayload();
    if (!payload) return fallbackProjects;

    const result = await payload.find({
      collection: "projects",
      depth: 2,
      fallbackLocale: "en",
      limit: 100,
      locale: "ru",
      overrideAccess: false,
      sort: "-year",
      where: { _status: { equals: "published" } },
    });
    const projects = result.docs
      .map((document) => mapProject(document as unknown as PayloadProject))
      .filter((project): project is PortfolioProject => Boolean(project));
    return projects.length > 0 ? projects : fallbackProjects;
  } catch (error) {
    console.error("Failed to load projects from Payload", error);
    return fallbackProjects;
  }
}

export async function getProject(slug: string): Promise<PortfolioProject | null> {
  try {
    const payload = await loadPayload();
    if (!payload) return fallbackProjects.find((project) => project.slug === slug) ?? null;

    const result = await payload.find({
      collection: "projects",
      depth: 2,
      fallbackLocale: "en",
      limit: 1,
      locale: "ru",
      overrideAccess: false,
      where: {
        and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }],
      },
    });
    return (
      (result.docs[0] && mapProject(result.docs[0] as unknown as PayloadProject)) ??
      fallbackProjects.find((project) => project.slug === slug) ??
      null
    );
  } catch (error) {
    console.error(`Failed to load project ${slug} from Payload`, error);
    return fallbackProjects.find((project) => project.slug === slug) ?? null;
  }
}
