import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { en } from "@payloadcms/translations/languages/en";
import { ru } from "@payloadcms/translations/languages/ru";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Media } from "@/collections/Media";
import { Projects } from "@/collections/Projects";
import { Skills } from "@/collections/Skills";
import { Users } from "@/collections/Users";
import { SiteSettings } from "@/globals/SiteSettings";
import { migrations } from "@/migrations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: "— Портфолио",
    },
  },
  collections: [Users, Media, Skills, Projects],
  globals: [SiteSettings],
  editor: lexicalEditor({}),
  db: postgresAdapter({
    prodMigrations: migrations,
    pool: {
      connectionString:
        process.env.DATABASE_URL ?? "postgres://portfolio:portfolio@127.0.0.1:5432/portfolio",
    },
  }),
  i18n: {
    supportedLanguages: { ru, en },
    fallbackLanguage: "ru",
  },
  localization: {
    locales: [
      { code: "ru", label: "Русский" },
      { code: "en", label: "English" },
    ],
    defaultLocale: "ru",
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET ?? "build-time-placeholder-change-in-production",
  serverURL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
});
