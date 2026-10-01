import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
    description: 'Jak poznat ekzém u miminka a malého dítěte, proč vzniká, co ho zhoršuje, kdy kůži promazávat a kdy jít k lékaři. Praktický průvodce pro rodiče.',
    input: 'content/cz/eczema_cz.md', output: 'eczema/index.html',
    hero: '/assets/article-eczema.jpg', heroWebp: '/assets/article-eczema.webp', heroSize: [4000, 6000],
    heroAlt: 'Ruka s drobnou červenou vyrážkou na kůži',
    cta: { eyebrow: 'Kalendář projevů', heading: 'Sledujte ekzém miminka a hledejte spouštěče', text: 'Zapisujte stav kůže spolu s jídlem, nemocí i růstem zoubků. Aplikace Bejby bez alergií vám pomůže vidět souvislosti a projít eliminačně-expoziční dietou krok za krokem.' },
    nav: NAV_CS,
  },
  {
    slug: 'signs', lang: 'cs', title: 'Projevy potravinové alergie',
    seoTitle: 'Projevy potravinové alergie u miminka a kojence',
    description: 'Jak poznat potravinovou alergii u miminka a kojence: ekzém, hlen či krev ve stolici, koliky, reflux i rychlé reakce. Co sledovat a kdy jít k lékaři.',
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

function absoluteUrl(pathname) {
  return `${SITE_URL}${pathname}`;
}

function escapeHtml(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function localizedPath(slug, lang) {
  if (lang === 'en') return slug === 'app' ? '/en/' : `/en/${slug}/`;
  return slug === 'app' ? '/' : `/${slug}/`;
}

function campaignId(page) {
  return `${page.slug}-${page.lang === 'en' ? 'en' : 'cz'}`;
}

// Store links: Google Play install referrer with UTM, App Store campaign token (ct) + provider token (pt).
function googlePlayUrl(lang, campaign) {
  const referrer = encodeURIComponent(`utm_source=babyapp.cz&utm_medium=web&utm_campaign=${campaign}`);
  return `https://play.google.com/store/apps/details?id=cz.babyapp.app&amp;hl=${lang === 'en' ? 'en' : 'cs'}&amp;referrer=${referrer}`;
}

function appStoreUrl(lang, campaign) {
  return `https://apps.apple.com/cz/app/bejby-bez-alergi%C3%AD/id${APP_STORE_ID}?l=${lang === 'en' ? 'en' : 'cs'}&amp;pt=PROVIDER_TOKEN&amp;ct=${campaign}`;
}

function articleSeoLinks(page) {
  const canonicalPath = localizedPath(page.slug, page.lang);
  const alternateCsPath = localizedPath(page.slug, 'cs');
  const alternateEnPath = localizedPath(page.slug, 'en');

  return [
    `<link rel="canonical" href="${absoluteUrl(canonicalPath)}" />`,
    `<link rel="alternate" hreflang="cs" href="${absoluteUrl(alternateCsPath)}" />`,
    `<link rel="alternate" hreflang="en" href="${absoluteUrl(alternateEnPath)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${absoluteUrl(alternateCsPath)}" />`,
  ].join('\n  ');
}

function applyInline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}

function markdownToHtml(md) {
  const lines = md.replace(/\r?\n/g, '\n').split('\n');
  let html = '';
  let paragraph = [];
  let listItems = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html += `<p>${applyInline(paragraph.join(' ').replace(/\s+/g, ' ').trim())}</p>`;
    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length) return;
    html += '<ul>' + listItems.map((item) => `<li>${applyInline(item.trim())}</li>`).join('') + '</ul>';
    listItems = [];
  };

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushParagraph();
      continue;
    }

    const h1 = trimmed.match(/^#\s+(.+)$/);
    const h2 = trimmed.match(/^##\s+(.+)$/);
    const h3 = trimmed.match(/^###\s+(.+)$/);
    const h4 = trimmed.match(/^####\s+(.+)$/);
    const list = trimmed.match(/^[-*]\s+(.+)$/);

    if (h1 || h2 || h3 || h4) {
      flushParagraph();
      flushList();
      const tag = h1 ? 'h1' : h2 ? 'h2' : h3 ? 'h3' : 'h4';
      const text = (h1 || h2 || h3 || h4)[1].replace(/^\*\*(.+)\*\*$/, '$1');
      const id = tag === 'h2' ? ` id="${text.toLocaleLowerCase('en').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}"` : '';
      html += `<${tag}${id}>${applyInline(text)}</${tag}>`;
      continue;
    }

    if (list) {
      flushParagraph();
      listItems.push(list[1]);
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

function topNav({ lang, slug, nav }) {
  const isEn = lang === 'en';
  const urls = isEn ? { app: '/en/', eczema: '/en/eczema/', signs: '/en/signs/', main: '/en/main-suspects/' } : { app: '/', eczema: '/eczema/', signs: '/signs/', main: '/main-suspects/' };
  const oppositeLangUrl = isEn ? localizedPath(slug, 'cs') : localizedPath(slug, 'en');
  return `
<header class="topbar">
  <div class="container topbar__inner">
    <a class="brand" href="${urls.app}" aria-label="Baby app"><span class="brand__name">${isEn ? 'Baby w/o allergies' : 'Bejby bez alergií'}</span></a>
    <nav class="nav nav--primary" aria-label="${isEn ? 'Main navigation' : 'Hlavní navigace'}">
      <a href="${urls.app}" ${slug === 'app' ? 'class="is-active" aria-current="page"' : ''}>${nav.app}</a>
      <a href="${urls.eczema}" ${slug === 'eczema' ? 'class="is-active" aria-current="page"' : ''}>${nav.eczema}</a>
      <a href="${urls.signs}" ${slug === 'signs' ? 'class="is-active" aria-current="page"' : ''}>${nav.signs}</a>
      <a href="${urls.main}" ${slug === 'main-suspects' ? 'class="is-active" aria-current="page"' : ''}>${nav.main}</a>
    </nav>
    <div class="lang">${isEn ? `<a class=\"lang__item\" href=\"${oppositeLangUrl}\">CZ</a><span class=\"lang__sep\" aria-hidden=\"true\">/</span><a class=\"lang__item is-active\" href=\"${urls[slug === 'main-suspects' ? 'main' : slug]}\" aria-current=\"page\">EN</a>` : `<a class=\"lang__item is-active\" href=\"${urls[slug === 'main-suspects' ? 'main' : slug]}\" aria-current=\"page\">CZ</a><span class=\"lang__sep\" aria-hidden=\"true\">/</span><a class=\"lang__item\" href=\"${oppositeLangUrl}\">EN</a>`}</div>
    <button class="burger" id="burger" aria-label="${isEn ? 'Open menu' : 'Otevřít menu'}" aria-expanded="false"><span></span><span></span><span></span></button>
  </div>
  <div class="mobile" id="mobileNav" hidden>
    <a href="${urls.app}" ${slug === 'app' ? 'class="is-active" aria-current="page"' : ''}>${nav.app}</a>
    <a href="${urls.eczema}" ${slug === 'eczema' ? 'class="is-active" aria-current="page"' : ''}>${nav.eczema}</a>
    <a href="${urls.signs}" ${slug === 'signs' ? 'class="is-active" aria-current="page"' : ''}>${nav.signs}</a>
    <a href="${urls.main}" ${slug === 'main-suspects' ? 'class="is-active" aria-current="page"' : ''}>${nav.main}</a>
    <div class="mobile__langs"><a ${isEn ? '' : 'class=\"is-active\"'} href="${isEn ? oppositeLangUrl : urls[slug === 'main-suspects' ? 'main' : slug]}">CZ</a><a ${isEn ? 'class=\"is-active\"' : ''} href="${isEn ? urls[slug === 'main-suspects' ? 'main' : slug] : oppositeLangUrl}">EN</a></div>
  </div>
</header>`;
}

function articleJsonLd(page) {
  const isEn = page.lang === 'en';
  const url = absoluteUrl(localizedPath(page.slug, page.lang));
  const homeUrl = absoluteUrl(isEn ? '/en/' : '/');
  const organization = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Bejby bez alergií',
    alternateName: 'Baby w/o allergies',
    url: `${SITE_URL}/`,
    logo: { '@type': 'ImageObject', url: absoluteUrl('/assets/favicon.png'), width: 304, height: 304 },
  };
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.seoTitle,
    description: page.description,
    image: [absoluteUrl(page.hero)],
    datePublished: PUBLISHED,
    dateModified: UPDATED,
    inLanguage: page.lang,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: {
      '@type': 'Person',
      name: AUTHOR.name,
      jobTitle: isEn ? 'Nutrition consultant' : 'výživová poradkyně',
      image: absoluteUrl(AUTHOR.photo),
      url: `${homeUrl}#about`,
    },
    publisher: organization,
  };
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isEn ? 'App' : 'Aplikace', item: homeUrl },
      { '@type': 'ListItem', position: 2, name: page.title, item: url },
    ],
  };
  return [article, breadcrumbs].map((data) => `<script type="application/ld+json">${JSON.stringify(data)}</script>`).join('\n  ');
}

function authorBox(page) {
  const isEn = page.lang === 'en';
  const updatedLabel = isEn ? 'October 1, 2026' : '1. 10. 2026';
  return `<aside class="author-box" aria-label="${isEn ? 'About the author' : 'O autorce'}"><picture><source srcset="${AUTHOR.photoWebp}" type="image/webp"><img class="author-box__photo" src="${AUTHOR.photo}" alt="${AUTHOR.name}" width="320" height="320" loading="lazy" decoding="async"></picture><div class="author-box__body"><span class="author-box__eyebrow">${isEn ? 'About the author' : 'Autorka článku'}</span><strong class="author-box__name">${AUTHOR.name}</strong><p class="author-box__role">${isEn ? 'Nutrition consultant and mum of a child with multiple allergies' : 'Výživová poradkyně a máma dítěte multialergika'}</p><p class="author-box__meta">${isEn ? 'Last updated' : 'Naposledy aktualizováno'} <time datetime="${UPDATED}">${updatedLabel}</time> · <a href="${isEn ? '/en/sources/' : '/zdroje/'}">${isEn ? 'Sources we rely on' : 'Odborné zdroje'}</a></p></div></aside>`;
}

function siteFooter(lang) {
  const isEn = lang === 'en';
  const links = isEn
    ? [['/en/eczema/', 'Baby eczema'], ['/en/signs/', 'Food allergy signs in babies'], ['/en/main-suspects/', 'Elimination diet'], ['/en/privacy-policy/', 'Privacy Policy'], ['/en/medical-disclaimer/', 'Medical Disclaimer'], ['/en/terms-of-use/', 'Terms of Use'], ['/en/sources/', 'Sources']]
    : [['/eczema/', 'Ekzém u miminka'], ['/signs/', 'Projevy potravinové alergie'], ['/main-suspects/', 'Eliminační dieta'], ['/privacy-policy/', 'Zásady ochrany osobních údajů'], ['/medical-disclaimer/', 'Zdravotní upozornění'], ['/terms-of-use/', 'Podmínky používání'], ['/zdroje/', 'Odborné zdroje']];
  return `<footer class="footer"><div class="container footer__inner"><p>© <span id="year"></span> ${isEn ? 'Baby w/o allergies' : 'Bejby bez alergií'}</p><div class="footer__links">${links.map(([href, label]) => `<a href="${href}">${label}</a>`).join('')}</div></div></footer>`;
}

function articleHtml(page, bodyHtml, sourcesHtml) {
  const isEn = page.lang === 'en';
  const canonicalPath = localizedPath(page.slug, page.lang);
  const campaign = campaignId(page);
  const headings = [...bodyHtml.matchAll(/<h2 id="([^"]+)">(.+?)<\/h2>/g)];
  const toc = headings.length ? `<nav class="article-toc" aria-label="${isEn ? 'On this page' : 'Obsah článku'}"><strong>${isEn ? 'On this page' : 'Obsah článku'}</strong><ol>${headings.map(([, id, label]) => `<li><a href="#${id}">${label}</a></li>`).join('')}</ol></nav>` : '';
  const related = pages.filter((item) => item.lang === page.lang && item.slug !== page.slug).map((item) => `<a class="related-card" href="${localizedPath(item.slug, item.lang)}"><span>${isEn ? 'Read next' : 'Číst dále'}</span><strong>${item.title}</strong></a>`).join('');
  const title = escapeHtml(page.seoTitle);
  const description = escapeHtml(page.description);
  const [heroWidth, heroHeight] = page.heroSize;
  return `<!doctype html>
<html lang="${page.lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="robots" content="max-image-preview:large" />
  <meta name="author" content="${AUTHOR.name}" />
  <meta name="apple-itunes-app" content="app-id=${APP_STORE_ID}" />
  <meta property="og:site_name" content="${isEn ? 'Baby w/o allergies' : 'Bejby bez alergií'}" />
  <meta property="og:locale" content="${isEn ? 'en_US' : 'cs_CZ'}" />
  <meta property="og:locale:alternate" content="${isEn ? 'cs_CZ' : 'en_US'}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${absoluteUrl(canonicalPath)}" />
  <meta property="og:image" content="${absoluteUrl(page.hero)}" />
  <meta property="og:image:alt" content="${escapeHtml(page.heroAlt)}" />
  <meta property="article:published_time" content="${PUBLISHED}" />
  <meta property="article:modified_time" content="${UPDATED}" />
  <meta property="article:author" content="${AUTHOR.name}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${absoluteUrl(page.hero)}" />
  ${articleSeoLinks(page)}
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/assets/favicon.png" type="image/png" sizes="304x304" />
  <link rel="apple-touch-icon" href="/assets/favicon.png" sizes="304x304" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="/assets/styles.css" />
  ${articleJsonLd(page)}
</head>
<body>
${topNav({ lang: page.lang, slug: page.slug, nav: page.nav })}
<main>
  <nav class="breadcrumbs container" aria-label="${isEn ? 'Breadcrumbs' : 'Drobečková navigace'}"><a href="${isEn ? '/en/' : '/'}">${isEn ? 'App' : 'Aplikace'}</a><span aria-hidden="true">›</span><span aria-current="page">${page.title}</span></nav>
  <section class="article-hero">
    <picture><source srcset="${page.heroWebp}" type="image/webp"><img src="${page.hero}" alt="${escapeHtml(page.heroAlt)}" class="article-hero__image" width="${heroWidth}" height="${heroHeight}" fetchpriority="high" decoding="async" /></picture>
  </section>
  <article class="article-content container">
    <div class="article-meta"><span>${isEn ? 'Written by' : 'Autorka'}: <strong>${AUTHOR.name}</strong></span><time datetime="${UPDATED}">${isEn ? 'Updated October 1, 2026' : 'Aktualizováno 1. 10. 2026'}</time></div>
    ${toc}
    ${bodyHtml}
    ${sourcesHtml ? `<section class="article-sources"><h2>${isEn ? 'Sources' : 'Zdroje'}</h2>${sourcesHtml}</section>` : ''}
    ${authorBox(page)}
    <aside class="medical-note"><strong>${isEn ? 'Health notice' : 'Zdravotní upozornění'}</strong><p>${isEn ? 'This article is educational and does not replace diagnosis or care from a doctor. Seek urgent medical help for breathing difficulties, swelling or suspected anaphylaxis.' : 'Článek má vzdělávací charakter a nenahrazuje diagnózu ani péči lékaře. Při dušnosti, otoku nebo podezření na anafylaxi volejte neprodleně zdravotnickou pomoc.'}</p><a href="${isEn ? '/en/medical-disclaimer/' : '/medical-disclaimer/'}">${isEn ? 'Full health notice' : 'Celé zdravotní upozornění'}</a></aside>
    <section class="article-cta"><div><span>${page.cta.eyebrow}</span><h2>${page.cta.heading}</h2><p>${page.cta.text}</p></div><div class="store-links store-links--cta" aria-label="${isEn ? 'App download links' : 'Odkazy ke stažení aplikace'}"><a class="store-badge-link" href="${googlePlayUrl(page.lang, campaign)}" target="_blank" rel="noopener noreferrer" aria-label="${isEn ? 'Get Baby w/o allergies on Google Play' : 'Stáhnout aplikaci Bejby bez alergií na Google Play'}"><img class="store-badge" src="/assets/google-play-badge-${isEn ? 'en' : 'cs'}.png" alt="${isEn ? 'Get it on Google Play' : 'Stáhnout na Google Play'}" width="478" height="142" loading="lazy" decoding="async"></a><a class="store-badge-link" href="${appStoreUrl(page.lang, campaign)}" target="_blank" rel="noopener noreferrer" aria-label="${isEn ? 'Download Baby w/o allergies on the App Store' : 'Stáhnout aplikaci Bejby bez alergií v App Storu'}"><img class="store-badge" src="/assets/app_store_badge_${isEn ? 'en' : 'cs'}.svg" alt="${isEn ? 'Download on the App Store' : 'Stáhnout v App Storu'}" width="120" height="40" loading="lazy" decoding="async"></a></div></section>
    <section class="related"><h2>${isEn ? 'Related articles' : 'Související články'}</h2><div class="related-grid">${related}</div></section>
  </article>
</main>
${siteFooter(page.lang)}
<script>
(function(){const burger=document.getElementById('burger');const mobileNav=document.getElementById('mobileNav');if(!burger||!mobileNav)return;burger.addEventListener('click',()=>{const isOpen=burger.getAttribute('aria-expanded')==='true';burger.setAttribute('aria-expanded',String(!isOpen));mobileNav.hidden=isOpen;});mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{burger.setAttribute('aria-expanded','false');mobileNav.hidden=true;}));})();
(function(){const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();})();
</script>
</body>
</html>`;
}


for (const page of pages) {
  const md = await fs.readFile(path.join(root, page.input), 'utf8');
  const { body, sources } = splitSources(md, page.lang);
  const html = articleHtml(page, markdownToHtml(body), sources ? markdownToHtml(sources) : '');
  const out = path.join(root, page.output);
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, html, 'utf8');
}
