import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const pages = [
  { slug: 'eczema', lang: 'cs', title: 'Ekzém u dětí', description: 'Jak rozpoznat ekzém u dětí, co ho může zhoršovat a jak při hledání souvislostí pomáhá aplikace Bejby bez alergií.', input: 'content/cz/eczema_cz.md', output: 'eczema/index.html', hero: '/assets/article-eczema.jpg', nav: { app: 'Aplikace', eczema: 'Ekzém u dětí', signs: 'Projevy potravinové alergie', main: 'Hlavní podezřelí' } },
  { slug: 'signs', lang: 'cs', title: 'Projevy potravinové alergie', description: 'Přehled častých projevů potravinové alergie u dětí a signálů, které se vyplatí systematicky sledovat.', input: 'content/cz/signs_cz.md', output: 'signs/index.html', hero: '/assets/article-signs.png', nav: { app: 'Aplikace', eczema: 'Ekzém u dětí', signs: 'Projevy potravinové alergie', main: 'Hlavní podezřelí' } },
  { slug: 'main-suspects', lang: 'cs', title: 'Hlavní podezřelí', description: 'První fáze eliminační diety: hlavní podezřelé potraviny, co sledovat a jak postupovat přehledně.', input: 'content/cz/main_cz.md', output: 'main-suspects/index.html', hero: '/assets/article-main.jpg', nav: { app: 'Aplikace', eczema: 'Ekzém u dětí', signs: 'Projevy potravinové alergie', main: 'Hlavní podezřelí' } },
  { slug: 'eczema', lang: 'en', title: 'Eczema in children', description: 'How to recognize eczema in children, what can make it worse and how Baby w/o allergies helps track context.', input: 'content/en/eczema_en.md', output: 'en/eczema/index.html', hero: '/assets/article-eczema.jpg', nav: { app: 'App', eczema: 'Eczema in children', signs: 'Signs of food allergy', main: 'Main suspects' } },
  { slug: 'signs', lang: 'en', title: 'Signs of food allergy', description: 'Common signs of food allergy in children and the symptoms worth tracking systematically.', input: 'content/en/signs_en.md', output: 'en/signs/index.html', hero: '/assets/article-signs.png', nav: { app: 'App', eczema: 'Eczema in children', signs: 'Signs of food allergy', main: 'Main suspects' } },
  { slug: 'main-suspects', lang: 'en', title: 'Main suspects', description: 'The first phase of an elimination diet: main suspected foods, what to watch and how to proceed clearly.', input: 'content/en/main_en.md', output: 'en/main-suspects/index.html', hero: '/assets/article-main.jpg', nav: { app: 'App', eczema: 'Eczema in children', signs: 'Signs of food allergy', main: 'Main suspects' } },
];

const SITE_URL = 'https://babyapp.cz';
const DEFAULT_SCREENSHOTS = {
  cs: '/assets/cz_screenshot.png',
  en: '/assets/en_screenshot.png',
};
const UPDATED = '2026-07-26';

function absoluteUrl(pathname) {
  return `${SITE_URL}${pathname}`;
}

function pageImage(page) {
  return page.hero || DEFAULT_SCREENSHOTS[page.lang];
}

function metaDescription(page) {
  return page.description || page.title;
}

function localizedPath(slug, lang) {
  if (lang === 'en') return slug === 'app' ? '/en/' : `/en/${slug}/`;
  return slug === 'app' ? '/' : `/${slug}/`;
}

function articleSeoLinks(page) {
  const canonicalPath = localizedPath(page.slug, page.lang);
  const alternateCsPath = localizedPath(page.slug, 'cs');
  const alternateEnPath = localizedPath(page.slug, 'en');

  return [
    `<link rel="canonical" href="${absoluteUrl(canonicalPath)}" />`,
    `<link rel="alternate" hreflang="cs" href="${absoluteUrl(alternateCsPath)}" />`,
    `<link rel="alternate" hreflang="en" href="${absoluteUrl(alternateEnPath)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${absoluteUrl('/')}" />`,
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

function articleHtml(page, bodyHtml, sourcesHtml) {
  const isEn = page.lang === 'en';
  const canonicalPath = localizedPath(page.slug, page.lang);
  const headings = [...bodyHtml.matchAll(/<h2 id="([^"]+)">(.+?)<\/h2>/g)];
  const toc = headings.length ? `<nav class="article-toc" aria-label="${isEn ? 'On this page' : 'Obsah článku'}"><strong>${isEn ? 'On this page' : 'Obsah článku'}</strong><ol>${headings.map(([, id, label]) => `<li><a href="#${id}">${label}</a></li>`).join('')}</ol></nav>` : '';
  const related = pages.filter((item) => item.lang === page.lang && item.slug !== page.slug).map((item) => `<a class="related-card" href="${localizedPath(item.slug, item.lang)}"><span>${isEn ? 'Read next' : 'Číst dále'}</span><strong>${item.title}</strong></a>`).join('');
  return `<!doctype html>
<html lang="${page.lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${page.title} | ${isEn ? 'Baby w/o allergies' : 'Bejby bez alergií'}</title>
  <meta name="description" content="${metaDescription(page)}" />
  <meta name="robots" content="max-image-preview:large" />
  <meta property="og:image" content="${absoluteUrl(pageImage(page))}" />
  <meta property="og:title" content="${page.title} | ${isEn ? 'Baby w/o allergies' : 'Bejby bez alergií'}" />
  <meta property="og:description" content="${metaDescription(page)}" />
  <meta property="og:url" content="${absoluteUrl(localizedPath(page.slug, page.lang))}" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="${absoluteUrl(pageImage(page))}" />
  ${articleSeoLinks(page)}
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/assets/favicon.png" type="image/png" sizes="304x304" />
  <link rel="apple-touch-icon" href="/assets/favicon.png" sizes="304x304" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/styles.css" />
  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: page.title, description: metaDescription(page), image: absoluteUrl(pageImage(page)), datePublished: '2026-03-01', dateModified: UPDATED, inLanguage: page.lang, mainEntityOfPage: absoluteUrl(canonicalPath), author: { '@type': 'Person', name: 'Jiřina' }, publisher: { '@type': 'Organization', name: isEn ? 'Baby w/o allergies' : 'Bejby bez alergií', url: SITE_URL, logo: { '@type': 'ImageObject', url: absoluteUrl('/assets/logo.svg') } } })}</script>
  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: isEn ? 'App' : 'Aplikace', item: absoluteUrl(isEn ? '/en/' : '/') }, { '@type': 'ListItem', position: 2, name: page.title, item: absoluteUrl(canonicalPath) }] })}</script>
</head>
<body>
${topNav({ lang: page.lang, slug: page.slug, nav: page.nav })}
<main>
  <nav class="breadcrumbs container" aria-label="${isEn ? 'Breadcrumbs' : 'Drobečková navigace'}"><a href="${isEn ? '/en/' : '/'}">${isEn ? 'App' : 'Aplikace'}</a><span aria-hidden="true">›</span><span aria-current="page">${page.title}</span></nav>
  <section class="article-hero">
    <img src="${page.hero}" alt="${page.title}" class="article-hero__image" width="1200" height="630" fetchpriority="high" decoding="async" />
  </section>
  <article class="article-content container">
    <div class="article-meta"><span>${isEn ? 'Written by' : 'Autorka'}: <strong>Jiřina</strong></span><time datetime="${UPDATED}">${isEn ? 'Updated July 26, 2026' : 'Aktualizováno 26. 7. 2026'}</time></div>
    ${toc}
    ${bodyHtml}
    ${sourcesHtml ? `<section class="article-sources"><h2>${isEn ? 'Sources' : 'Zdroje'}</h2>${sourcesHtml}</section>` : ''}
    <aside class="medical-note"><strong>${isEn ? 'Health notice' : 'Zdravotní upozornění'}</strong><p>${isEn ? 'This article is educational and does not replace diagnosis or care from a doctor. Seek urgent medical help for breathing difficulties, swelling or suspected anaphylaxis.' : 'Článek má vzdělávací charakter a nenahrazuje diagnózu ani péči lékaře. Při dušnosti, otoku nebo podezření na anafylaxi volejte neprodleně zdravotnickou pomoc.'}</p><a href="${isEn ? '/en/medical-disclaimer/' : '/medical-disclaimer/'}">${isEn ? 'Full health notice' : 'Celé zdravotní upozornění'}</a></aside>
    <section class="article-cta"><div><span>${isEn ? 'A clearer path for parents' : 'Přehlednější cesta pro rodiče'}</span><h2>${isEn ? 'Track foods and symptoms in one place' : 'Sledujte potraviny a projevy na jednom místě'}</h2></div><a class="btn btn--primary" href="${isEn ? '/en/#testing' : '/#testovani'}">${isEn ? 'Download the app' : 'Stáhnout aplikaci'}</a></section>
    <section class="related"><h2>${isEn ? 'Related articles' : 'Související články'}</h2><div class="related-grid">${related}</div></section>
  </article>
</main>
<footer class="footer"><div class="container footer__inner"><p>© <span id="year"></span> ${isEn ? 'Baby w/o allergies' : 'Bejby bez alergií'}</p></div></footer>
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
