import fs from 'fs';
import path from 'path';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const outputDir = path.join(process.cwd(), 'lighthouse-reports');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

async function runLighthouse() {
  const url = 'http://localhost:3000';

  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox', '--disable-extensions'],
  });

  try {
    const mobileOptions = {
      logLevel: 'error',
      output: 'html',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
      disableStorageReset: true,
      formFactor: 'mobile',
      screenEmulation: {
        mobile: true,
        width: 360,
        height: 640,
        deviceScaleFactor: 2.625,
        disabled: false,
      },
      throttling: {
        cpuSlowdownMultiplier: 1,
      },
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
          cpuSlowdownMultiplier: 1,
        },
        disableStorageReset: true,
      },
    };

    console.log(`Running Lighthouse audit for ${url}...`);

    console.log('Running mobile audit...');
    try {
      const mobileResult = await lighthouse(url, mobileOptions);

      const dateStr = new Date().toISOString().replace(/[:.]/g, '-');
      const mobileFilename = path.join(outputDir, `lighthouse-mobile-${dateStr}.html`);

      fs.writeFileSync(mobileFilename, mobileResult.report);
      console.log(`Mobile report saved to: ${mobileFilename}`);

      console.log('\nMobile Scores:');
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
    } catch (mobileError) {
      console.error('Error during mobile audit:', mobileError);
    }

    console.log('\nRunning desktop audit...');
    try {
      const desktopOptions = {
        logLevel: 'error',
        output: 'html',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        port: chrome.port,
        disableStorageReset: true,
        formFactor: 'desktop',
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
        throttling: {
          cpuSlowdownMultiplier: 1,
        },
      };

      const desktopResult = await lighthouse(url, desktopOptions, desktopConfig);

      const dateStr = new Date().toISOString().replace(/[:.]/g, '-');
      const desktopFilename = path.join(outputDir, `lighthouse-desktop-${dateStr}.html`);

      fs.writeFileSync(desktopFilename, desktopResult.report);
      console.log(`Desktop report saved to: ${desktopFilename}`);

      console.log('\nDesktop Scores:');
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
    } catch (desktopError) {
      console.error('Error during desktop audit:', desktopError);
    }
  } catch (error) {
    console.error('Error running Lighthouse:', error);
  } finally {
    await chrome.kill();
  }
}

runLighthouse();
