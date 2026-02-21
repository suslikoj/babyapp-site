import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const DEFAULT_SITE_URL = 'https://babyapp.cz';
const siteUrl = normalizeBaseUrl(process.env.SITE_URL ?? DEFAULT_SITE_URL);
const today = new Date().toISOString().slice(0, 10);

const routes = [
  { path: '/', changefreq: 'weekly', priority: '1.0', alternates: ['/', '/en/'] },
  { path: '/en/', changefreq: 'weekly', priority: '0.9', alternates: ['/', '/en/'] },
  { path: '/eczema/', changefreq: 'monthly', priority: '0.8', alternates: ['/eczema/', '/en/eczema/'] },
  { path: '/en/eczema/', changefreq: 'monthly', priority: '0.7', alternates: ['/eczema/', '/en/eczema/'] },
  { path: '/signs/', changefreq: 'monthly', priority: '0.8', alternates: ['/signs/', '/en/signs/'] },
  { path: '/en/signs/', changefreq: 'monthly', priority: '0.7', alternates: ['/signs/', '/en/signs/'] },
  { path: '/main-suspects/', changefreq: 'monthly', priority: '0.8', alternates: ['/main-suspects/', '/en/main-suspects/'] },
  { path: '/en/main-suspects/', changefreq: 'monthly', priority: '0.7', alternates: ['/main-suspects/', '/en/main-suspects/'] },
];

function normalizeBaseUrl(url) {
  const normalized = String(url).trim().replace(/\/+$/, '');
  if (!/^https?:\/\//.test(normalized)) {
    throw new Error(`SITE_URL must start with http:// or https://. Received: ${url}`);
  }
  return normalized;
}

function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function absoluteUrl(routePath) {
  return `${siteUrl}${routePath}`;
}

function createSitemapXml() {
  const entries = routes
    .map((route) => {
      const alternateLinks = route.alternates
        .map((alternatePath) => {
          const hreflang = alternatePath.startsWith('/en/') || alternatePath === '/en/' ? 'en' : 'cs';
          return `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXml(absoluteUrl(alternatePath))}" />`;
        })
        .join('\n');

      return [
        '  <url>',
        `    <loc>${escapeXml(absoluteUrl(route.path))}</loc>`,
        alternateLinks,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>${route.changefreq}</changefreq>`,
        `    <priority>${route.priority}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries}\n</urlset>\n`;
}

function createRobotsTxt() {
  return `User-agent: *\nAllow: /\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`;
}

await fs.writeFile(path.join(root, 'sitemap.xml'), createSitemapXml(), 'utf8');
await fs.writeFile(path.join(root, 'robots.txt'), createRobotsTxt(), 'utf8');

console.log(`Generated sitemap.xml and robots.txt for ${siteUrl}`);
