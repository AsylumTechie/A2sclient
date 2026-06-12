import { spawn } from 'child_process';
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import handler from 'serve-handler';
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import { prerenderRoutes } from './routes.mjs';

function cleanPrerenderedHtml(html) {
  const $ = cheerio.load(html);
  $('title').not(':last').remove();
  $('meta[name="description"]').not(':last').remove();
  $('meta[name="keywords"]').not(':last').remove();
  $('link[rel="canonical"]').not(':last').remove();
  $('meta[property^="og:"]').remove();
  $('meta[name^="twitter:"]').remove();
  const pageTitle = $('title').last().text();
  const description = $('meta[name="description"]').last().attr('content');
  const canonical = $('link[rel="canonical"]').last().attr('href');
  if (pageTitle) {
    $('head').append(`<meta property="og:title" content="${pageTitle}">`);
    $('head').append(`<meta name="twitter:title" content="${pageTitle}">`);
  }
  if (description) {
    $('head').append(`<meta property="og:description" content="${description}">`);
    $('head').append(`<meta name="twitter:description" content="${description}">`);
  }
  if (canonical) {
    $('head').append(`<meta property="og:url" content="${canonical}">`);
  }
  return $.html();
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '../dist');
const port = 4173;
const skip = process.env.SKIP_PRERENDER === 'true';

function startStaticServer() {
  const server = createServer((req, res) => {
    handler(req, res, {
      public: distDir,
      rewrites: [{ source: '**', destination: '/index.html' }],
    });
  });
  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

function routeToFile(route) {
  if (route === '/') return join(distDir, 'index.html');
  const clean = route.replace(/^\//, '').replace(/\/$/, '');
  return join(distDir, clean, 'index.html');
}

async function prerender() {
  if (skip) {
    console.log('SKIP_PRERENDER=true — skipping prerender');
    return;
  }

  console.log(`Prerendering ${prerenderRoutes.length} routes...`);
  const server = await startStaticServer();
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    for (const route of prerenderRoutes) {
      const page = await browser.newPage();
      const url = `http://localhost:${port}${route}`;
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
      await page.waitForSelector('h1', { timeout: 15000 });
      await new Promise((r) => setTimeout(r, 500));
      const html = cleanPrerenderedHtml(await page.content());
      await page.close();
      const outFile = routeToFile(route);
      mkdirSync(dirname(outFile), { recursive: true });
      writeFileSync(outFile, html, 'utf8');
      console.log(`  ✓ ${route}`);
    }
    console.log('Prerender complete.');
  } finally {
    await browser.close();
    server.close();
  }
}

prerender().catch((err) => {
  console.warn('Prerender failed (build will continue):', err.message);
  process.exit(0);
});
