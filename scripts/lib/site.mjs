import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { categories, categoryPath } from '../../content/pruvodce.mjs';

// Shared page chrome and helpers for the static generators (articles, guide, recipes).

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export const NAV_EN = { app: 'App', eczema: 'Eczema in children', signs: 'Signs of food allergy', main: 'Main suspects' };

export const SITE_URL = 'https://babyapp.cz';
export const PUBLISHED = '2026-03-01';
export const UPDATED = '2026-10-01';
export const APP_STORE_ID = '6776690582';
export const AUTHOR = {
  name: 'Jiřina Brázdová',
  photo: '/assets/jirina-brazdova.jpg',
  photoWebp: '/assets/jirina-brazdova.webp',
};
export const BRAND = { cs: 'Bejby bez alergií', en: 'Baby w/o allergies' };

// Topic-specific app CTA, shared by legacy articles (by slug) and guide articles (by category).
export const CTA = {
  signs: { eyebrow: 'Deník příznaků a jídla', heading: 'Zapisujte příznaky a jídlo do deníku', text: 'V aplikaci Bejby bez alergií zapíšete ekzém, bříško, stolici i spánek za pár vteřin – a snáz uvidíte, po které potravině se potíže opakují.' },
  eczema: { eyebrow: 'Kalendář projevů', heading: 'Sledujte ekzém miminka a hledejte spouštěče', text: 'Zapisujte stav kůže spolu s jídlem, nemocí i růstem zoubků. Aplikace Bejby bez alergií vám pomůže vidět souvislosti a projít eliminačně-expoziční dietou krok za krokem.' },
  diet: { eyebrow: 'Eliminační dieta krok za krokem', heading: 'Projděte eliminační dietou s jasným plánem', text: 'Aplikace Bejby bez alergií vás vede jednoduchými denními kroky – od hlavních podezřelých přes testování až po trénink alergenů – a nabízí recepty vhodné pro aktuální fázi diety.' },
};
export const CATEGORY_CTA = { 'potravinova-alergie': CTA.signs, 'eliminacni-dieta': CTA.diet, ekzem: CTA.eczema, 'specificka-temata': CTA.signs };

export function absoluteUrl(pathname) {
  return `${SITE_URL}${pathname}`;
}

export function escapeHtml(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function stripTags(html) {
  return String(html).replace(/<[^>]+>/g, '');
}

export function localizedPath(slug, lang) {
  if (lang === 'en') return slug === 'app' ? '/en/' : `/en/${slug}/`;
  return slug === 'app' ? '/' : `/${slug}/`;
}

export function campaignId(slug, lang) {
  return `${slug}-${lang === 'en' ? 'en' : 'cz'}`;
}

// Store links: Google Play install referrer with UTM, App Store campaign token (ct) + provider token (pt).
export function googlePlayUrl(lang, campaign) {
  const referrer = encodeURIComponent(`utm_source=babyapp.cz&utm_medium=web&utm_campaign=${campaign}`);
  return `https://play.google.com/store/apps/details?id=cz.babyapp.app&amp;hl=${lang === 'en' ? 'en' : 'cs'}&amp;referrer=${referrer}`;
}

export function appStoreUrl(lang, campaign) {
  return `https://apps.apple.com/cz/app/bejby-bez-alergi%C3%AD/id${APP_STORE_ID}?l=${lang === 'en' ? 'en' : 'cs'}&amp;pt=PROVIDER_TOKEN&amp;ct=${campaign}`;
}

// Storyblok image service: resized JPG/WebP straight from the CDN the app uses.
export function storyblokImage(url, width, height = 0, webp = false) {
  return `${url}/m/${width}x${height}/filters:quality(78)${webp ? ':format(webp)' : ''}`;
}

export function storyblokSize(url, width) {
  const m = url.match(/\/(\d+)x(\d+)\//);
  return m ? [width, Math.round((width * Number(m[2])) / Number(m[1]))] : [width, Math.round(width * 0.66)];
}


// ── Shared page chrome ─────────────────────────────────────────────────

// CZ: Aplikace · Průvodce (+ categories) · Recepty · O projektu. EN keeps the original article nav.
export function topNav({ lang, active, czUrl, enUrl }) {
  const isEn = lang === 'en';
  const current = (key) => (key === active ? ' class="is-active" aria-current="page"' : '');
  const langSwitch = `<div class="lang"><a class="lang__item${isEn ? '' : ' is-active'}" href="${czUrl}"${isEn ? '' : ' aria-current="page"'}>CZ</a><span class="lang__sep" aria-hidden="true">/</span><a class="lang__item${isEn ? ' is-active' : ''}" href="${enUrl}"${isEn ? ' aria-current="page"' : ''}>EN</a></div>`;
  const mobileLangs = `<div class="mobile__langs"><a${isEn ? '' : ' class="is-active"'} href="${czUrl}">CZ</a><a${isEn ? ' class="is-active"' : ''} href="${enUrl}">EN</a></div>`;
  const brand = `<a class="brand" href="${isEn ? '/en/' : '/'}" aria-label="${BRAND[lang]}"><img class="brand__logo" src="/assets/logo.svg" alt="" width="42" height="42"><span class="brand__name">${BRAND[lang]}</span></a>`;
  const burger = `<button class="burger" id="burger" aria-label="${isEn ? 'Open menu' : 'Otevřít menu'}" aria-expanded="false"><span></span><span></span><span></span></button>`;

  if (isEn) {
    const items = [['app', '/en/', NAV_EN.app], ['eczema', '/en/eczema/', NAV_EN.eczema], ['signs', '/en/signs/', NAV_EN.signs], ['main-suspects', '/en/main-suspects/', NAV_EN.main]];
    const links = items.map(([key, href, label]) => `<a href="${href}"${current(key)}>${label}</a>`).join('\n      ');
    return `
<header class="topbar">
  <div class="container topbar__inner">
    ${brand}
    <nav class="nav nav--primary" aria-label="Main navigation">
      ${links}
    </nav>
    ${langSwitch}
    ${burger}
  </div>
  <div class="mobile" id="mobileNav" hidden>
    ${links}
    ${mobileLangs}
  </div>
</header>`;
  }

  const categoryLinks = categories.map((c) => `<a href="${categoryPath(c.slug)}">${c.title}</a>`).join('');
  return `
<header class="topbar">
  <div class="container topbar__inner">
    ${brand}
    <nav class="nav nav--primary" aria-label="Hlavní navigace">
      <a href="/"${current('app')}>Aplikace</a>
      <div class="nav__group"><a href="/pruvodce/"${current('guide')} aria-haspopup="true">Průvodce</a><div class="nav__menu">${categoryLinks}</div></div>
      <a href="/recepty/"${current('recipes')}>Recepty</a>
      <a href="/o-projektu/"${current('about')}>O projektu</a>
    </nav>
    ${langSwitch}
    ${burger}
  </div>
  <div class="mobile" id="mobileNav" hidden>
    <a href="/"${current('app')}>Aplikace</a>
    <a href="/pruvodce/"${current('guide')}>Průvodce</a>
    <div class="mobile__sub">${categoryLinks}</div>
    <a href="/recepty/"${current('recipes')}>Recepty</a>
    <a href="/o-projektu/"${current('about')}>O projektu</a>
    ${mobileLangs}
  </div>
</header>`;
}

export function siteFooter(lang) {
  const isEn = lang === 'en';
  const links = isEn
    ? [['/en/eczema/', 'Baby eczema'], ['/en/signs/', 'Food allergy signs in babies'], ['/en/main-suspects/', 'Elimination diet'], ['/en/privacy-policy/', 'Privacy Policy'], ['/en/medical-disclaimer/', 'Medical Disclaimer'], ['/en/terms-of-use/', 'Terms of Use'], ['/en/sources/', 'Sources']]
    : [['/pruvodce/', 'Průvodce'], ['/eczema/', 'Ekzém u miminka'], ['/signs/', 'Projevy potravinové alergie'], ['/main-suspects/', 'Eliminační dieta'], ['/privacy-policy/', 'Zásady ochrany osobních údajů'], ['/medical-disclaimer/', 'Zdravotní upozornění'], ['/terms-of-use/', 'Podmínky používání'], ['/zdroje/', 'Odborné zdroje']];
  return `<footer class="footer"><div class="container footer__inner"><p>© <span id="year"></span> ${BRAND[lang]}</p><div class="footer__links">${links.map(([href, label]) => `<a href="${href}">${label}</a>`).join('')}</div></div></footer>`;
}

export function breadcrumbs(lang, trail) {
  const isEn = lang === 'en';
  if (trail.length < 2) return '';
  const parts = trail.map(([label, href], i) => (i === trail.length - 1 ? `<span aria-current="page">${label}</span>` : `<a href="${href}">${label}</a>`));
  return `<nav class="breadcrumbs container" aria-label="${isEn ? 'Breadcrumbs' : 'Drobečková navigace'}">${parts.join('<span aria-hidden="true">›</span>')}</nav>`;
}

export function breadcrumbJsonLd(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, href], i) => ({ '@type': 'ListItem', position: i + 1, name: stripTags(name), item: absoluteUrl(href) })),
  };
}

export const ORGANIZATION = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Bejby bez alergií',
  alternateName: 'Baby w/o allergies',
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: absoluteUrl('/assets/favicon.png'), width: 304, height: 304 },
};

export function renderPage({ lang, title, description, canonical, alternates, ogType = 'website', image, imageAlt, robots = 'max-image-preview:large', jsonLd = [], extraHead = [], nav, main }) {
  const isEn = lang === 'en';
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const head = [
    `<meta name="robots" content="${robots}" />`,
    `<meta name="author" content="${AUTHOR.name}" />`,
    `<meta name="apple-itunes-app" content="app-id=${APP_STORE_ID}" />`,
    `<meta property="og:site_name" content="${BRAND[lang]}" />`,
    `<meta property="og:locale" content="${isEn ? 'en_US' : 'cs_CZ'}" />`,
    alternates ? `<meta property="og:locale:alternate" content="${isEn ? 'cs_CZ' : 'en_US'}" />` : '',
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:title" content="${safeTitle}" />`,
    `<meta property="og:description" content="${safeDescription}" />`,
    `<meta property="og:url" content="${absoluteUrl(canonical)}" />`,
    `<meta property="og:image" content="${image}" />`,
    imageAlt ? `<meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />` : '',
    ...extraHead,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${safeTitle}" />`,
    `<meta name="twitter:description" content="${safeDescription}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<link rel="canonical" href="${absoluteUrl(canonical)}" />`,
    ...(alternates
      ? [`<link rel="alternate" hreflang="cs" href="${absoluteUrl(alternates.cs)}" />`, `<link rel="alternate" hreflang="en" href="${absoluteUrl(alternates.en)}" />`, `<link rel="alternate" hreflang="x-default" href="${absoluteUrl(alternates.cs)}" />`]
      : []),
    '<link rel="icon" href="/favicon.ico" sizes="any" />',
    '<link rel="icon" href="/assets/favicon.png" type="image/png" sizes="304x304" />',
    '<link rel="apple-touch-icon" href="/assets/favicon.png" sizes="304x304" />',
    '<link rel="manifest" href="/site.webmanifest" />',
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link rel="stylesheet" href="/assets/styles.css" />',
    ...jsonLd.map((data) => `<script type="application/ld+json">${JSON.stringify(data)}</script>`),
  ].filter(Boolean);

  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${safeTitle}</title>
  <meta name="description" content="${safeDescription}" />
  ${head.join('\n  ')}
</head>
<body>
${nav}
<main>
${main}
</main>
${siteFooter(lang)}
<script>
(function(){const burger=document.getElementById('burger');const mobileNav=document.getElementById('mobileNav');if(!burger||!mobileNav)return;burger.addEventListener('click',()=>{const isOpen=burger.getAttribute('aria-expanded')==='true';burger.setAttribute('aria-expanded',String(!isOpen));mobileNav.hidden=isOpen;});mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{burger.setAttribute('aria-expanded','false');mobileNav.hidden=true;}));})();
(function(){const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();})();
</script>
</body>
</html>`;
}

export function storeBadges(lang, campaign) {
  const isEn = lang === 'en';
  return `<div class="store-links store-links--cta" aria-label="${isEn ? 'App download links' : 'Odkazy ke stažení aplikace'}"><a class="store-badge-link" href="${googlePlayUrl(lang, campaign)}" target="_blank" rel="noopener noreferrer" aria-label="${isEn ? 'Get Baby w/o allergies on Google Play' : 'Stáhnout aplikaci Bejby bez alergií na Google Play'}"><img class="store-badge" src="/assets/google-play-badge-${isEn ? 'en' : 'cs'}.png" alt="${isEn ? 'Get it on Google Play' : 'Stáhnout na Google Play'}" width="478" height="142" loading="lazy" decoding="async"></a><a class="store-badge-link" href="${appStoreUrl(lang, campaign)}" target="_blank" rel="noopener noreferrer" aria-label="${isEn ? 'Download Baby w/o allergies on the App Store' : 'Stáhnout aplikaci Bejby bez alergií v App Storu'}"><img class="store-badge" src="/assets/app_store_badge_${isEn ? 'en' : 'cs'}.svg" alt="${isEn ? 'Download on the App Store' : 'Stáhnout v App Storu'}" width="120" height="40" loading="lazy" decoding="async"></a></div>`;
}

export function appCta(lang, cta, campaign) {
  return `<section class="article-cta"><div><span>${cta.eyebrow}</span><h2>${cta.heading}</h2><p>${cta.text}</p></div>${storeBadges(lang, campaign)}</section>`;
}

export async function write(relPath, html) {
  const out = path.join(root, relPath);
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, html, 'utf8');
}

