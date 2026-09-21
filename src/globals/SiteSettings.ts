import type { GlobalConfig } from "payload";
import { authenticated } from "@/access/authenticated";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Настройки сайта",
  admin: { group: "Сайт" },
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Профиль",
          fields: [
            { name: "name", label: "Имя", type: "text", required: true },
            {
              name: "professionalTitle",
              label: "Профессиональный заголовок",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "availability",
              label: "Статус доступности",
              type: "text",
              localized: true,
            },
            { name: "about", label: "Обо мне", type: "textarea", localized: true },
            { name: "resume", label: "Резюме", type: "upload", relationTo: "media" },
          ],
        },
        {
          label: "Контакты",
          fields: [
            { name: "email", label: "Email", type: "email" },
            { name: "telegramUrl", label: "Telegram", type: "text" },
            { name: "githubUrl", label: "GitHub", type: "text" },
            { name: "linkedinUrl", label: "LinkedIn", type: "text" },
          ],
        },
        {
          label: "SEO",
          fields: [
            { name: "seoTitle", label: "Заголовок", type: "text", localized: true },
            { name: "seoDescription", label: "Описание", type: "textarea", localized: true },
            { name: "socialImage", label: "Изображение", type: "upload", relationTo: "media" },
          ],
        },
      ],
    },
  ],
};
