import type { Metadata } from "next";
import "../globals.css";
import { SiteChrome } from "@/components/site-chrome";
import { getSiteProfile } from "@/lib/content";
import { getSiteUrl } from "@/lib/site-url";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getSiteProfile();
  return {
    metadataBase: getSiteUrl(),
    title: { default: profile.seoTitle, template: `%s — ${profile.name}` },
    description: profile.seoDescription,
    openGraph: {
      type: "website", locale: "ru_RU", siteName: profile.seoTitle,
      title: profile.seoTitle, description: profile.seoDescription,
      ...(profile.socialImageUrl ? { images: [{ url: profile.socialImageUrl }] } : {}),
    },
    twitter: {
      card: profile.socialImageUrl ? "summary_large_image" : "summary",
      title: profile.seoTitle, description: profile.seoDescription,
      ...(profile.socialImageUrl ? { images: [profile.socialImageUrl] } : {}),
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
