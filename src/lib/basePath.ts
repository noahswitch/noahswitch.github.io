// When this site is built for GitHub Pages on a *project* repo (anything
// other than <owner>.github.io), it's served from a subpath, e.g.
// https://slimaninino.github.io/Noah_portfolio/ instead of the domain root.
// The GitHub Actions workflow computes this automatically and passes it in
// as NEXT_PUBLIC_BASE_PATH at build time — see .github/workflows/deploy.yml.
// On Vercel (or a user-page repo), this is empty and every path is root-relative.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefixes a root-relative path ("/resume.pdf") with the active base path.
 * Leaves absolute URLs (https://...) and already-prefixed paths untouched.
 * Note: next/image and next/link add the base path automatically on their
 * own — this helper is only for plain strings (hrefs, metadata, JSON-LD)
 * that Next.js doesn't rewrite for you.
 */
export function withBasePath(path: string) {
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}
