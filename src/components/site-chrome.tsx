import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteChrome({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="page-grid" aria-hidden="true" />
      <a className="skip-link" href="#main-content">Перейти к содержимому</a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <SiteFooter />
    </>
  );
}
