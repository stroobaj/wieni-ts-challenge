export default {
  extends: 'lighthouse:default',
  settings: {
    maxWaitForLoad: 45 * 1000,
    skipAudits: ['uses-http2'],
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
    },
    formFactor: 'desktop',
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false,
    },
    skipChromeIncognito: true,
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  },
};
