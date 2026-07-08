import type { Metadata, Viewport } from "next";
import "@fontsource/bricolage-grotesque/400.css";
import "@fontsource/bricolage-grotesque/500.css";
import "@fontsource/bricolage-grotesque/600.css";
import "@fontsource/bricolage-grotesque/700.css";
import "@fontsource/hanken-grotesk/400.css";
import "@fontsource/hanken-grotesk/500.css";
import "@fontsource/hanken-grotesk/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";

import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IntroSequence } from "@/components/layout/IntroSequence";
import { CursorGlow } from "@/components/layout/CursorGlow";
import { profile, links } from "@/data/content";
import { withBasePath } from "@/lib/basePath";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://noahswitch.github.io";
const TITLE = "N. Slimani — Systems Engineer, Cloud Architect & ML Researcher";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: profile.oneLiner,
  keywords: [
    "Systems Engineer",
    "Cloud Architect",
    "ML Researcher",
    "Federated Learning",
    "DevOps",
    "Budapest",
  ],
  authors: [{ name: profile.fullName, url: SITE_URL }],
  openGraph: {
    title: TITLE,
    description: profile.oneLiner,
    url: SITE_URL,
    siteName: profile.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: profile.oneLiner,
  },
  icons: {
    icon: withBasePath("/favicon.png"),
  },
};

export const viewport: Viewport = {
  themeColor: "#050609",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  alternateName: profile.name,
  jobTitle: profile.role,
  url: SITE_URL,
  address: { "@type": "PostalAddress", addressLocality: "Budapest", addressCountry: "HU" },
  email: links.emailDisplay,
  sameAs: [links.github, links.linkedin, links.researchgate, links.blog],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="font-body">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
        >
          Skip to content
        </a>

        <IntroSequence />
        <div className="grain-overlay pointer-events-none fixed inset-0 z-[1]" aria-hidden />
        <CursorGlow />

        <SmoothScrollProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
