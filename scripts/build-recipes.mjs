// Recepty / Recipes: /recepty/ + /recepty/<slug>/ (CZ) and /en/recipes/ + /en/recipes/<slug>/ (EN)
// from content/recepty/recipes.json. The data comes from scripts/fetch-recipes.mjs (Storyblok recipes with `web` on).

import fs from 'node:fs/promises';
import path from 'node:path';
import { AUTHOR, ORGANIZATION, absoluteUrl, appCta, breadcrumbJsonLd, breadcrumbs, escapeHtml, renderPage, root, storyblokImage, topNav, write } from './lib/site.mjs';

const data = JSON.parse(await fs.readFile(path.join(root, 'content/recepty/recipes.json'), 'utf8'));
const { recipes, totalInApp } = data;
const bySlug = Object.fromEntries(recipes.map((r) => [r.slug, r]));

// Labels – same wording as the app (lib/lang/cs_cz_desc.dart, en_us_desc.dart).
const L = {
  cs: {
    root: '/recepty/',
    allergens: { legumes: 'Luštěniny', wheat: 'Pšenice', oat: 'Oves', citrus: 'Citrusy', root: 'Kořenová zelenina', tomato: 'Rajče', pepper: 'Paprika', exotic: 'Exotické ovoce', fish: 'Ryby', berries: 'Bobuloviny', egg: 'Vejce', poultry: 'Kuřecí', milk: 'Mléko', beef: 'Hovězí', soya: 'Sója', cocoa: 'Kakao', seeds: 'Semínka', nuts: 'Ořechy', peanuts: 'Arašídy', spices: 'Koření', honey: 'Med', carob: 'Karob', crustacean: 'Korýši' },
    tags: { no_allergen: 'Bez alergenů', vegan: 'Veganské', under_30: 'Do 30 minut', no_cook: 'Bez vaření', one_pot: 'Z jednoho hrnce', over_night: 'Přes noc', travel: 'Na cesty' },
    difficulty: { easy: 'jednoduché', medium: 'středně těžké', hard: 'těžké' },
    // „bez …“ (genitiv) for the main allergens
    freeFrom: { milk: 'mléka', egg: 'vajec', wheat: 'pšenice', soya: 'sóji', nuts: 'ořechů', peanuts: 'arašídů', fish: 'ryb' },
    seoTitle: (title, free) => {
      const withFree = free.length ? `${title} – recept bez ${free.join(' a ')}` : '';
      if (withFree && withFree.length <= 62) return withFree;
      return title.length <= 50 ? `${title} | Recept` : title;
    },
    keywordFree: (f) => `bez ${f}`,
    facts: { prep: 'Příprava', cook: 'Vaření', total: 'Celkem', servings: 'Porce', difficulty: 'Obtížnost' },
    cardContains: 'Obsahuje:',
    contains: 'Obsahuje alergeny:', containsNone: 'žádný ze sledovaných alergenů', mayContain: 'Může obsahovat:', freeLabel: 'Podle složení je bez:',
    ingredients: 'Ingredience', servingsFor: (n) => `na ${n} ${n === 1 ? 'porci' : n < 5 ? 'porce' : 'porcí'}`, optional: '– volitelné',
    steps: 'Postup', tip: 'Tip', nutrition: 'Nutriční hodnoty (1 porce)', servingSize: '1 porce',
    nutritionLabels: { kcal: 'Energie', protein: 'Bílkoviny', carbs: 'Sacharidy', fats: 'Tuky' },
    more: 'Další recepty', all: 'Všechny recepty →', breadcrumb: 'Recepty',
    cta: { eyebrow: 'Recepty v aplikaci', heading: 'Další recepty najdete v aplikaci', text: `V aplikaci Bejby bez alergií je ${totalInApp} receptů, které se automaticky filtrují podle aktuální fáze diety a testovaných alergenů.` },
    listEyebrow: 'Recepty z aplikace', listH1: 'Recepty pro eliminační dietu a alergiky',
    listLead: 'Výběr receptů z aplikace Bejby bez alergií – jednoduchá jídla pro kojící maminky i děti. U každého receptu najdete alergeny, čas přípravy a nutriční hodnoty.',
    listTitle: 'Recepty pro eliminační dietu a alergiky | Bejby bez alergií',
    listDescription: 'Recepty bez mléka, vajec a dalších alergenů pro kojící maminky i děti. Filtrujte podle druhu jídla, alergenů a času přípravy.',
    filters: { category: 'Druh', all: 'Vše', free: 'Bez alergenu', time: 'Čas', t30: 'Do 30 minut', t60: 'Do 60 minut', tags: 'Vlastnosti', count: (n) => `z ${n} receptů` },
    empty: 'Těmto filtrům teď žádný recept na webu neodpovídá. Další recepty najdete v aplikaci.', warn: 'Může obsahovat: ',
    campaign: (slug) => `recept-${slug}`, listCampaign: 'recepty-cz', image: '/assets/cz_screenshot.png', sort: 'cs',
  },
  en: {
    root: '/en/recipes/',
    allergens: { legumes: 'Legumes', wheat: 'Wheat', oat: 'Oat', citrus: 'Citrus', root: 'Root vegetables', tomato: 'Tomato', pepper: 'Pepper', exotic: 'Exotic fruits', fish: 'Fish', berries: 'Berries', egg: 'Egg', poultry: 'Poultry', milk: 'Milk', beef: 'Beef', soya: 'Soy', cocoa: 'Cocoa', seeds: 'Seeds', nuts: 'Nuts', peanuts: 'Peanuts', spices: 'Spices', honey: 'Honey', carob: 'Carob', crustacean: 'Crustaceans' },
    tags: { no_allergen: 'Allergen-free', vegan: 'Vegan', under_30: 'Under 30 min', no_cook: 'No cook', one_pot: 'One pot', over_night: 'Overnight', travel: 'Travel friendly' },
    difficulty: { easy: 'easy', medium: 'medium', hard: 'hard' },
    freeFrom: { milk: 'dairy', egg: 'egg', wheat: 'wheat', soya: 'soy', nuts: 'nuts', peanuts: 'peanuts', fish: 'fish' },
    seoTitle: (title, free) => {
      const withFree = free.length ? `${title} (${free.map((f) => `${f.charAt(0).toUpperCase()}${f.slice(1)}-Free`).join(', ')})` : '';
      if (withFree && withFree.length <= 62) return withFree;
      return title.length <= 50 ? `${title} | Recipe` : title;
    },
    keywordFree: (f) => `${f}-free`,
    facts: { prep: 'Prep', cook: 'Cook', total: 'Total', servings: 'Servings', difficulty: 'Difficulty' },
    cardContains: 'Contains:',
    contains: 'Contains allergens:', containsNone: 'none of the tracked allergens', mayContain: 'May contain:', freeLabel: 'Free from (by ingredients):',
    ingredients: 'Ingredients', servingsFor: (n) => `for ${n} ${n === 1 ? 'serving' : 'servings'}`, optional: '– optional',
    steps: 'Method', tip: 'Tip', nutrition: 'Nutrition (1 serving)', servingSize: '1 serving',
    nutritionLabels: { kcal: 'Energy', protein: 'Protein', carbs: 'Carbs', fats: 'Fat' },
    more: 'More recipes', all: 'All recipes →', breadcrumb: 'Recipes',
    cta: { eyebrow: 'Recipes in the app', heading: 'Find more recipes in the app', text: `The Baby Without Allergies app has ${totalInApp} recipes that are filtered automatically by your current diet phase and the allergens you are testing.` },
    listEyebrow: 'Recipes from the app', listH1: 'Recipes for the elimination diet and allergies',
    listLead: 'A selection of recipes from the Baby Without Allergies app – simple meals for breastfeeding moms and children. Each recipe lists allergens, prep time and nutrition.',
    listTitle: 'Allergy-Friendly Recipes for the Elimination Diet | Baby Without Allergies',
    listDescription: 'Dairy-free, egg-free and other allergy-friendly recipes for breastfeeding moms and kids. Filter by meal type, allergens and prep time.',
    filters: { category: 'Type', all: 'All', free: 'Free from', time: 'Time', t30: 'Under 30 min', t60: 'Under 60 min', tags: 'Features', count: (n) => `of ${n} recipes` },
    empty: 'No recipe on the website matches these filters right now. You’ll find more recipes in the app.', warn: 'May contain: ',
    campaign: (slug) => `recipe-${slug}-en`, listCampaign: 'recipes-en', image: '/assets/en_screenshot.png', sort: 'en',
  },
};

const FREE_KEYS = ['milk', 'egg', 'wheat', 'soya', 'nuts', 'peanuts', 'fish'];
const CARD_TAG_ORDER = ['no_allergen', 'vegan', 'under_30', 'no_cook', 'one_pot', 'over_night', 'travel'];
const FILTER_TAGS = ['vegan', 'no_cook', 'one_pot', 'over_night', 'travel', 'no_allergen'];
const CLOCK_ICON = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

const minutes = (n) => (n ? `${n} min` : '');
const isoDuration = (n) => (n ? `PT${Math.round(n)}M` : undefined);
const totalTime = (r) => r.totalMinutes || ((r.activeMinutes || 0) + (r.cookMinutes || 0)) || null;
const freeKeys = (r) => FREE_KEYS.filter((key) => !r.contains.includes(key) && !r.mayContain.includes(key));
const recipePath = (lang, r) => `${L[lang].root}${lang === 'en' ? r.slugEn : r.slug}/`;

// Language view of a recipe: texts from the matching Storyblok language (falls back to Czech).
function view(r, lang) {
  const t = lang === 'en' && r.en ? r.en : r;
  return { ...r, title: t.title, excerpt: t.excerpt, imageAlt: t.imageAlt || r.imageAlt, ingredients: t.ingredients, steps: t.steps, tip: t.tip, categoryName: lang === 'en' ? r.category?.nameEn : r.category?.name };
}

function imageSize(url, width) {
  const m = url?.match(/\/(\d+)x(\d+)\//);
  if (!m) return [width, Math.round(width * 0.75)];
  const w = Math.min(width, Number(m[1]));
  return [w, Math.round((w * Number(m[2])) / Number(m[1]))];
}

function recipePicture(r, width, { eager = false } = {}) {
  if (!r.image) return '';
  const [w, h] = imageSize(r.image, width);
  return `<picture><source srcset="${storyblokImage(r.image, w, 0, true)}" type="image/webp"><img src="${storyblokImage(r.image, w)}" alt="${escapeHtml(r.imageAlt || r.title)}" width="${w}" height="${h}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"></picture>`;
}

function metaDescription(text) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= 155) return clean;
  const cut = clean.slice(0, 152);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

const ingredientText = (i) => [i.amount, i.unit, i.name].filter(Boolean).join(' ') + (i.note ? ` (${i.note})` : '');

// ── Card (styled like the app) ─────────────────────────────────────────

function recipeCard(lang, recipe) {
  const t = L[lang];
  const r = view(recipe, lang);
  const time = totalTime(r) || r.activeMinutes;
  const chips = [r.categoryName, ...CARD_TAG_ORDER.filter((k) => r.tagKeys.includes(k)).map((k) => t.tags[k])].filter(Boolean).slice(0, 3);
  const attrs = [`data-category="${r.category?.slug || ''}"`, `data-contains="${r.contains.join(' ')}"`, `data-may="${r.mayContain.join(' ')}"`, `data-tags="${r.tagKeys.join(' ')}"`, `data-minutes="${totalTime(r) || ''}"`].join(' ');
  return `<a class="recipe-card" href="${recipePath(lang, r)}" ${attrs}><div class="recipe-card__media">${recipePicture(r, 600)}</div><div class="recipe-card__body"><h3>${escapeHtml(r.title)}</h3>${time ? `<p class="recipe-card__time">${CLOCK_ICON}${time} min</p>` : ''}<p class="recipe-card__excerpt">${escapeHtml(r.excerpt)}</p>${r.contains.length ? `<p class="recipe-card__allergens"><span>${t.cardContains}</span> ${r.contains.map((k) => t.allergens[k] || k).join(', ')}</p>` : ''}<p class="recipe-card__warn" hidden></p>${chips.length ? `<p class="recipe-card__chips">${chips.map((c) => `<span>${c}</span>`).join('')}</p>` : ''}</div></a>`;
}

// ── Detail ─────────────────────────────────────────────────────────────

function recipePage(lang, recipe) {
  const t = L[lang];
  const r = view(recipe, lang);
  const href = recipePath(lang, r);
  const alternates = { cs: recipePath('cs', r), en: recipePath('en', r) };
  const trail = [[t.breadcrumb, t.root], [r.title, href]];
  const total = totalTime(r);
  const free = freeKeys(r).map((k) => t.freeFrom[k]);
  const facts = [[t.facts.prep, minutes(r.activeMinutes)], [t.facts.cook, minutes(r.cookMinutes)], [t.facts.total, minutes(total)], [t.facts.servings, r.servings ? String(r.servings) : ''], [t.facts.difficulty, t.difficulty[r.difficultyKey] || '']].filter(([, v]) => v);
  const label = (key) => t.allergens[key] || key;
  const tags = CARD_TAG_ORDER.filter((k) => r.tagKeys.includes(k)).map((k) => t.tags[k]);

  const ingredients = r.ingredients.map((i) => {
    const name = i.linkedSlug && bySlug[i.linkedSlug] ? `<a href="${recipePath(lang, bySlug[i.linkedSlug])}">${escapeHtml(i.name)}</a>` : escapeHtml(i.name);
    const amount = [i.amount, i.unit].filter(Boolean).join(' ');
    return `<li>${amount ? `<span class="recipe-ingredients__amount">${escapeHtml(amount)}</span> ` : ''}${name}${i.note ? ` <span class="recipe-ingredients__note">(${escapeHtml(i.note)})</span>` : ''}${i.optional ? ` <span class="recipe-ingredients__note">${t.optional}</span>` : ''}</li>`;
  }).join('');
  const steps = r.steps.map((s) => `<li><p>${escapeHtml(s.text)}</p>${s.note ? `<p class="recipe-steps__note">${escapeHtml(s.note)}</p>` : ''}</li>`).join('');
  const n = r.nutrition;
  const nutrition = [[t.nutritionLabels.kcal, n.kcal ? `${n.kcal} kcal` : ''], [t.nutritionLabels.protein, n.protein ? `${n.protein} g` : ''], [t.nutritionLabels.carbs, n.carbs ? `${n.carbs} g` : ''], [t.nutritionLabels.fats, n.fats ? `${n.fats} g` : '']].filter(([, v]) => v);
  const related = recipes.filter((x) => x.slug !== r.slug && x.category?.slug === r.category?.slug).concat(recipes.filter((x) => x.slug !== r.slug && x.category?.slug !== r.category?.slug)).slice(0, 3);

  const main = `  ${breadcrumbs(lang, trail)}
  <article class="recipe container">
    <header class="recipe__head">
      <div class="recipe__image">${recipePicture(r, 900, { eager: true })}</div>
      <div class="recipe__intro">
        ${r.categoryName ? `<p class="eyebrow">${r.categoryName}</p>` : ''}
        <h1>${escapeHtml(r.title)}</h1>
        <p class="recipe__excerpt">${escapeHtml(r.excerpt)}</p>
        ${facts.length ? `<dl class="recipe-facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>` : ''}
        ${tags.length ? `<p class="recipe-tags">${tags.map((tag) => `<span>${tag}</span>`).join('')}</p>` : ''}
      </div>
    </header>
    <div class="recipe-allergens">
      <p><strong>${t.contains}</strong> ${r.contains.length ? r.contains.map(label).join(', ') : t.containsNone}</p>
      ${r.mayContain.length ? `<p><strong>${t.mayContain}</strong> ${r.mayContain.map(label).join(', ')}</p>` : ''}
      ${free.length ? `<p><strong>${t.freeLabel}</strong> ${free.join(', ')}</p>` : ''}
    </div>
    <div class="recipe__body">
      <section class="recipe-ingredients"><h2>${t.ingredients}</h2>${r.servings ? `<p class="recipe-ingredients__servings">${t.servingsFor(r.servings)}</p>` : ''}<ul>${ingredients}</ul></section>
      <section class="recipe-steps"><h2>${t.steps}</h2><ol>${steps}</ol>
        ${r.tip.length ? `<aside class="recipe-tip"><strong>${t.tip}</strong>${r.tip.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}</aside>` : ''}
        ${nutrition.length ? `<div class="recipe-nutrition"><h3>${t.nutrition}</h3><dl>${nutrition.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></div>` : ''}
      </section>
    </div>
    ${appCta(lang, t.cta, t.campaign(r.slug))}
    ${related.length ? `<section class="related"><h2>${t.more}</h2><div class="recipe-grid">${related.map((x) => recipeCard(lang, x)).join('')}</div><p class="related__more"><a href="${t.root}">${t.all}</a></p></section>` : ''}
  </article>`;

  const image = r.image ? storyblokImage(r.image, imageSize(r.image, 1200)[0]) : absoluteUrl(t.image);
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
    recipeCategory: r.categoryName,
    keywords: [...tags, ...free.map(t.keywordFree)].join(', ') || undefined,
    suitableForDiet: r.tagKeys.includes('vegan') ? 'https://schema.org/VeganDiet' : undefined,
    recipeIngredient: r.ingredients.map(ingredientText),
    recipeInstructions: r.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, text: s.text })),
    nutrition: n.kcal ? { '@type': 'NutritionInformation', servingSize: t.servingSize, calories: `${n.kcal} kcal`, proteinContent: n.protein ? `${n.protein} g` : undefined, carbohydrateContent: n.carbs ? `${n.carbs} g` : undefined, fatContent: n.fats ? `${n.fats} g` : undefined } : undefined,
    inLanguage: lang,
  };

  const titleFree = freeKeys(r).filter((k) => k === 'milk' || k === 'egg').map((k) => t.freeFrom[k]);
  return renderPage({
    lang,
    title: t.seoTitle(r.title, titleFree),
    description: metaDescription(r.excerpt),
    canonical: href,
    alternates,
    ogType: 'article',
    image,
    imageAlt: r.imageAlt || r.title,
    jsonLd: [JSON.parse(JSON.stringify(recipeLd)), breadcrumbJsonLd(trail)],
    nav: topNav({ lang, active: 'recipes', czUrl: alternates.cs, enUrl: alternates.en }),
    main,
  });
}

// ── Listing ────────────────────────────────────────────────────────────

function chip(group, value, label, { pressed = false } = {}) {
  return `<button type="button" class="filter-chip" data-filter="${group}" data-value="${value}" aria-pressed="${pressed}">${label}</button>`;
}

function listingPage(lang) {
  const t = L[lang];
  const sorted = [...recipes].sort((a, b) => view(a, lang).title.localeCompare(view(b, lang).title, t.sort));
  const categoriesUsed = data.categories.filter((c) => recipes.some((r) => r.category?.slug === c.slug));
  const allergensUsed = Object.keys(t.allergens).filter((key) => ['milk', 'egg', 'wheat'].includes(key) || recipes.some((r) => r.contains.includes(key) || r.mayContain.includes(key)));
  const tagsUsed = FILTER_TAGS.filter((k) => recipes.some((r) => r.tagKeys.includes(k)));
  const trail = [[t.breadcrumb, t.root]];
  const f = t.filters;

  const main = `  <section class="section recipes-hub">
    <div class="container">
      <div class="section-heading"><div><p class="eyebrow">${t.listEyebrow}</p><h1>${t.listH1}</h1></div><p>${t.listLead}</p></div>
      <div class="recipe-filters" id="recipeFilters" hidden>
        <div class="recipe-filters__row"><span>${f.category}</span>${chip('category', '', f.all, { pressed: true })}${categoriesUsed.map((c) => chip('category', c.slug, lang === 'en' ? c.nameEn : c.name)).join('')}</div>
        <div class="recipe-filters__row"><span>${f.free}</span>${allergensUsed.map((k) => chip('free', k, t.allergens[k])).join('')}</div>
        <div class="recipe-filters__row"><span>${f.time}</span>${chip('time', '30', f.t30)}${chip('time', '60', f.t60)}</div>
        ${tagsUsed.length ? `<div class="recipe-filters__row"><span>${f.tags}</span>${tagsUsed.map((k) => chip('tag', k, t.tags[k])).join('')}</div>` : ''}
        <p class="recipe-filters__count" aria-live="polite"><span id="recipeCount">${recipes.length}</span> ${f.count(recipes.length)}</p>
      </div>
      <div class="recipe-grid" id="recipeGrid">${sorted.map((r) => recipeCard(lang, r)).join('')}</div>
      <p class="recipe-empty" id="recipeEmpty" hidden>${t.empty}</p>
      ${appCta(lang, t.cta, t.listCampaign)}
    </div>
  </section>
  <script>
  (function(){
    const box=document.getElementById('recipeFilters');const grid=document.getElementById('recipeGrid');if(!box||!grid)return;box.hidden=false;
    const cards=[...grid.querySelectorAll('.recipe-card')];const state={category:'',free:new Set(),time:'',tag:new Set()};const names=${JSON.stringify(t.allergens)};const warnLabel=${JSON.stringify(t.warn)};
    const apply=()=>{let shown=0;cards.forEach((c)=>{const has=c.dataset.contains.split(' ');const may=c.dataset.may.split(' ');const tags=c.dataset.tags.split(' ');const min=Number(c.dataset.minutes)||0;
      const ok=(!state.category||c.dataset.category===state.category)&&[...state.free].every((a)=>!has.includes(a))&&(!state.time||(min&&min<=Number(state.time)))&&[...state.tag].every((t)=>tags.includes(t));
      const warn=[...state.free].filter((a)=>may.includes(a)).map((a)=>names[a]||a);const w=c.querySelector('.recipe-card__warn');if(w){w.hidden=!warn.length;w.textContent=warn.length?warnLabel+warn.join(', '):'';}
      c.hidden=!ok;if(ok)shown++;});document.getElementById('recipeCount').textContent=shown;document.getElementById('recipeEmpty').hidden=shown>0;};
    box.addEventListener('click',(e)=>{const b=e.target.closest('.filter-chip');if(!b)return;const g=b.dataset.filter,v=b.dataset.value;
      if(g==='category'||g==='time'){const same=state[g]===v&&g==='time';state[g]=same?'':v;box.querySelectorAll('[data-filter="'+g+'"]').forEach((x)=>x.setAttribute('aria-pressed',String(!same&&x.dataset.value===v)));}
      else{const set=state[g];set.has(v)?set.delete(v):set.add(v);b.setAttribute('aria-pressed',String(set.has(v)));}
      apply();});
  })();
  </script>`;

  return renderPage({
    lang,
    title: t.listTitle,
    description: t.listDescription,
    canonical: t.root,
    alternates: { cs: L.cs.root, en: L.en.root },
    image: recipes[0]?.image ? storyblokImage(recipes[0].image, 1200) : absoluteUrl(t.image),
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'CollectionPage', name: t.listH1, url: absoluteUrl(t.root), inLanguage: lang, publisher: ORGANIZATION, mainEntity: { '@type': 'ItemList', itemListElement: sorted.map((r, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(recipePath(lang, r)) })) } },
      breadcrumbJsonLd(trail),
    ],
    nav: topNav({ lang, active: 'recipes', czUrl: L.cs.root, enUrl: L.en.root }),
    main,
  });
}

// ── Build ──────────────────────────────────────────────────────────────

for (const lang of ['cs', 'en']) {
  const dir = L[lang].root.slice(1);
  await fs.rm(path.join(root, dir), { recursive: true, force: true });
  await write(`${dir}index.html`, listingPage(lang));
  for (const r of recipes) await write(`${recipePath(lang, r).slice(1)}index.html`, recipePage(lang, r));
}
console.log(`Built /recepty/ and /en/recipes/ with ${recipes.length} recipes each.`);
