import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { getSiteUrl } from "@/lib/site-url";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const projects = await getProjects();
  return [
    { url: new URL("/", base).href, priority: 1 },
    { url: new URL("/projects", base).href, priority: 0.8 },
    ...projects.map((project) => ({
      url: new URL(`/projects/${encodeURIComponent(project.slug)}`, base).href,
      priority: 0.7,
    })),
  ];
}
