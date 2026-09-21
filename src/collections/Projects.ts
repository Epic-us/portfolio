import type { CollectionConfig } from "payload";
import { authenticated } from "@/access/authenticated";
import { publishedOrAuthenticated } from "@/access/published-or-authenticated";
import { Artifact } from "@/blocks/Artifact";

export const Projects: CollectionConfig = {
  slug: "projects",
  labels: {
    singular: "Проект",
    plural: "Проекты",
  },
  admin: {
    useAsTitle: "title",
    group: "Портфолио",
    defaultColumns: ["title", "year", "featured", "updatedAt"],
  },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: {
    drafts: {
      autosave: { interval: 1500 },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  fields: [
    {
      name: "title",
      label: "Название",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      label: "Адрес страницы",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar" },
    },
    {
      name: "eyebrow",
      label: "Категория",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "excerpt",
      label: "Краткое описание",
      type: "textarea",
      required: true,
      localized: true,
      maxLength: 260,
    },
    {
      name: "caseStudy",
      label: "Содержание кейса",
      type: "group",
      fields: [
        {
          type: "tabs",
          tabs: [
        {
          label: "Проблема",
          fields: [
            {
              name: "problem",
              label: "Исходная ситуация",
              type: "textarea",
              required: true,
              localized: true,
            },
          ],
        },
        {
          label: "Решение",
          fields: [
            {
              name: "solution",
              label: "Что спроектировано",
              type: "textarea",
              required: true,
              localized: true,
            },
          ],
        },
        {
          label: "Роль",
          fields: [
            {
              name: "role",
              label: "Моя зона ответственности",
              type: "textarea",
              required: true,
              localized: true,
            },
          ],
        },
          ],
        },
      ],
    },
    {
      name: "skills",
      label: "Навыки и технологии",
      type: "relationship",
      relationTo: "skills",
      hasMany: true,
      required: true,
    },
    {
      name: "artifacts",
      label: "Артефакты",
      type: "blocks",
      blocks: [Artifact],
    },
    {
      name: "cover",
      label: "Обложка",
      type: "upload",
      relationTo: "media",
    },
    {
      type: "row",
      fields: [
        { name: "repoUrl", label: "GitHub", type: "text", admin: { width: "50%" } },
        { name: "demoUrl", label: "Демо / Figma", type: "text", admin: { width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "year",
          label: "Год",
          type: "number",
          required: true,
          min: 2000,
          max: 2100,
          admin: { width: "33%" },
        },
        {
          name: "accent",
          label: "Акцентный цвет",
          type: "text",
          defaultValue: "#6ee7b7",
          required: true,
          admin: { width: "33%" },
          validate: (value: string | null | undefined) =>
            !value || /^#[0-9a-fA-F]{6}$/.test(value) || "Введите цвет в формате #6ee7b7",
        },
        {
          name: "featured",
          label: "На главной",
          type: "checkbox",
          defaultValue: false,
          admin: { width: "17%" },
        },
        {
          name: "isDemo",
          label: "Пет-проект",
          type: "checkbox",
          defaultValue: true,
          admin: { width: "17%" },
        },
      ],
    },
  ],
};
