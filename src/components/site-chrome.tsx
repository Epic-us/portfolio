import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteChrome({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="page-grid" aria-hidden="true" />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
