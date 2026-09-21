import { defineQuery } from "next-sanity";

export const projectsQuery = defineQuery(`
  *[_type == "project" && status == "published"] | order(featured desc, year desc) {
    _id,
    title,
    "slug": slug.current,
    eyebrow,
    excerpt,
    problem,
    solution,
    role,
    status,
    featured,
    isDemo,
    skills,
    repoUrl,
    demoUrl,
    year,
    accent,
    artifacts[] {
      _key,
      type,
      title,
      description,
      code,
      url
    }
  }
`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    "slug": slug.current,
    eyebrow,
    excerpt,
    problem,
    solution,
    role,
    status,
    featured,
    isDemo,
    skills,
    repoUrl,
    demoUrl,
    year,
    accent,
    artifacts[] {
      _key,
      type,
      title,
      description,
      code,
      url
    }
  }
`);
