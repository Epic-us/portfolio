"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/sanity/schemaTypes";
import { sanityDataset, sanityProjectId } from "@/sanity/env";

export default defineConfig({
  name: "portfolio",
  title: "Портфолио системного аналитика",
  projectId: sanityProjectId || "portfolio",
  dataset: sanityDataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
