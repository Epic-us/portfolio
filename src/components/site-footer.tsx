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
        {profile.email && <a href={`mailto:${profile.email}`}>Email</a>}
        {profile.telegramUrl && <a href={profile.telegramUrl} rel="noreferrer" target="_blank">Telegram</a>}
        {profile.linkedinUrl && <a href={profile.linkedinUrl} rel="noreferrer" target="_blank">LinkedIn</a>}
        {profile.resumeUrl && <a href={profile.resumeUrl} rel="noreferrer" target="_blank">Резюме</a>}
        {profile.githubUrl && (
          <a href={profile.githubUrl} rel="noreferrer" target="_blank">GitHub</a>
        )}
      </div>
    </footer>
  );
}
