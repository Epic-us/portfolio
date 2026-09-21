import { fallbackProjects } from "@/lib/fallback-data";
import type { PortfolioProject } from "@/lib/types";
import { sanityClient } from "@/sanity/client";
import { projectBySlugQuery, projectsQuery } from "@/sanity/queries";

export async function getProjects(): Promise<PortfolioProject[]> {
  if (!sanityClient) return fallbackProjects;

  try {
    const projects = await sanityClient.fetch<PortfolioProject[]>(projectsQuery, {}, {
      next: { revalidate: 60 },
    });
    return projects.length > 0 ? projects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export async function getProject(slug: string): Promise<PortfolioProject | null> {
  if (!sanityClient) {
    return fallbackProjects.find((project) => project.slug === slug) ?? null;
  }

  try {
    const project = await sanityClient.fetch<PortfolioProject | null>(
      projectBySlugQuery,
      { slug },
      { next: { revalidate: 60 } },
    );
    return project ?? fallbackProjects.find((item) => item.slug === slug) ?? null;
  } catch {
    return fallbackProjects.find((project) => project.slug === slug) ?? null;
  }
}
