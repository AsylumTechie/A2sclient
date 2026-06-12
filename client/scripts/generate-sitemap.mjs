import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { getSitemapPaths } from './routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteUrl = (process.env.VITE_SITE_URL || 'https://a2secomsolutions.com').replace(/\/$/, '');

const urls = getSitemapPaths();
const today = new Date().toISOString().split('T')[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((path) => {
    let priority = '0.9';
    if (path === '') priority = '1.0';
    else if (path.startsWith('/services/')) priority = '0.8';
    else if (path.startsWith('/blog/')) priority = '0.7';
    else if (path === '/blog') priority = '0.85';

    return `  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${path === '' || path === '/blog' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

writeFileSync(join(__dirname, '../public/sitemap.xml'), xml, 'utf8');
console.log(`Sitemap generated with ${urls.length} URLs → public/sitemap.xml`);
