import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: {
    default: "Портфолио системного аналитика",
    template: "%s — Системный аналитик",
  },
  description:
    "Проекты по системному анализу: требования, REST API, модели данных, бизнес-процессы и тестирование.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
