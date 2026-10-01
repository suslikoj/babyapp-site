import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { categories, articles as guideArticles, categoryPath, articlePath, categoryItems } from '../content/pruvodce.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const NAV_CS = { app: 'Aplikace', eczema: 'Ekzém u dětí', signs: 'Projevy potravinové alergie', main: 'Eliminační dieta' };
const NAV_EN = { app: 'App', eczema: 'Eczema in children', signs: 'Signs of food allergy', main: 'Main suspects' };

// title = short label (navigation, breadcrumbs, related cards); seoTitle = <title>/og:title; H1 lives in the Markdown file.
const pages = [
  {
    slug: 'eczema', lang: 'cs', title: 'Ekzém u dětí',
    seoTitle: 'Ekzém u miminka: jak ho poznat a jak pečovat o kůži',
    description: 'Jak poznat ekzém u miminka, proč vzniká, co ho zhoršuje, kdy kůži promazávat a kdy s dítětem k lékaři. Praktický průvodce pro rodiče kojenců i batolat.',
    input: 'content/cz/eczema_cz.md', output: 'eczema/index.html',
    hero: '/assets/article-eczema.jpg', heroWebp: '/assets/article-eczema.webp', heroSize: [4000, 6000],
    heroAlt: 'Ruka s drobnou červenou vyrážkou na kůži',
    cta: { eyebrow: 'Kalendář projevů', heading: 'Sledujte ekzém miminka a hledejte spouštěče', text: 'Zapisujte stav kůže spolu s jídlem, nemocí i růstem zoubků. Aplikace Bejby bez alergií vám pomůže vidět souvislosti a projít eliminačně-expoziční dietou krok za krokem.' },
    nav: NAV_CS,
  },
  {
    slug: 'signs', lang: 'cs', title: 'Projevy potravinové alergie',
    seoTitle: 'Projevy potravinové alergie u kojenců a batolat',
    description: 'Jak se potravinová alergie projevuje u kojených i nekojených miminek: ekzém, hlen či krev ve stolici, koliky, reflux i rychlé reakce. Kdy jít k lékaři.',
    input: 'content/cz/signs_cz.md', output: 'signs/index.html',
    hero: '/assets/article-signs.png', heroWebp: '/assets/article-signs.webp', heroSize: [613, 393],
    heroAlt: 'Miminko se zarudlou tvářičkou',
    cta: { eyebrow: 'Deník příznaků a jídla', heading: 'Zapisujte příznaky a jídlo do deníku', text: 'V aplikaci Bejby bez alergií zapíšete ekzém, bříško, stolici i spánek za pár vteřin – a snáz uvidíte, po které potravině se potíže opakují.' },
    nav: NAV_CS,
  },
  {
    slug: 'main-suspects', lang: 'cs', title: 'Eliminační dieta',
    seoTitle: 'Eliminační dieta při kojení a u miminka: jak začít',
    description: 'Jak začít eliminační dietu při kojení nebo u miminka: které potraviny na 14 dní vyřadit, co sledovat, nejčastější chyby a co dělat, když se stav zlepší.',
    input: 'content/cz/main_cz.md', output: 'main-suspects/index.html',
    hero: '/assets/article-main.jpg', heroWebp: '/assets/article-main.webp', heroSize: [3456, 3456],
    heroAlt: 'Volská oka a sklenice mléka – vejce a mléko patří mezi hlavní podezřelé potraviny',
    cta: { eyebrow: 'Eliminační dieta krok za krokem', heading: 'Projděte 1. fází diety s jasným plánem', text: 'Aplikace Bejby bez alergií vás 14 dní vede jednoduchými denními kroky, pomáhá sledovat, jestli se stav miminka zlepšuje, a nabízí recepty vhodné pro aktuální fázi diety.' },
    nav: NAV_CS,
  },
  {
    slug: 'eczema', lang: 'en', title: 'Eczema in children',
    seoTitle: 'Baby Eczema or Dry Skin? Signs, Dry Patches & Causes',
    description: 'Dry patches on baby skin – eczema or just dry skin? How to recognize baby eczema, what causes it, what makes it worse and when to see a doctor.',
    input: 'content/en/eczema_en.md', output: 'en/eczema/index.html',
    hero: '/assets/article-eczema.jpg', heroWebp: '/assets/article-eczema.webp', heroSize: [4000, 6000],
    heroAlt: 'Hand covered with a small red skin rash',
    cta: { eyebrow: 'Symptom calendar', heading: 'Track your baby’s eczema and find triggers', text: 'Log skin flares together with foods, illness and teething. Baby w/o allergies helps you see patterns and guides you through an elimination-exposure diet step by step.' },
    nav: NAV_EN,
  },
  {
    slug: 'signs', lang: 'en', title: 'Signs of food allergy',
    seoTitle: 'Food Allergy Signs in Babies: Symptoms to Watch For',
    description: 'Food allergy symptoms in breastfed and formula-fed babies: eczema flares, mucus or blood in stool, colic, reflux and fast reactions. When to see a doctor.',
    input: 'content/en/signs_en.md', output: 'en/signs/index.html',
    hero: '/assets/article-signs.png', heroWebp: '/assets/article-signs.webp', heroSize: [613, 393],
    heroAlt: 'Baby with a red, flushed cheek',
    cta: { eyebrow: 'Symptom & food diary', heading: 'Log symptoms and foods in one diary', text: 'With Baby w/o allergies you can log eczema, tummy, stool and sleep in seconds – and more easily see which food keeps coming back before a flare-up.' },
    nav: NAV_EN,
  },
  {
    slug: 'main-suspects', lang: 'en', title: 'Main suspects',
    seoTitle: 'Elimination Diet for Babies & Breastfeeding: Phase 1',
    description: 'How to start an elimination diet for your baby or while breastfeeding: which foods to remove for 14 days, what to track, common mistakes and next steps.',
    input: 'content/en/main_en.md', output: 'en/main-suspects/index.html',
    hero: '/assets/article-main.jpg', heroWebp: '/assets/article-main.webp', heroSize: [3456, 3456],
    heroAlt: 'Fried eggs and a glass of milk – eggs and milk are among the main suspected foods',
    cta: { eyebrow: 'Elimination diet step by step', heading: 'Go through phase 1 with a clear plan', text: 'Baby w/o allergies guides you through 14 days with simple daily steps, helps you track whether your baby is improving and suggests recipes that fit the current diet phase.' },
    nav: NAV_EN,
  },
];

const SITE_URL = 'https://babyapp.cz';
const PUBLISHED = '2026-03-01';
const UPDATED = '2026-10-01';
const APP_STORE_ID = '6776690582';
const AUTHOR = {
  name: 'Jiřina Brázdová',
  photo: '/assets/jirina-brazdova.jpg',
  photoWebp: '/assets/jirina-brazdova.webp',
};
const BRAND = { cs: 'Bejby bez alergií', en: 'Baby w/o allergies' };

// Topic-specific app CTA, shared by legacy articles (by slug) and guide articles (by category).
const CTA = {
  signs: { eyebrow: 'Deník příznaků a jídla', heading: 'Zapisujte příznaky a jídlo do deníku', text: 'V aplikaci Bejby bez alergií zapíšete ekzém, bříško, stolici i spánek za pár vteřin – a snáz uvidíte, po které potravině se potíže opakují.' },
  eczema: { eyebrow: 'Kalendář projevů', heading: 'Sledujte ekzém miminka a hledejte spouštěče', text: 'Zapisujte stav kůže spolu s jídlem, nemocí i růstem zoubků. Aplikace Bejby bez alergií vám pomůže vidět souvislosti a projít eliminačně-expoziční dietou krok za krokem.' },
  diet: { eyebrow: 'Eliminační dieta krok za krokem', heading: 'Projděte eliminační dietou s jasným plánem', text: 'Aplikace Bejby bez alergií vás vede jednoduchými denními kroky – od hlavních podezřelých přes testování až po trénink alergenů – a nabízí recepty vhodné pro aktuální fázi diety.' },
};
const CATEGORY_CTA = { 'potravinova-alergie': CTA.signs, 'eliminacni-dieta': CTA.diet, ekzem: CTA.eczema, 'specificka-temata': CTA.signs };

function absoluteUrl(pathname) {
  return `${SITE_URL}${pathname}`;
}

function escapeHtml(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function stripTags(html) {
  return String(html).replace(/<[^>]+>/g, '');
}

function localizedPath(slug, lang) {
  if (lang === 'en') return slug === 'app' ? '/en/' : `/en/${slug}/`;
  return slug === 'app' ? '/' : `/${slug}/`;
}

function campaignId(slug, lang) {
  return `${slug}-${lang === 'en' ? 'en' : 'cz'}`;
}

// Store links: Google Play install referrer with UTM, App Store campaign token (ct) + provider token (pt).
function googlePlayUrl(lang, campaign) {
  const referrer = encodeURIComponent(`utm_source=babyapp.cz&utm_medium=web&utm_campaign=${campaign}`);
  return `https://play.google.com/store/apps/details?id=cz.babyapp.app&amp;hl=${lang === 'en' ? 'en' : 'cs'}&amp;referrer=${referrer}`;
}

function appStoreUrl(lang, campaign) {
  return `https://apps.apple.com/cz/app/bejby-bez-alergi%C3%AD/id${APP_STORE_ID}?l=${lang === 'en' ? 'en' : 'cs'}&amp;pt=PROVIDER_TOKEN&amp;ct=${campaign}`;
}

// Storyblok image service: resized JPG/WebP straight from the CDN the app uses.
function storyblokImage(url, width, height = 0, webp = false) {
  return `${url}/m/${width}x${height}/filters:quality(78)${webp ? ':format(webp)' : ''}`;
}

function storyblokSize(url, width) {
  const m = url.match(/\/(\d+)x(\d+)\//);
  return m ? [width, Math.round((width * Number(m[2])) / Number(m[1]))] : [width, Math.round(width * 0.66)];
}

// ── Markdown ───────────────────────────────────────────────────────────

function slugify(text) {
  return stripTags(text).toLocaleLowerCase('en').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function applyInline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*\w])\*(?!\s)([^*]+?)\*(?!\*)/g, '$1<em>$2</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}

function markdownToHtml(md, { headingIds = ['h2'] } = {}) {
  const lines = md.replace(/\r?\n/g, '\n').split('\n');
  const usedIds = new Set();
  let html = '';
  let paragraph = [];
  let listItems = [];
  let listTag = 'ul';

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html += `<p>${applyInline(paragraph.join(' ').replace(/\s+/g, ' ').trim())}</p>`;
    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length) return;
    html += `<${listTag}>` + listItems.map((item) => `<li>${applyInline(item.trim())}</li>`).join('') + `</${listTag}>`;
    listItems = [];
  };

  for (const rawLine of lines) {
    const trimmed = rawLine.replace(/ /g, ' ').trim();

    if (!trimmed) {
      flushParagraph();
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    const numbered = trimmed.match(/^\d+\.\s+(.+)$/);

    if (heading) {
      flushParagraph();
      flushList();
      const tag = `h${heading[1].length}`;
      const text = heading[2].replace(/^\*\*(.+)\*\*$/, '$1').trim();
      let id = '';
      if (headingIds.includes(tag)) {
        let base = slugify(text) || 'sekce';
        let candidate = base;
        for (let n = 2; usedIds.has(candidate); n += 1) candidate = `${base}-${n}`;
        usedIds.add(candidate);
        id = ` id="${candidate}"`;
      }
      html += `<${tag}${id}>${applyInline(text)}</${tag}>`;
      continue;
    }

    if (bullet || numbered) {
      flushParagraph();
      const tag = numbered && !bullet ? 'ol' : 'ul';
      if (listItems.length && tag !== listTag) flushList();
      listTag = tag;
      listItems.push((bullet || numbered)[1]);
      continue;
    }

    if (/^\s+/.test(rawLine) && listItems.length) {
      listItems[listItems.length - 1] += ` ${trimmed}`;
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  return html;
}

function splitSources(markdown, lang) {
  const sourceHeading = lang === 'cs' ? 'Zdroje' : 'Sources';
  const re = new RegExp(`^##\\s+\\**${sourceHeading}\\**\\s*$`, 'im');
  const match = markdown.match(re);
  if (!match || match.index === undefined) return { body: markdown, sources: '' };
  return {
    body: markdown.slice(0, match.index).trim(),
    sources: markdown.slice(match.index + match[0].length).trim(),
  };
}

// ── Shared page chrome ─────────────────────────────────────────────────

// CZ: Aplikace · Průvodce (+ categories) · Recepty · O projektu · [Stáhnout]. EN keeps the original article nav.
function topNav({ lang, active, czUrl, enUrl }) {
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
    <a class="btn btn--primary nav-cta" href="/#testovani">Stáhnout aplikaci</a>
    ${langSwitch}
    ${burger}
  </div>
  <div class="mobile" id="mobileNav" hidden>
    <a href="/"${current('app')}>Aplikace</a>
    <a href="/pruvodce/"${current('guide')}>Průvodce</a>
    <div class="mobile__sub">${categoryLinks}</div>
    <a href="/recepty/"${current('recipes')}>Recepty</a>
    <a href="/o-projektu/"${current('about')}>O projektu</a>
    <a class="btn btn--primary mobile__cta" href="/#testovani">Stáhnout aplikaci</a>
    ${mobileLangs}
  </div>
</header>`;
}

function siteFooter(lang) {
  const isEn = lang === 'en';
  const links = isEn
    ? [['/en/eczema/', 'Baby eczema'], ['/en/signs/', 'Food allergy signs in babies'], ['/en/main-suspects/', 'Elimination diet'], ['/en/privacy-policy/', 'Privacy Policy'], ['/en/medical-disclaimer/', 'Medical Disclaimer'], ['/en/terms-of-use/', 'Terms of Use'], ['/en/sources/', 'Sources']]
    : [['/pruvodce/', 'Průvodce'], ['/eczema/', 'Ekzém u miminka'], ['/signs/', 'Projevy potravinové alergie'], ['/main-suspects/', 'Eliminační dieta'], ['/privacy-policy/', 'Zásady ochrany osobních údajů'], ['/medical-disclaimer/', 'Zdravotní upozornění'], ['/terms-of-use/', 'Podmínky používání'], ['/zdroje/', 'Odborné zdroje']];
  return `<footer class="footer"><div class="container footer__inner"><p>© <span id="year"></span> ${BRAND[lang]}</p><div class="footer__links">${links.map(([href, label]) => `<a href="${href}">${label}</a>`).join('')}</div></div></footer>`;
}

function breadcrumbs(lang, trail) {
  const isEn = lang === 'en';
  const parts = trail.map(([label, href], i) => (i === trail.length - 1 ? `<span aria-current="page">${label}</span>` : `<a href="${href}">${label}</a>`));
  return `<nav class="breadcrumbs container" aria-label="${isEn ? 'Breadcrumbs' : 'Drobečková navigace'}">${parts.join('<span aria-hidden="true">›</span>')}</nav>`;
}

function breadcrumbJsonLd(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, href], i) => ({ '@type': 'ListItem', position: i + 1, name: stripTags(name), item: absoluteUrl(href) })),
  };
}

const ORGANIZATION = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Bejby bez alergií',
  alternateName: 'Baby w/o allergies',
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: absoluteUrl('/assets/favicon.png'), width: 304, height: 304 },
};

function renderPage({ lang, title, description, canonical, alternates, ogType = 'website', image, imageAlt, robots = 'max-image-preview:large', jsonLd = [], extraHead = [], nav, main }) {
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

// ── Article building blocks ────────────────────────────────────────────

function tableOfContents(bodyHtml, lang, extra = []) {
  const isEn = lang === 'en';
  let entries = [...bodyHtml.matchAll(/<h2 id="([^"]+)">(.+?)<\/h2>/g)];
  if (entries.length < 3) {
    const h3 = [...bodyHtml.matchAll(/<h3 id="([^"]+)">(.+?)<\/h3>/g)];
    if (h3.length > entries.length) entries = h3;
  }
  const items = [...entries.map(([, id, label]) => [id, stripTags(label)]), ...extra];
  if (items.length < 2) return '';
  const label = isEn ? 'On this page' : 'Obsah článku';
  return `<nav class="article-toc" aria-label="${label}"><strong>${label}</strong><ol>${items.map(([id, text]) => `<li><a href="#${id}">${text}</a></li>`).join('')}</ol></nav>`;
}

function authorBox(lang) {
  const isEn = lang === 'en';
  const updatedLabel = isEn ? 'October 1, 2026' : '1. 10. 2026';
  return `<aside class="author-box" aria-label="${isEn ? 'About the author' : 'O autorce'}"><picture><source srcset="${AUTHOR.photoWebp}" type="image/webp"><img class="author-box__photo" src="${AUTHOR.photo}" alt="${AUTHOR.name}" width="320" height="320" loading="lazy" decoding="async"></picture><div class="author-box__body"><span class="author-box__eyebrow">${isEn ? 'About the author' : 'Autorka článku'}</span><strong class="author-box__name">${AUTHOR.name}</strong><p class="author-box__role">${isEn ? 'Nutrition consultant and mum of a child with multiple allergies' : 'Výživová poradkyně a máma dítěte multialergika'}</p><p class="author-box__meta">${isEn ? 'Last updated' : 'Naposledy aktualizováno'} <time datetime="${UPDATED}">${updatedLabel}</time> · <a href="${isEn ? '/en/sources/' : '/zdroje/'}">${isEn ? 'Sources we rely on' : 'Odborné zdroje'}</a></p></div></aside>`;
}

function medicalNote(lang) {
  const isEn = lang === 'en';
  return `<aside class="medical-note"><strong>${isEn ? 'Health notice' : 'Zdravotní upozornění'}</strong><p>${isEn ? 'This article is educational and does not replace diagnosis or care from a doctor. Seek urgent medical help for breathing difficulties, swelling or suspected anaphylaxis.' : 'Článek má vzdělávací charakter a nenahrazuje diagnózu ani péči lékaře. Při dušnosti, otoku nebo podezření na anafylaxi volejte neprodleně zdravotnickou pomoc.'}</p><a href="${isEn ? '/en/medical-disclaimer/' : '/medical-disclaimer/'}">${isEn ? 'Full health notice' : 'Celé zdravotní upozornění'}</a></aside>`;
}

function storeBadges(lang, campaign) {
  const isEn = lang === 'en';
  return `<div class="store-links store-links--cta" aria-label="${isEn ? 'App download links' : 'Odkazy ke stažení aplikace'}"><a class="store-badge-link" href="${googlePlayUrl(lang, campaign)}" target="_blank" rel="noopener noreferrer" aria-label="${isEn ? 'Get Baby w/o allergies on Google Play' : 'Stáhnout aplikaci Bejby bez alergií na Google Play'}"><img class="store-badge" src="/assets/google-play-badge-${isEn ? 'en' : 'cs'}.png" alt="${isEn ? 'Get it on Google Play' : 'Stáhnout na Google Play'}" width="478" height="142" loading="lazy" decoding="async"></a><a class="store-badge-link" href="${appStoreUrl(lang, campaign)}" target="_blank" rel="noopener noreferrer" aria-label="${isEn ? 'Download Baby w/o allergies on the App Store' : 'Stáhnout aplikaci Bejby bez alergií v App Storu'}"><img class="store-badge" src="/assets/app_store_badge_${isEn ? 'en' : 'cs'}.svg" alt="${isEn ? 'Download on the App Store' : 'Stáhnout v App Storu'}" width="120" height="40" loading="lazy" decoding="async"></a></div>`;
}

function appCta(lang, cta, campaign) {
  return `<section class="article-cta"><div><span>${cta.eyebrow}</span><h2>${cta.heading}</h2><p>${cta.text}</p></div>${storeBadges(lang, campaign)}</section>`;
}

function articleMeta(lang) {
  const isEn = lang === 'en';
  return `<div class="article-meta"><span>${isEn ? 'Written by' : 'Autorka'}: <strong>${AUTHOR.name}</strong></span><time datetime="${UPDATED}">${isEn ? 'Updated October 1, 2026' : 'Aktualizováno 1. 10. 2026'}</time></div>`;
}

function articleJsonLd({ lang, headline, description, image, url, published, modified }) {
  const homeUrl = absoluteUrl(lang === 'en' ? '/en/' : '/');
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: [image],
    datePublished: published,
    dateModified: modified,
    inLanguage: lang,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Person', name: AUTHOR.name, jobTitle: lang === 'en' ? 'Nutrition consultant' : 'výživová poradkyně', image: absoluteUrl(AUTHOR.photo), url: `${homeUrl}#about` },
    publisher: ORGANIZATION,
  };
}

const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

function guideTrail(categorySlug, last) {
  const trail = [['Aplikace', '/'], ['Průvodce', '/pruvodce/']];
  if (categorySlug) trail.push([categoryBySlug[categorySlug].title, categoryPath(categorySlug)]);
  if (last) trail.push(last);
  return trail;
}

function relatedCards(categorySlug, currentHref) {
  const items = categoryItems(categorySlug).filter((item) => item.href !== currentHref);
  const category = categoryBySlug[categorySlug];
  return `<section class="related"><h2>Další články: ${category.title}</h2><div class="related-grid">${items.map((item) => `<a class="related-card" href="${item.href}"><span>Číst dále</span><strong>${item.title}</strong></a>`).join('')}</div><p class="related__more"><a href="${categoryPath(categorySlug)}">Všechny články v kategorii ${category.title} →</a> · <a href="/pruvodce/">Celý průvodce →</a></p></section>`;
}

// ── Legacy articles (/eczema/, /signs/, /main-suspects/ + EN) ──────────

const LEGACY_CATEGORY = { eczema: 'ekzem', signs: 'potravinova-alergie', 'main-suspects': 'eliminacni-dieta' };
const LEGACY_CTA = { eczema: CTA.eczema, signs: CTA.signs, 'main-suspects': { ...CTA.diet, heading: 'Projděte 1. fází diety s jasným plánem', text: 'Aplikace Bejby bez alergií vás 14 dní vede jednoduchými denními kroky, pomáhá sledovat, jestli se stav miminka zlepšuje, a nabízí recepty vhodné pro aktuální fázi diety.' } };

function legacyArticlePage(page, bodyHtml, sourcesHtml) {
  const isEn = page.lang === 'en';
  const canonicalPath = localizedPath(page.slug, page.lang);
  const categorySlug = isEn ? null : LEGACY_CATEGORY[page.slug];
  const trail = isEn ? [['App', '/en/'], [page.title, canonicalPath]] : guideTrail(categorySlug, [page.title, canonicalPath]);
  const related = isEn
    ? `<section class="related"><h2>Related articles</h2><div class="related-grid">${pages.filter((item) => item.lang === page.lang && item.slug !== page.slug).map((item) => `<a class="related-card" href="${localizedPath(item.slug, item.lang)}"><span>Read next</span><strong>${item.title}</strong></a>`).join('')}</div></section>`
    : relatedCards(categorySlug, canonicalPath);
  const [heroWidth, heroHeight] = page.heroSize;
  const main = `  ${breadcrumbs(page.lang, trail)}
  <section class="article-hero">
    <picture><source srcset="${page.heroWebp}" type="image/webp"><img src="${page.hero}" alt="${escapeHtml(page.heroAlt)}" class="article-hero__image" width="${heroWidth}" height="${heroHeight}" fetchpriority="high" decoding="async" /></picture>
  </section>
  <article class="article-content container">
    ${articleMeta(page.lang)}
    ${tableOfContents(bodyHtml, page.lang)}
    ${bodyHtml}
    ${sourcesHtml ? `<section class="article-sources"><h2>${isEn ? 'Sources' : 'Zdroje'}</h2>${sourcesHtml}</section>` : ''}
    ${authorBox(page.lang)}
    ${medicalNote(page.lang)}
    ${appCta(page.lang, isEn ? page.cta : LEGACY_CTA[page.slug], campaignId(page.slug, page.lang))}
    ${related}
  </article>`;
  const url = absoluteUrl(canonicalPath);
  return renderPage({
    lang: page.lang,
    title: page.seoTitle,
    description: page.description,
    canonical: canonicalPath,
    alternates: { cs: localizedPath(page.slug, 'cs'), en: localizedPath(page.slug, 'en') },
    ogType: 'article',
    image: absoluteUrl(page.hero),
    imageAlt: page.heroAlt,
    extraHead: [`<meta property="article:published_time" content="${PUBLISHED}" />`, `<meta property="article:modified_time" content="${UPDATED}" />`, `<meta property="article:author" content="${AUTHOR.name}" />`],
    jsonLd: [articleJsonLd({ lang: page.lang, headline: page.seoTitle, description: page.description, image: absoluteUrl(page.hero), url, published: PUBLISHED, modified: UPDATED }), breadcrumbJsonLd(trail)],
    nav: topNav({ lang: page.lang, active: isEn ? page.slug : 'guide', czUrl: localizedPath(page.slug, 'cs'), enUrl: localizedPath(page.slug, 'en') }),
    main,
  });
}

// ── Guide articles (/pruvodce/<kategorie>/<clanek>/) ───────────────────

function faqSection(faq) {
  if (!faq?.length) return '';
  return `<section class="article-faq"><h2 id="caste-otazky">Časté otázky</h2><div class="faq">${faq.map(({ q, a }) => `<details><summary>${q}</summary><div><p>${a}</p></div></details>`).join('')}</div></section>`;
}

function guideArticlePage(article, markdown) {
  const href = articlePath(article);
  const category = categoryBySlug[article.category];
  const body = markdownToHtml(markdown.replace(/^\s*#\s+.+\n/, ''), { headingIds: ['h2', 'h3'] });
  const trail = guideTrail(article.category, [article.title, href]);
  const [w, h] = storyblokSize(article.cover, 1600);
  const ogImage = storyblokImage(article.cover, 1200, 630);
  const main = `  ${breadcrumbs('cs', trail)}
  <section class="article-hero">
    <picture><source srcset="${storyblokImage(article.cover, 1600, 0, true)}" type="image/webp"><img src="${storyblokImage(article.cover, 1600)}" alt="${escapeHtml(article.coverAlt)}" class="article-hero__image" width="${w}" height="${h}" fetchpriority="high" decoding="async" /></picture>
  </section>
  <article class="article-content container">
    ${articleMeta('cs')}
    <h1>${article.h1}</h1>
    <div class="article-summary"><strong>Ve zkratce</strong><p>${article.summary}</p></div>
    ${tableOfContents(body, 'cs', article.faq?.length ? [['caste-otazky', 'Časté otázky']] : [])}
    ${body}
    ${faqSection(article.faq)}
    ${authorBox('cs')}
    ${medicalNote('cs')}
    ${appCta('cs', CATEGORY_CTA[article.category], `${article.slug}-cz`)}
    ${relatedCards(article.category, href)}
  </article>`;
  const url = absoluteUrl(href);
  const faqLd = article.faq?.length
    ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: article.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }]
    : [];
  return renderPage({
    lang: 'cs',
    title: article.seoTitle,
    description: article.description,
    canonical: href,
    alternates: null,
    ogType: 'article',
    image: ogImage,
    imageAlt: article.coverAlt,
    extraHead: [`<meta property="article:published_time" content="${article.published}" />`, `<meta property="article:modified_time" content="${UPDATED}" />`, `<meta property="article:author" content="${AUTHOR.name}" />`, `<meta property="article:section" content="${category.title}" />`],
    jsonLd: [articleJsonLd({ lang: 'cs', headline: article.seoTitle, description: article.description, image: ogImage, url, published: article.published, modified: UPDATED }), breadcrumbJsonLd(trail), ...faqLd],
    nav: topNav({ lang: 'cs', active: 'guide', czUrl: href, enUrl: '/en/' }),
    main,
  });
}

// ── Hubs ───────────────────────────────────────────────────────────────

function card(item, eyebrow) {
  return `<a class="blog-card" href="${item.href}"><span>${eyebrow}</span><h3>${item.title}</h3><p>${item.description}</p></a>`;
}

function guideHubPage() {
  const trail = guideTrail(null);
  const sections = categories.map((c) => `<section class="guide-category" id="${c.slug}">
      <div class="guide-category__head"><h2><a href="${categoryPath(c.slug)}">${c.title}</a></h2><p>${c.intro}</p></div>
      <div class="blog-grid">${categoryItems(c.slug).map((item) => card(item, c.title)).join('')}</div>
      <p class="guide-category__more"><a href="${categoryPath(c.slug)}">Vše o tématu ${c.title} →</a></p>
    </section>`).join('\n    ');
  const main = `  ${breadcrumbs('cs', trail)}
  <section class="section guide-hub">
    <div class="container">
      <div class="section-heading"><div><p class="eyebrow">Průvodce pro rodiče</p><h1>Průvodce ekzémem a potravinovou alergií u dětí</h1></div><p>Články z aplikace Bejby bez alergií: jak alergii a ekzém u miminka poznat, jak projít eliminační dietou a jak potraviny bezpečně vracet zpět.</p></div>
      <nav class="guide-chips" aria-label="Kategorie průvodce">${categories.map((c) => `<a href="#${c.slug}">${c.title}</a>`).join('')}</nav>
    ${sections}
      ${appCta('cs', CTA.diet, 'pruvodce-cz')}
    </div>
  </section>`;
  const items = categories.flatMap((c) => categoryItems(c.slug));
  return renderPage({
    lang: 'cs',
    title: 'Průvodce ekzémem a potravinovou alergií u dětí',
    description: 'Srozumitelné články pro rodiče miminek a batolat: potravinová alergie, eliminační dieta krok za krokem, ekzém, svědění, histamin a léčba.',
    canonical: '/pruvodce/',
    alternates: null,
    image: absoluteUrl('/assets/cz_screenshot.png'),
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Průvodce ekzémem a potravinovou alergií u dětí', url: absoluteUrl('/pruvodce/'), inLanguage: 'cs', publisher: ORGANIZATION, mainEntity: { '@type': 'ItemList', itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(item.href), name: item.title })) } },
      breadcrumbJsonLd(trail),
    ],
    nav: topNav({ lang: 'cs', active: 'guide', czUrl: '/pruvodce/', enUrl: '/en/' }),
    main,
  });
}

function categoryHubPage(category) {
  const href = categoryPath(category.slug);
  const trail = guideTrail(category.slug);
  const items = categoryItems(category.slug);
  const others = categories.filter((c) => c.slug !== category.slug);
  const main = `  ${breadcrumbs('cs', trail)}
  <section class="section guide-hub">
    <div class="container">
      <div class="section-heading"><div><p class="eyebrow">Průvodce</p><h1>${category.title}</h1></div><p>${category.intro}</p></div>
      <div class="blog-grid">${items.map((item) => card(item, category.title)).join('')}</div>
      <nav class="guide-chips guide-chips--others" aria-label="Další témata"><span>Další témata:</span>${others.map((c) => `<a href="${categoryPath(c.slug)}">${c.title}</a>`).join('')}</nav>
      ${appCta('cs', CATEGORY_CTA[category.slug], `${category.slug}-cz`)}
    </div>
  </section>`;
  return renderPage({
    lang: 'cs',
    title: category.seoTitle,
    description: category.description,
    canonical: href,
    alternates: null,
    image: absoluteUrl('/assets/cz_screenshot.png'),
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'CollectionPage', name: category.title, description: category.description, url: absoluteUrl(href), inLanguage: 'cs', publisher: ORGANIZATION, mainEntity: { '@type': 'ItemList', itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(item.href), name: item.title })) } },
      breadcrumbJsonLd(trail),
    ],
    nav: topNav({ lang: 'cs', active: 'guide', czUrl: href, enUrl: '/en/' }),
    main,
  });
}

// ── Placeholders until phase 2/3 (noindex, not in sitemap) ─────────────

function placeholderPage({ path: pagePath, active, title, eyebrow, heading, text }) {
  const main = `  ${breadcrumbs('cs', [['Aplikace', '/'], [eyebrow, pagePath]])}
  <section class="section guide-hub">
    <div class="container">
      <div class="section-heading"><div><p class="eyebrow">${eyebrow}</p><h1>${heading}</h1></div><p>${text}</p></div>
      <p><a class="btn btn--primary" href="/pruvodce/">Prohlédnout průvodce</a></p>
      ${appCta('cs', CTA.diet, `${active}-cz`)}
    </div>
  </section>`;
  return renderPage({
    lang: 'cs',
    title,
    description: text,
    canonical: pagePath,
    alternates: null,
    robots: 'noindex,follow',
    image: absoluteUrl('/assets/cz_screenshot.png'),
    nav: topNav({ lang: 'cs', active, czUrl: pagePath, enUrl: '/en/' }),
    main,
  });
}

// ── Build ──────────────────────────────────────────────────────────────

async function write(relPath, html) {
  const out = path.join(root, relPath);
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, html, 'utf8');
}

for (const page of pages) {
  const md = await fs.readFile(path.join(root, page.input), 'utf8');
  const { body, sources } = splitSources(md, page.lang);
  await write(page.output, legacyArticlePage(page, markdownToHtml(body), sources ? markdownToHtml(sources) : ''));
}

for (const article of guideArticles) {
  const md = await fs.readFile(path.join(root, 'content/cz/pruvodce', `${article.slug}.md`), 'utf8');
  await write(`${articlePath(article).slice(1)}index.html`, guideArticlePage(article, md));
}

await write('pruvodce/index.html', guideHubPage());
for (const category of categories) {
  await write(`${categoryPath(category.slug).slice(1)}index.html`, categoryHubPage(category));
}

await write('recepty/index.html', placeholderPage({ path: '/recepty/', active: 'recipes', title: 'Recepty bez alergenů | Bejby bez alergií', eyebrow: 'Recepty', heading: 'Recepty pro eliminační dietu', text: 'Připravujeme výběr receptů z aplikace Bejby bez alergií – filtrovaných podle druhu jídla, alergenů a času přípravy.' }));
await write('o-projektu/index.html', placeholderPage({ path: '/o-projektu/', active: 'about', title: 'O projektu | Bejby bez alergií', eyebrow: 'O projektu', heading: 'O projektu Bejby bez alergií', text: 'Brzy tu najdete příběh vzniku aplikace, kdo za ní stojí a jak nás kontaktovat.' }));

console.log(`Built ${pages.length} legacy articles, ${guideArticles.length} guide articles, ${categories.length + 1} hubs and 2 placeholders.`);
