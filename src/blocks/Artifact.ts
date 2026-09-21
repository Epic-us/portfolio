import type { Block } from "payload";

export const Artifact: Block = {
  slug: "artifact",
  labels: {
    singular: "Артефакт проекта",
    plural: "Артефакты проекта",
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "artifactType",
          label: "Тип",
          type: "select",
          required: true,
          options: [
            { label: "Архитектура", value: "architecture" },
            { label: "API", value: "api" },
            { label: "Процесс", value: "process" },
            { label: "Данные", value: "data" },
            { label: "Прототип", value: "prototype" },
            { label: "Тестирование", value: "testing" },
          ],
          admin: { width: "50%" },
        },
        {
          name: "title",
          label: "Название",
          type: "text",
          required: true,
          localized: true,
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "description",
      label: "Пояснение",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "code",
      label: "Mermaid, OpenAPI или пример кода",
      type: "textarea",
      localized: true,
      admin: {
        rows: 14,
        description:
          "Для архитектуры, процессов и данных используется Mermaid. Для API можно вставить OpenAPI или пример запроса.",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "externalUrl",
          label: "Внешняя ссылка",
          type: "text",
          admin: { width: "50%" },
        },
        {
          name: "file",
          label: "Файл",
          type: "upload",
          relationTo: "media",
          admin: { width: "50%" },
        },
      ],
    },
  ],
};
