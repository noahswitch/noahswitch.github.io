'use client';

import Script from 'next/script';

export function TrackingScript() {
  const noahDomain = process.env.NEXT_PUBLIC_NOAH_DOMAIN;

  // Skip if Noah domain not configured
  if (!noahDomain) {
    return null;
  }

  return (
    <Script
      src={`${noahDomain}/track.js`}
      data-source="portfolio"
      strategy="lazyOnload"
      onError={() => {
        console.warn(`Failed to load tracking script from ${noahDomain}/track.js`);
      }}
    />
  );
}
