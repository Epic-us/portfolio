import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="На главную">
        <span className="brand-mark">SA</span>
        <span className="brand-name">System Analyst</span>
      </Link>
      <nav className="site-nav" aria-label="Основная навигация">
        <Link href="/projects">Проекты</Link>
        <Link href="/#about">Обо мне</Link>
        <Link className="nav-cta" href="mailto:hello@example.com">
          Связаться <ArrowUpRight size={15} />
        </Link>
      </nav>
    </header>
  );
}
