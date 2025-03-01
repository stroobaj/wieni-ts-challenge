import fs from 'fs';
import path from 'path';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const routes = ['/', '/recipes', '/not-found'];

const outputDir = path.join(process.cwd(), 'lighthouse-reports');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

async function runLighthouseForRoutes() {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox'],
  });

  try {
    const baseUrl = 'http://localhost:3000';
    const options = {
      logLevel: 'error',
      output: 'html',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
    };

    const desktopConfig = {
      extends: 'lighthouse:default',
      settings: {
        formFactor: 'desktop',
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
      },
    };

    for (const route of routes) {
      const url = `${baseUrl}${route}`;
      console.log(`\nRunning Lighthouse audit for ${url}...`);

      console.log(`- Running mobile audit for ${route}`);
      const mobileResult = await lighthouse(url, options);

      console.log(`- Running desktop audit for ${route}`);
      const desktopResult = await lighthouse(
        url,
        {
          ...options,
          port: chrome.port,
        },
        desktopConfig,
      );

      const routeName = route === '/' ? 'home' : route.replace(/\//g, '-').slice(1);
      const dateStr = new Date().toISOString().replace(/[:.]/g, '-');
      const mobileFilename = path.join(outputDir, `lighthouse-mobile-${routeName}-${dateStr}.html`);
      const desktopFilename = path.join(
        outputDir,
        `lighthouse-desktop-${routeName}-${dateStr}.html`,
      );

      fs.writeFileSync(mobileFilename, mobileResult.report);
      fs.writeFileSync(desktopFilename, desktopResult.report);

      console.log(`Mobile report saved to: ${mobileFilename}`);
      console.log(`Desktop report saved to: ${desktopFilename}`);

      console.log(`\nMobile scores for ${route}:`);
      console.log(
        `- Performance: ${Math.round(mobileResult.lhr.categories.performance.score * 100)}`,
      );
      console.log(
        `- Accessibility: ${Math.round(mobileResult.lhr.categories.accessibility.score * 100)}`,
      );
      console.log(
        `- Best Practices: ${Math.round(mobileResult.lhr.categories['best-practices'].score * 100)}`,
      );
      console.log(`- SEO: ${Math.round(mobileResult.lhr.categories.seo.score * 100)}`);

      console.log(`\nDesktop scores for ${route}:`);
      console.log(
        `- Performance: ${Math.round(desktopResult.lhr.categories.performance.score * 100)}`,
      );
      console.log(
        `- Accessibility: ${Math.round(desktopResult.lhr.categories.accessibility.score * 100)}`,
      );
      console.log(
        `- Best Practices: ${Math.round(desktopResult.lhr.categories['best-practices'].score * 100)}`,
      );
      console.log(`- SEO: ${Math.round(desktopResult.lhr.categories.seo.score * 100)}`);
    }
  } catch (error) {
    console.error('Error running Lighthouse:', error);
  } finally {
    await chrome.kill();
  }
}

runLighthouseForRoutes();
