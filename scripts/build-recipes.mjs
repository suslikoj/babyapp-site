// Recepty: /recepty/ (seznam s filtry) a /recepty/<slug>/ (detail) z content/recepty/recipes.json.
// Data stahuje scripts/fetch-recipes.mjs ze Storybloku (recepty se zapnutým polem `web`).

import fs from 'node:fs/promises';
import path from 'node:path';
import { AUTHOR, ORGANIZATION, absoluteUrl, appCta, breadcrumbJsonLd, breadcrumbs, escapeHtml, renderPage, root, storyblokImage, topNav, write } from './lib/site.mjs';

const data = JSON.parse(await fs.readFile(path.join(root, 'content/recepty/recipes.json'), 'utf8'));
const { recipes, allergenLabels } = data;
const bySlug = Object.fromEntries(recipes.map((r) => [r.slug, r]));

// Hlavní alergeny, u kterých má smysl psát „bez …“ (genitiv pro titulky a text).
const FREE_FROM = { milk: 'mléka', egg: 'vajec', wheat: 'pšenice', soya: 'sóji', nuts: 'ořechů', peanuts: 'arašídů', fish: 'ryb' };
const TAG_LABELS = { vegan: 'Veganské', no_cook: 'Bez vaření', one_pot: 'Z jednoho hrnce', over_night: 'Přes noc', travel: 'Na cesty', no_allergen: 'Bez alergenů' };
const RECIPE_CTA = { eyebrow: 'Recepty v aplikaci', heading: 'Další recepty najdete v aplikaci', text: `V aplikaci Bejby bez alergií je ${data.totalInApp} receptů, které se automaticky filtrují podle aktuální fáze diety a testovaných alergenů.` };

const minutes = (n) => (n ? `${n} min` : '');
const isoDuration = (n) => (n ? `PT${Math.round(n)}M` : undefined);
const totalTime = (r) => r.totalMinutes || ((r.activeMinutes || 0) + (r.cookMinutes || 0)) || null;
const freeFrom = (r) => Object.keys(FREE_FROM).filter((key) => !r.contains.includes(key) && !r.mayContain.includes(key));

function imageSize(url, width) {
  const m = url?.match(/\/(\d+)x(\d+)\//);
  if (!m) return [width, Math.round(width * 0.75)];
  const w = Math.min(width, Number(m[1]));
  return [w, Math.round((w * Number(m[2])) / Number(m[1]))];
}

function recipePicture(r, width, { eager = false, className = '' } = {}) {
  if (!r.image) return '';
  const [w, h] = imageSize(r.image, width);
  const alt = escapeHtml(r.imageAlt || r.title);
  return `<picture><source srcset="${storyblokImage(r.image, w, 0, true)}" type="image/webp"><img${className ? ` class="${className}"` : ''} src="${storyblokImage(r.image, w)}" alt="${alt}" width="${w}" height="${h}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"></picture>`;
}

function seoTitle(r) {
  const free = freeFrom(r).filter((k) => k === 'milk' || k === 'egg');
  const withFree = free.length ? `${r.title} – recept bez ${free.map((k) => FREE_FROM[k]).join(' a ')}` : '';
  if (withFree && withFree.length <= 62) return withFree;
  return r.title.length <= 50 ? `${r.title} | Recept` : r.title;
}

function metaDescription(r) {
  const text = r.excerpt.replace(/\s+/g, ' ').trim();
  if (text.length <= 155) return text;
  const cut = text.slice(0, 152);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

function ingredientText(i) {
  return [i.amount, i.unit, i.name].filter(Boolean).join(' ') + (i.note ? ` (${i.note})` : '');
}

// ── Detail ─────────────────────────────────────────────────────────────

function recipePage(r) {
  const href = `/recepty/${r.slug}/`;
  const trail = [['Recepty', '/recepty/'], [r.title, href]];
  const total = totalTime(r);
  const free = freeFrom(r);
  const facts = [
    ['Příprava', minutes(r.activeMinutes)],
    ['Vaření', minutes(r.cookMinutes)],
    ['Celkem', minutes(total)],
    ['Porce', r.servings ? String(r.servings) : ''],
    ['Obtížnost', r.difficulty || ''],
  ].filter(([, v]) => v);
  const label = (key) => allergenLabels[key] || key;

  const ingredients = r.ingredients.map((i) => {
    const name = i.linkedSlug && bySlug[i.linkedSlug] ? `<a href="/recepty/${i.linkedSlug}/">${escapeHtml(i.name)}</a>` : escapeHtml(i.name);
    const amount = [i.amount, i.unit].filter(Boolean).join(' ');
    return `<li>${amount ? `<span class="recipe-ingredients__amount">${escapeHtml(amount)}</span> ` : ''}${name}${i.note ? ` <span class="recipe-ingredients__note">(${escapeHtml(i.note)})</span>` : ''}${i.optional ? ' <span class="recipe-ingredients__note">– volitelné</span>' : ''}</li>`;
  }).join('');
  const steps = r.steps.map((s) => `<li><p>${escapeHtml(s.text)}</p>${s.note ? `<p class="recipe-steps__note">${escapeHtml(s.note)}</p>` : ''}</li>`).join('');
  const n = r.nutrition;
  const nutrition = [['Energie', n.kcal ? `${n.kcal} kcal` : ''], ['Bílkoviny', n.protein ? `${n.protein} g` : ''], ['Sacharidy', n.carbs ? `${n.carbs} g` : ''], ['Tuky', n.fats ? `${n.fats} g` : '']].filter(([, v]) => v);

  const related = recipes.filter((x) => x.slug !== r.slug && x.category?.slug === r.category?.slug).concat(recipes.filter((x) => x.slug !== r.slug && x.category?.slug !== r.category?.slug)).slice(0, 3);

  const allergenBox = `<div class="recipe-allergens">
        <p><strong>Obsahuje alergeny:</strong> ${r.contains.length ? r.contains.map(label).join(', ') : 'žádný ze sledovaných alergenů'}</p>
        ${r.mayContain.length ? `<p><strong>Může obsahovat:</strong> ${r.mayContain.map(label).join(', ')}</p>` : ''}
        ${free.length ? `<p><strong>Podle složení je bez:</strong> ${free.map((k) => FREE_FROM[k]).join(', ')}</p>` : ''}
      </div>`;

  const main = `  ${breadcrumbs('cs', trail)}
  <article class="recipe container">
    <header class="recipe__head">
      <div class="recipe__image">${recipePicture(r, 900, { eager: true })}</div>
      <div class="recipe__intro">
        ${r.category ? `<p class="eyebrow">${r.category.name}</p>` : ''}
        <h1>${escapeHtml(r.title)}</h1>
        <p class="recipe__excerpt">${escapeHtml(r.excerpt)}</p>
        ${facts.length ? `<dl class="recipe-facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>` : ''}
        ${r.tags.length ? `<p class="recipe-tags">${r.tags.map((t) => `<span>${t}</span>`).join('')}</p>` : ''}
      </div>
    </header>
    ${allergenBox}
    <div class="recipe__body">
      <section class="recipe-ingredients"><h2>Ingredience</h2>${r.servings ? `<p class="recipe-ingredients__servings">na ${r.servings} ${r.servings === 1 ? 'porci' : r.servings < 5 ? 'porce' : 'porcí'}</p>` : ''}<ul>${ingredients}</ul></section>
      <section class="recipe-steps"><h2>Postup</h2><ol>${steps}</ol>
        ${r.tip.length ? `<aside class="recipe-tip"><strong>Tip</strong>${r.tip.map((t) => `<p>${escapeHtml(t)}</p>`).join('')}</aside>` : ''}
        ${nutrition.length ? `<div class="recipe-nutrition"><h3>Nutriční hodnoty (1 porce)</h3><dl>${nutrition.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></div>` : ''}
      </section>
    </div>
    ${appCta('cs', RECIPE_CTA, `recept-${r.slug}`)}
    ${related.length ? `<section class="related"><h2>Další recepty</h2><div class="recipe-grid">${related.map(recipeCard).join('')}</div><p class="related__more"><a href="/recepty/">Všechny recepty →</a></p></section>` : ''}
  </article>`;

  const image = r.image ? storyblokImage(r.image, imageSize(r.image, 1200)[0]) : absoluteUrl('/assets/cz_screenshot.png');
  const recipeLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: r.title,
    description: r.excerpt,
    image: [image],
    author: { '@type': 'Person', name: AUTHOR.name },
    publisher: ORGANIZATION,
    datePublished: r.published || undefined,
    prepTime: isoDuration(r.activeMinutes),
    cookTime: isoDuration(r.cookMinutes),
    totalTime: isoDuration(total),
    recipeYield: r.servings ? `${r.servings}` : undefined,
    recipeCategory: r.category?.name,
    recipeCuisine: undefined,
    keywords: [...r.tags, ...free.map((k) => `bez ${FREE_FROM[k]}`)].join(', ') || undefined,
    suitableForDiet: r.tagKeys.includes('vegan') ? 'https://schema.org/VeganDiet' : undefined,
    recipeIngredient: r.ingredients.map(ingredientText),
    recipeInstructions: r.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, text: s.text })),
    nutrition: n.kcal ? { '@type': 'NutritionInformation', servingSize: '1 porce', calories: `${n.kcal} kcal`, proteinContent: n.protein ? `${n.protein} g` : undefined, carbohydrateContent: n.carbs ? `${n.carbs} g` : undefined, fatContent: n.fats ? `${n.fats} g` : undefined } : undefined,
    inLanguage: 'cs',
  };

  return renderPage({
    lang: 'cs',
    title: seoTitle(r),
    description: metaDescription(r),
    canonical: href,
    alternates: null,
    ogType: 'article',
    image,
    imageAlt: r.imageAlt || r.title,
    jsonLd: [JSON.parse(JSON.stringify(recipeLd)), breadcrumbJsonLd(trail)],
    nav: topNav({ lang: 'cs', active: 'recipes', czUrl: href, enUrl: '/en/' }),
    main,
  });
}

// ── Seznam ─────────────────────────────────────────────────────────────

const CLOCK_ICON = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
// Pořadí štítků na kartě jako v aplikaci (recipe_controller.dart).
const CARD_TAG_ORDER = ['no_allergen', 'vegan', 'under_30', 'no_cook', 'one_pot', 'over_night', 'travel'];
const CARD_TAG_LABELS = { ...TAG_LABELS, under_30: 'Do 30 minut' };

// Karta jako v aplikaci: fotka „plave“ nad bílou kartou, název, čas, perex a štítky.
function recipeCard(r) {
  const time = totalTime(r) || r.activeMinutes;
  const chips = [r.category?.name, ...CARD_TAG_ORDER.filter((k) => r.tagKeys.includes(k)).map((k) => CARD_TAG_LABELS[k])].filter(Boolean).slice(0, 3);
  const attrs = [
    `data-category="${r.category?.slug || ''}"`,
    `data-contains="${r.contains.join(' ')}"`,
    `data-may="${r.mayContain.join(' ')}"`,
    `data-tags="${r.tagKeys.join(' ')}"`,
    `data-minutes="${totalTime(r) || ''}"`,
  ].join(' ');
  return `<a class="recipe-card" href="/recepty/${r.slug}/" ${attrs}><div class="recipe-card__media">${recipePicture(r, 600)}</div><div class="recipe-card__body"><h3>${escapeHtml(r.title)}</h3>${time ? `<p class="recipe-card__time">${CLOCK_ICON}${time} min</p>` : ''}<p class="recipe-card__excerpt">${escapeHtml(r.excerpt)}</p><p class="recipe-card__warn" hidden></p>${chips.length ? `<p class="recipe-card__chips">${chips.map((c) => `<span>${c}</span>`).join('')}</p>` : ''}</div></a>`;
}

function chip(group, value, label, { pressed = false } = {}) {
  return `<button type="button" class="filter-chip" data-filter="${group}" data-value="${value}" aria-pressed="${pressed}">${label}</button>`;
}

function listingPage() {
  const categoriesUsed = data.categories.filter((c) => recipes.some((r) => r.category?.slug === c.slug));
  const allergensUsed = Object.keys(allergenLabels).filter((key) => ['milk', 'egg', 'wheat'].includes(key) || recipes.some((r) => r.contains.includes(key) || r.mayContain.includes(key)));
  const tagsUsed = Object.keys(TAG_LABELS).filter((k) => recipes.some((r) => r.tagKeys.includes(k)));
  const trail = [['Recepty', '/recepty/']];

  const main = `  <section class="section recipes-hub">
    <div class="container">
      <div class="section-heading"><div><p class="eyebrow">Recepty z aplikace</p><h1>Recepty pro eliminační dietu a alergiky</h1></div><p>Výběr receptů z aplikace Bejby bez alergií – jednoduchá jídla pro kojící maminky i děti. U každého receptu najdete alergeny, čas přípravy a nutriční hodnoty.</p></div>
      <div class="recipe-filters" id="recipeFilters" hidden>
        <div class="recipe-filters__row"><span>Druh</span>${chip('category', '', 'Vše', { pressed: true })}${categoriesUsed.map((c) => chip('category', c.slug, c.name)).join('')}</div>
        <div class="recipe-filters__row"><span>Bez alergenu</span>${allergensUsed.map((k) => chip('free', k, allergenLabels[k])).join('')}</div>
        <div class="recipe-filters__row"><span>Čas</span>${chip('time', '30', 'Do 30 minut')}${chip('time', '60', 'Do 60 minut')}</div>
        ${tagsUsed.length ? `<div class="recipe-filters__row"><span>Vlastnosti</span>${tagsUsed.map((k) => chip('tag', k, TAG_LABELS[k])).join('')}</div>` : ''}
        <p class="recipe-filters__count" aria-live="polite"><span id="recipeCount">${recipes.length}</span> z ${recipes.length} receptů</p>
      </div>
      <div class="recipe-grid" id="recipeGrid">${recipes.map(recipeCard).join('')}</div>
      <p class="recipe-empty" id="recipeEmpty" hidden>Těmto filtrům teď žádný recept na webu neodpovídá. Další recepty najdete v aplikaci.</p>
      ${appCta('cs', RECIPE_CTA, 'recepty-cz')}
    </div>
  </section>
  <script>
  (function(){
    const box=document.getElementById('recipeFilters');const grid=document.getElementById('recipeGrid');if(!box||!grid)return;box.hidden=false;
    const cards=[...grid.querySelectorAll('.recipe-card')];const state={category:'',free:new Set(),time:'',tag:new Set()};const names=${JSON.stringify(allergenLabels)};
    const apply=()=>{let shown=0;cards.forEach((c)=>{const has=c.dataset.contains.split(' ');const may=c.dataset.may.split(' ');const tags=c.dataset.tags.split(' ');const min=Number(c.dataset.minutes)||0;
      const ok=(!state.category||c.dataset.category===state.category)&&[...state.free].every((a)=>!has.includes(a))&&(!state.time||(min&&min<=Number(state.time)))&&[...state.tag].every((t)=>tags.includes(t));
      const warn=[...state.free].filter((a)=>may.includes(a)).map((a)=>names[a]||a);const w=c.querySelector('.recipe-card__warn');if(w){w.hidden=!warn.length;w.textContent=warn.length?'Může obsahovat: '+warn.join(', '):'';}
      c.hidden=!ok;if(ok)shown++;});document.getElementById('recipeCount').textContent=shown;document.getElementById('recipeEmpty').hidden=shown>0;};
    box.addEventListener('click',(e)=>{const b=e.target.closest('.filter-chip');if(!b)return;const g=b.dataset.filter,v=b.dataset.value;
      if(g==='category'||g==='time'){const same=state[g]===v&&g==='time';state[g]=same?'':v;box.querySelectorAll('[data-filter="'+g+'"]').forEach((x)=>x.setAttribute('aria-pressed',String(!same&&x.dataset.value===v)));}
      else{const set=state[g];set.has(v)?set.delete(v):set.add(v);b.setAttribute('aria-pressed',String(set.has(v)));}
      apply();});
  })();
  </script>`;

  return renderPage({
    lang: 'cs',
    title: 'Recepty pro eliminační dietu a alergiky | Bejby bez alergií',
    description: 'Recepty bez mléka, vajec a dalších alergenů pro kojící maminky i děti. Filtrujte podle druhu jídla, alergenů a času přípravy.',
    canonical: '/recepty/',
    alternates: null,
    image: recipes[0]?.image ? storyblokImage(recipes[0].image, 1200) : absoluteUrl('/assets/cz_screenshot.png'),
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Recepty pro eliminační dietu a alergiky', url: absoluteUrl('/recepty/'), inLanguage: 'cs', publisher: ORGANIZATION, mainEntity: { '@type': 'ItemList', itemListElement: recipes.map((r, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(`/recepty/${r.slug}/`) })) } },
      breadcrumbJsonLd(trail),
    ],
    nav: topNav({ lang: 'cs', active: 'recipes', czUrl: '/recepty/', enUrl: '/en/' }),
    main,
  });
}

// ── Build ──────────────────────────────────────────────────────────────

await fs.rm(path.join(root, 'recepty'), { recursive: true, force: true });
await write('recepty/index.html', listingPage());
for (const r of recipes) await write(`recepty/${r.slug}/index.html`, recipePage(r));
console.log(`Built /recepty/ with ${recipes.length} recipes.`);

