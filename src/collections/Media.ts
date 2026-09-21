import path from "node:path";
import { fileURLToPath } from "node:url";
import type { CollectionConfig } from "payload";
import { authenticated } from "@/access/authenticated";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Файл",
    plural: "Медиа и документы",
  },
  admin: {
    useAsTitle: "alt",
    group: "Контент",
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  upload: {
    staticDir: path.resolve(dirname, "../../media"),
    mimeTypes: [
      "image/*",
      "application/pdf",
      "application/json",
      "application/yaml",
      "text/yaml",
      "text/plain",
      "application/xml",
    ],
    imageSizes: [
      { name: "card", width: 960, height: 640, position: "centre" },
      { name: "preview", width: 1600, height: 1000, position: "centre" },
    ],
  },
  fields: [
    {
      name: "alt",
      label: "Описание файла",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "caption",
      label: "Подпись",
      type: "textarea",
      localized: true,
    },
  ],
};
