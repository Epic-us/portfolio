import { CaseIcon } from "@sanity/icons/Case";
import { defineArrayMember, defineField, defineType } from "sanity";

const artifactTypes = [
  { title: "Архитектура", value: "architecture" },
  { title: "API", value: "api" },
  { title: "Процесс", value: "process" },
  { title: "Данные", value: "data" },
  { title: "Прототип", value: "prototype" },
  { title: "Тестирование", value: "testing" },
];

export const projectType = defineType({
  name: "project",
  title: "Проекты",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Название",
      type: "string",
      validation: (rule) => rule.required().min(3).max(80),
    }),
    defineField({
      name: "slug",
      title: "Адрес страницы",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Категория",
      description: "Например: Системный анализ · REST API",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "excerpt",
      title: "Краткое описание",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(40).max(240),
    }),
    defineField({
      name: "problem",
      title: "Проблема",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "solution",
      title: "Решение",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Моя роль",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Статус",
      type: "string",
      initialValue: "draft",
      options: {
        layout: "radio",
        list: [
          { title: "Черновик", value: "draft" },
          { title: "Опубликован", value: "published" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Показывать на главной",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isDemo",
      title: "Демонстрационный кейс",
      description: "Добавляет честную пометку, что кейс не является коммерческой работой.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "skills",
      title: "Навыки и технологии",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "repoUrl", title: "GitHub", type: "url" }),
    defineField({ name: "demoUrl", title: "Демо или Figma", type: "url" }),
    defineField({
      name: "year",
      title: "Год",
      type: "string",
      validation: (rule) => rule.required().regex(/^20\d{2}$/),
    }),
    defineField({
      name: "accent",
      title: "Акцентный цвет",
      description: "HEX, например #6ee7b7",
      type: "string",
      initialValue: "#6ee7b7",
      validation: (rule) => rule.required().regex(/^#[0-9a-fA-F]{6}$/),
    }),
    defineField({
      name: "artifacts",
      title: "Артефакты",
      type: "array",
      of: [
        defineArrayMember({
          name: "artifact",
          title: "Артефакт",
          type: "object",
          fields: [
            defineField({
              name: "type",
              title: "Тип",
              type: "string",
              options: { list: artifactTypes },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Название",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Описание",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "code",
              title: "Mermaid или текстовый блок",
              type: "text",
              rows: 12,
            }),
            defineField({ name: "url", title: "Внешняя ссылка", type: "url" }),
          ],
          preview: {
            select: { title: "title", subtitle: "type" },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "eyebrow" },
  },
});
