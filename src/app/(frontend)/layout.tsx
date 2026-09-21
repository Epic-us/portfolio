import type { Metadata } from "next";
import "../globals.css";
import { SiteChrome } from "@/components/site-chrome";
import { getSiteProfile } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getSiteProfile();
  return {
    title: { default: profile.seoTitle, template: `%s — ${profile.name}` },
    description: profile.seoDescription,
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
