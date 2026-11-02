export function getSiteUrl(): URL {
  const url = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("NEXT_PUBLIC_SITE_URL must use HTTP or HTTPS");
  }
  return new URL(url.origin);
}
