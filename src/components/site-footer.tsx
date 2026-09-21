import Link from "next/link";
import { getSiteProfile } from "@/lib/content";

export async function SiteFooter() {
  const profile = await getSiteProfile();

  return (
    <footer className="site-footer">
      <div>
        <span className="brand-mark">SA</span>
        <p>{profile.professionalTitle}</p>
      </div>
      <div className="footer-links">
        <Link href="/projects">Проекты</Link>
        <Link href="/admin">Управление контентом</Link>
        {profile.githubUrl && (
          <a href={profile.githubUrl} rel="noreferrer" target="_blank">GitHub</a>
        )}
      </div>
    </footer>
  );
}
