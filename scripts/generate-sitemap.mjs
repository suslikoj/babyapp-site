import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import * as guideCs from '../content/pruvodce.mjs';
import * as guideEn from '../content/guide-en.mjs';
import recipeData from '../content/recepty/recipes.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');

const DEFAULT_SITE_URL = 'https://babyapp.cz';
const siteUrl = normalizeBaseUrl(process.env.SITE_URL ?? DEFAULT_SITE_URL);
// lastmod = date of the last real content change of each page (update it when the page changes).

// Both language versions of a page, linked to each other via hreflang (x-default = Czech).
function pair({ cs, en }, changefreq, priority, lastmod) {
  const alternates = en ? [cs, en] : [];
  return [cs, en].filter(Boolean).map((p) => ({ path: p, lastmod, changefreq, priority: p.startsWith('/en/') ? String((Number(priority) - 0.1).toFixed(1)) : priority, alternates, xDefault: cs }));
}

const routes = [
  { path: '/', lastmod: null, changefreq: 'weekly', priority: '1.0', alternates: ['/', '/en/'], xDefault: '/' },
  { path: '/en/', lastmod: null, changefreq: 'weekly', priority: '0.9', alternates: ['/', '/en/'], xDefault: '/' },
  { path: '/eczema/', lastmod: null, changefreq: 'monthly', priority: '0.8', alternates: ['/eczema/', '/en/eczema/'], xDefault: '/eczema/' },
  { path: '/en/eczema/', lastmod: null, changefreq: 'monthly', priority: '0.7', alternates: ['/eczema/', '/en/eczema/'], xDefault: '/eczema/' },
  { path: '/signs/', lastmod: null, changefreq: 'monthly', priority: '0.8', alternates: ['/signs/', '/en/signs/'], xDefault: '/signs/' },
  { path: '/en/signs/', lastmod: null, changefreq: 'monthly', priority: '0.7', alternates: ['/signs/', '/en/signs/'], xDefault: '/signs/' },
  { path: '/main-suspects/', lastmod: null, changefreq: 'monthly', priority: '0.8', alternates: ['/main-suspects/', '/en/main-suspects/'], xDefault: '/main-suspects/' },
  { path: '/en/main-suspects/', lastmod: null, changefreq: 'monthly', priority: '0.7', alternates: ['/main-suspects/', '/en/main-suspects/'], xDefault: '/main-suspects/' },

  { path: '/privacy-policy/', lastmod: null, changefreq: 'yearly', priority: '0.5', alternates: ['/privacy-policy/', '/en/privacy-policy/'], xDefault: '/privacy-policy/' },
  { path: '/en/privacy-policy/', lastmod: null, changefreq: 'yearly', priority: '0.5', alternates: ['/privacy-policy/', '/en/privacy-policy/'], xDefault: '/privacy-policy/' },
  { path: '/medical-disclaimer/', lastmod: null, changefreq: 'yearly', priority: '0.5', alternates: ['/medical-disclaimer/', '/en/medical-disclaimer/'], xDefault: '/medical-disclaimer/' },
  { path: '/en/medical-disclaimer/', lastmod: null, changefreq: 'yearly', priority: '0.5', alternates: ['/medical-disclaimer/', '/en/medical-disclaimer/'], xDefault: '/medical-disclaimer/' },
  { path: '/terms-of-use/', lastmod: null, changefreq: 'yearly', priority: '0.5', alternates: ['/terms-of-use/', '/en/terms-of-use/'], xDefault: '/terms-of-use/' },
  { path: '/en/terms-of-use/', lastmod: null, changefreq: 'yearly', priority: '0.5', alternates: ['/terms-of-use/', '/en/terms-of-use/'], xDefault: '/terms-of-use/' },
  { path: '/zdroje/', lastmod: null, changefreq: 'yearly', priority: '0.5', alternates: ['/zdroje/', '/en/sources/'], xDefault: '/zdroje/' },
  { path: '/en/sources/', lastmod: null, changefreq: 'yearly', priority: '0.5', alternates: ['/zdroje/', '/en/sources/'], xDefault: '/zdroje/' },

  // Průvodce / Guide, O projektu / About, Recepty / Recipes – Czech and English twins
  ...pair({ cs: '/pruvodce/', en: '/en/guide/' }, 'weekly', '0.9', null),
  ...guideCs.categories.flatMap((c) => {
    const en = guideEn.categories.find((e) => e.cs === c.slug);
    return pair({ cs: guideCs.categoryPath(c.slug), en: en && guideEn.categoryPath(en.slug) }, 'weekly', '0.8', null);
  }),
  ...guideCs.articles.flatMap((a) => {
    const en = guideEn.articles.find((e) => e.cs === a.slug);
    return pair({ cs: guideCs.articlePath(a), en: en && guideEn.articlePath(en) }, 'monthly', '0.8', null);
  }),
  ...pair({ cs: '/o-projektu/', en: '/en/about/' }, 'monthly', '0.6', null),
  ...pair({ cs: '/recepty/', en: '/en/recipes/' }, 'weekly', '0.8', recipeData.recipes.map((r) => r.updated).sort().at(-1) || '2026-10-01'),
  ...recipeData.recipes.flatMap((r) => pair({ cs: `/recepty/${r.slug}/`, en: r.en ? `/en/recipes/${r.slugEn}/` : null }, 'monthly', '0.7', r.updated || r.published)),
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
      const alternateLinks = !route.alternates.length ? '' : [
        ...route.alternates.map((alternatePath) => {
          const hreflang = alternatePath.startsWith('/en/') || alternatePath === '/en/' ? 'en' : 'cs';
          return `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXml(absoluteUrl(alternatePath))}" />`;
        }),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(absoluteUrl(route.xDefault))}" />`,
      ].join('\n');

      return [
        '  <url>',
        `    <loc>${escapeXml(absoluteUrl(route.path))}</loc>`,
        ...(alternateLinks ? [alternateLinks] : []),
        `    <lastmod>${route.lastmod}</lastmod>`,
        `    <changefreq>${route.changefreq}</changefreq>`,
        `    <priority>${route.priority}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries}\n</urlset>\n`;
}

function validateSitemapXml(xml) {
  const requiredSubstrings = ['<urlset', '<url>', '<loc>'];
  const hasRequiredSubstrings = requiredSubstrings.every((substring) => xml.includes(substring));
  const hasValidClosingTag = xml.trimEnd().endsWith('</urlset>');

  if (!hasRequiredSubstrings || !hasValidClosingTag) {
    console.error('Generated sitemap.xml is invalid. Missing required XML tags or closing </urlset>.');
    process.exit(1);
  }
}

function createRobotsTxt() {
  return `User-agent: *\nAllow: /\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`;
}

// lastmod = the real date of the last content change. Each page's HTML is fingerprinted; the date in
// content/lastmod.json only moves when the fingerprint changes. Recipes use their Storyblok publish date.
const MANIFEST = path.join(root, 'content/lastmod.json');
const manifest = JSON.parse(await fs.readFile(MANIFEST, 'utf8').catch(() => '{}'));
const today = new Date().toISOString().slice(0, 10);
for (const route of routes) {
  if (route.lastmod) continue;
  const html = await fs.readFile(path.join(publicDir, route.path, 'index.html'), 'utf8').catch(() => null);
  if (!html) {
    route.lastmod = today;
    continue;
  }
  const hash = crypto.createHash('sha1').update(html).digest('hex');
  const known = manifest[route.path];
  if (known?.hash === hash) {
    route.lastmod = known.date;
  } else {
    route.lastmod = today;
    manifest[route.path] = { hash, date: today };
  }
}
const sortedManifest = Object.fromEntries(Object.keys(manifest).sort().map((key) => [key, manifest[key]]));
await fs.writeFile(MANIFEST, `${JSON.stringify(sortedManifest, null, 2)}\n`, 'utf8');

const sitemapXml = createSitemapXml();
validateSitemapXml(sitemapXml);
const robotsTxt = createRobotsTxt();

await fs.mkdir(publicDir, { recursive: true });
await fs.writeFile(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
await fs.writeFile(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');
// Keep the committed root copies in sync too (served as-is when no build step runs, e.g. GitHub Pages).
await fs.writeFile(path.join(root, 'sitemap.xml'), sitemapXml, 'utf8');
await fs.writeFile(path.join(root, 'robots.txt'), robotsTxt, 'utf8');

console.log(`Generated public/sitemap.xml and public/robots.txt for ${siteUrl}`);
