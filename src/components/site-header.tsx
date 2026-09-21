import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getSiteProfile } from "@/lib/content";

export async function SiteHeader() {
  const profile = await getSiteProfile();
  const contactUrl = profile.email ? `mailto:${profile.email}` : "/#contact";

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="На главную">
        <span className="brand-mark">SA</span>
        <span className="brand-name">{profile.name}</span>
      </Link>
      <nav className="site-nav" aria-label="Основная навигация">
        <Link href="/projects">Проекты</Link>
        <Link href="/#about">Обо мне</Link>
        <Link className="nav-cta" href={contactUrl}>
          Связаться <ArrowUpRight size={15} />
        </Link>
      </nav>
    </header>
  );
}
