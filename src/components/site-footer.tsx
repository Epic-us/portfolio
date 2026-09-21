import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <span className="brand-mark">SA</span>
        <p>Системный анализ, API и понятная документация.</p>
      </div>
      <div className="footer-links">
        <Link href="/projects">Проекты</Link>
        <Link href="/studio">Управление контентом</Link>
        <a href="https://github.com/Epic-us/portfolio" rel="noreferrer" target="_blank">
          GitHub
        </a>
      </div>
    </footer>
  );
}
