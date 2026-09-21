import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found section-shell">
      <p className="eyebrow">404 / Не найдено</p>
      <h1>Этой страницы нет</h1>
      <Link className="button button-primary" href="/">Вернуться на главную</Link>
    </section>
  );
}
