/**
 * Noah Portfolio Tracking Script
 * Collects permission-free analytics signals and sends via navigator.sendBeacon
 * Configuration: <script src="https://YOUR-NOAH-APP/track.js" data-source="portfolio" defer></script>
 */

(function() {
  // Get configuration from script tag
  const script = document.currentScript || document.querySelector('script[data-source="portfolio"]');
  const config = {
    source: script?.getAttribute('data-source') || 'portfolio',
    endpoint: script?.getAttribute('data-endpoint') || '/api/traffic',
  };

  // Permission-free signal collection
  function getSignals() {
    const signals = {
      // Page info
      path: window.location.pathname,
      hostname: window.location.hostname,

      // Device/Browser signals (no permissions needed)
      userAgent: navigator.userAgent,

      // Platform detection (from userAgent)
      platform: detectPlatform(),

      // Browser detection
      browser: detectBrowser(),

      // Timezone (standard API, no permissions)
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

      // Languages (standard API, no permissions)
      languages: navigator.languages ? navigator.languages.join(',') : navigator.language,

      // Screen signals
      screen: {
        width: window.screen.width,
        height: window.screen.height,
        colorDepth: window.screen.colorDepth,
        pixelDepth: window.screen.pixelDepth,
      },

      // Brave browser detection
      isBrave: detectBrave(),

      // Timestamp
      timestamp: new Date().toISOString(),

      // Source tag
      source: config.source,
    };

    return signals;
  }

  function detectPlatform() {
    const ua = navigator.userAgent;
    if (/Win/.test(ua)) return 'Windows';
    if (/Mac/.test(ua)) return 'macOS';
    if (/Linux/.test(ua)) return 'Linux';
    if (/iPhone|iPad|iPod/.test(ua)) return 'iOS';
    if (/Android/.test(ua)) return 'Android';
    return 'Unknown';
  }

  function detectBrowser() {
    const ua = navigator.userAgent;

    if (/Chrome/.test(ua) && !/Chromium/.test(ua)) return 'Chrome';
    if (/Safari/.test(ua) && !/Chrome/.test(ua)) return 'Safari';
    if (/Firefox/.test(ua)) return 'Firefox';
    if (/Edge/.test(ua)) return 'Edge';
    if (/Opera|OPR/.test(ua)) return 'Opera';
    if (/Brave/.test(ua)) return 'Brave';

    return 'Unknown';
  }

  async function detectBrave() {
    try {
      // Brave's permission prompt API is unique to Brave
      const isBrave = !!(await navigator.permissions?.query({ name: 'notifications' }));
      return isBrave;
    } catch {
      return false;
    }
  }

  function sendBeacon(signals) {
    if (!navigator.sendBeacon) {
      console.warn('navigator.sendBeacon not supported');
      return false;
    }

    try {
      const payload = JSON.stringify(signals);

      // Construct full endpoint URL
      const baseUrl = new URL(config.endpoint, window.location.origin).href;

      // sendBeacon returns true if the user agent is able to queue the request
      return navigator.sendBeacon(baseUrl, payload);
    } catch (error) {
      console.error('Error sending beacon:', error);
      return false;
    }
  }

  async function track() {
    try {
      // Wait for Brave detection
      const signals = await Promise.resolve().then(() => {
        const s = getSignals();
        return detectBrave().then(isBrave => {
          s.isBrave = isBrave;
          return s;
        });
      });

      // Send via sendBeacon (survives navigation)
      sendBeacon(signals);
    } catch (error) {
      console.error('Tracking error:', error);
    }
  }

  // Track on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', track);
  } else {
    track();
  }

  // Optional: Track on visibility change (for SPAs)
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
      track();
    }
  });
})();
