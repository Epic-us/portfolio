import type { CollectionConfig } from "payload";
import { authenticated } from "@/access/authenticated";

export const Skills: CollectionConfig = {
  slug: "skills",
  labels: {
    singular: "Навык",
    plural: "Навыки",
  },
  admin: {
    useAsTitle: "title",
    group: "Портфолио",
    defaultColumns: ["title", "category"],
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
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
      label: "Системное имя",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "category",
      label: "Категория",
      type: "select",
      required: true,
      options: [
        { label: "Анализ", value: "analysis" },
        { label: "API и интеграции", value: "integration" },
        { label: "Данные", value: "data" },
        { label: "Моделирование", value: "modeling" },
        { label: "Тестирование", value: "testing" },
        { label: "Инструменты", value: "tool" },
      ],
    },
  ],
};
