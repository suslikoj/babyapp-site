import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const pages = [
  { slug: 'eczema', lang: 'cs', title: 'Ekzém u dětí', input: 'content/cz/eczema_cz.md', output: 'eczema/index.html', hero: '/assets/article-eczema.jpg', nav: { app: 'Aplikace', eczema: 'Ekzém u dětí', signs: 'Projevy potravinové alergie', main: 'Hlavní podezřelí' } },
  { slug: 'signs', lang: 'cs', title: 'Projevy potravinové alergie', input: 'content/cz/signs_cz.md', output: 'signs/index.html', hero: '/assets/article-signs.png', nav: { app: 'Aplikace', eczema: 'Ekzém u dětí', signs: 'Projevy potravinové alergie', main: 'Hlavní podezřelí' } },
  { slug: 'main-suspects', lang: 'cs', title: 'Hlavní podezřelí', input: 'content/cz/main_cz.md', output: 'main-suspects/index.html', hero: '/assets/article-main.jpg', nav: { app: 'Aplikace', eczema: 'Ekzém u dětí', signs: 'Projevy potravinové alergie', main: 'Hlavní podezřelí' } },
  { slug: 'eczema', lang: 'en', title: 'Eczema in children', input: 'content/en/eczema_en.md', output: 'en/eczema/index.html', hero: '/assets/article-eczema.jpg', nav: { app: 'App', eczema: 'Eczema in children', signs: 'Signs of food allergy', main: 'Main suspects' } },
  { slug: 'signs', lang: 'en', title: 'Signs of food allergy', input: 'content/en/signs_en.md', output: 'en/signs/index.html', hero: '/assets/article-signs.png', nav: { app: 'App', eczema: 'Eczema in children', signs: 'Signs of food allergy', main: 'Main suspects' } },
  { slug: 'main-suspects', lang: 'en', title: 'Main suspects', input: 'content/en/main_en.md', output: 'en/main-suspects/index.html', hero: '/assets/article-main.jpg', nav: { app: 'App', eczema: 'Eczema in children', signs: 'Signs of food allergy', main: 'Main suspects' } },
];

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
    const list = trimmed.match(/^[-*]\s+(.+)$/);

    if (h1 || h2 || h3) {
      flushParagraph();
      flushList();
      const tag = h1 ? 'h1' : h2 ? 'h2' : 'h3';
      const text = (h1 || h2 || h3)[1].replace(/^\*\*(.+)\*\*$/, '$1');
      html += `<${tag}>${applyInline(text)}</${tag}>`;
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
    <div class="lang">${isEn ? '<a class="lang__item" href="/">CZ</a><span class="lang__sep" aria-hidden="true">/</span><a class="lang__item is-active" href="/en/" aria-current="page">EN</a>' : '<a class="lang__item is-active" href="/" aria-current="page">CZ</a><span class="lang__sep" aria-hidden="true">/</span><a class="lang__item" href="/en/">EN</a>'}</div>
    <button class="burger" id="burger" aria-label="${isEn ? 'Open menu' : 'Otevřít menu'}" aria-expanded="false"><span></span><span></span><span></span></button>
  </div>
  <div class="mobile" id="mobileNav" hidden>
    <a href="${urls.app}" ${slug === 'app' ? 'class="is-active" aria-current="page"' : ''}>${nav.app}</a>
    <a href="${urls.eczema}" ${slug === 'eczema' ? 'class="is-active" aria-current="page"' : ''}>${nav.eczema}</a>
    <a href="${urls.signs}" ${slug === 'signs' ? 'class="is-active" aria-current="page"' : ''}>${nav.signs}</a>
    <a href="${urls.main}" ${slug === 'main-suspects' ? 'class="is-active" aria-current="page"' : ''}>${nav.main}</a>
    <div class="mobile__langs"><a ${isEn ? '' : 'class="is-active"'} href="/">CZ</a><a ${isEn ? 'class="is-active"' : ''} href="/en/">EN</a></div>
  </div>
</header>`;
}

function articleHtml(page, bodyHtml, sourcesHtml) {
  const isEn = page.lang === 'en';
  return `<!doctype html>
<html lang="${page.lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${page.title} | ${isEn ? 'Baby w/o allergies' : 'Bejby bez alergií'}</title>
  <meta name="description" content="${page.title}" />
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/favicon.png" type="image/png" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/styles.css" />
</head>
<body>
${topNav({ lang: page.lang, slug: page.slug, nav: page.nav })}
<main>
  <section class="article-hero">
    <img src="${page.hero}" alt="${page.title}" class="article-hero__image" />
  </section>
  <article class="article-content container">
    ${bodyHtml}
    ${sourcesHtml ? `<section class="article-sources"><h2>${isEn ? 'Sources' : 'Zdroje'}</h2>${sourcesHtml}</section>` : ''}
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
