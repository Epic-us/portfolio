import type { CollectionConfig } from "payload";
import { authenticated } from "@/access/authenticated";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: "Пользователь",
    plural: "Пользователи",
  },
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "Система",
  },
  access: {
    create: async ({ req }) => {
      if (req.user) return true;
      const { totalDocs } = await req.payload.count({
        collection: "users",
        overrideAccess: true,
      });
      return totalDocs === 0;
    },
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: "name",
      label: "Имя",
      type: "text",
      required: true,
    },
  ],
};
