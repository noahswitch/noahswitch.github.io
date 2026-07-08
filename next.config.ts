import type { NextConfig } from "next";

// This project deploys to two targets from one codebase:
//
//  - GitHub Pages: needs a fully static export (no server), so `next build`
//    is run with BUILD_TARGET=github-pages, which enables `output: "export"`.
//    On a project repo (anything other than <owner>.github.io), Pages serves
//    the site from a subpath (e.g. /Noah_portfolio/), so basePath/assetPrefix
//    are read from NEXT_PUBLIC_BASE_PATH, which the GitHub Actions workflow
//    computes automatically from the repo name.
//  - Vercel (or any Node host): build normally with plain `next build`. Vercel
//    auto-detects Next.js and gets full server features for free — real
//    on-demand image optimization instead of the unoptimized fallback GitHub
//    Pages requires, and the option to add server features later without
//    touching this file again.
const isGithubPagesBuild = process.env.BUILD_TARGET === "github-pages";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isGithubPagesBuild && {
    output: "export",
    trailingSlash: true,
    ...(basePath && {
      basePath,
      assetPrefix: `${basePath}/`,
    }),
  }),
  images: {
    unoptimized: isGithubPagesBuild,
  },
};

export default nextConfig;
