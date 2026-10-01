// Stáhne ze Storybloku recepty se zapnutým polem `web` a uloží je do content/recepty/recipes.json.
//
// Token se čte jen z proměnné prostředí STORYBLOK_TOKEN (ve Vercelu: Settings → Environment Variables).
// Bez tokenu (nebo když API neodpoví) zůstane poslední uložený soubor a build pokračuje.

import fs from 'node:fs/promises';
import path from 'node:path';
import { root } from './lib/site.mjs';

const OUTPUT = path.join(root, 'content/recepty/recipes.json');
const TOKEN = process.env.STORYBLOK_TOKEN;

// České názvy alergenů a štítků – stejné jako v aplikaci (lib/lang/cs_cz_desc.dart).
const ALLERGEN_LABELS = {
  legumes: 'Luštěniny', wheat: 'Pšenice', oat: 'Oves', citrus: 'Citrusy', root: 'Kořenová zelenina', tomato: 'Rajče',
  pepper: 'Paprika', exotic: 'Exotické ovoce', fish: 'Ryby', berries: 'Bobuloviny', egg: 'Vejce', poultry: 'Kuřecí',
  milk: 'Mléko', beef: 'Hovězí', soya: 'Sója', cocoa: 'Kakao', seeds: 'Semínka', nuts: 'Ořechy', peanuts: 'Arašídy',
  spices: 'Koření', honey: 'Med', carob: 'Karob', crustacean: 'Korýši',
};
const TAG_LABELS = {
  under_30: 'Do 30 minut', vegan: 'Veganské', no_cook: 'Bez vaření', one_pot: 'Z jednoho hrnce', over_night: 'Přes noc',
  travel: 'Na cesty', allergen_free: 'Bez alergenů', no_allergen: 'Bez alergenů', no_allergens: 'Bez alergenů',
};
const DIFFICULTY_LABELS = { easy: 'jednoduché', medium: 'středně těžké', hard: 'těžké' };

async function fetchAll(params) {
  const stories = [];
  for (let page = 1; page < 20; page += 1) {
    const url = new URL('https://api.storyblok.com/v2/cdn/stories');
    for (const [key, value] of Object.entries({ ...params, token: TOKEN, per_page: '100', page: String(page), version: 'published' })) url.searchParams.set(key, value);
    let response;
    for (let attempt = 0; attempt < 5; attempt += 1) {
      response = await fetch(url);
      if (response.status !== 429) break;
      await new Promise((resolve) => setTimeout(resolve, 1500 * (attempt + 1))); // rate limit
    }
    if (!response.ok) throw new Error(`Storyblok ${response.status} for ${params.starts_with}`);
    const data = await response.json();
    stories.push(...data.stories);
    if (data.stories.length < 100) break;
  }
  return stories;
}

function number(value) {
  const n = Number(String(value ?? '').replace(',', '.'));
  return Number.isFinite(n) && n > 0 ? n : null;
}

function richTextToParagraphs(doc) {
  if (!doc || typeof doc !== 'object') return [];
  const text = (node) => (node.type === 'text' ? node.text : (node.content || []).map(text).join(''));
  const out = [];
  for (const block of doc.content || []) {
    if (block.type === 'bullet_list' || block.type === 'ordered_list') {
      for (const item of block.content || []) out.push(`• ${text(item).trim()}`);
    } else {
      const t = text(block).trim();
      if (t) out.push(t);
    }
  }
  return out;
}

async function main() {
  if (!TOKEN) {
    console.log('fetch-recipes: STORYBLOK_TOKEN není nastavený – používám uložený content/recepty/recipes.json');
    return;
  }

  const recipes = await fetchAll({ starts_with: 'recipes/' });
  const categories = await fetchAll({ starts_with: 'recipe-category/' });
  const allergens = await fetchAll({ starts_with: 'allergen/' });

  const categoryByUuid = Object.fromEntries(categories.map((c) => [c.uuid, { slug: c.slug, name: c.name }]));
  const allergenByUuid = Object.fromEntries(allergens.map((a) => [a.uuid, a.slug]));
  const allergenList = (ids) => [...new Set((ids || []).map((id) => allergenByUuid[id]).filter(Boolean))];

  const webRecipes = recipes.filter((story) => String(story.content?.component).toLowerCase() === 'recipe' && story.content.web === true);
  const slugByUuid = Object.fromEntries(webRecipes.map((story) => [story.uuid, story.slug]));

  const normalized = webRecipes.map((story) => {
    const c = story.content;
    const nutrition = (c.nutrition || [])[0] || {};
    return {
      slug: story.slug,
      title: (c.title || story.name).trim(),
      excerpt: (c.excerpt || '').trim(),
      image: c.image?.filename || null,
      imageAlt: c.image?.alt || '',
      category: categoryByUuid[c.category] || null,
      tags: [...new Set((c.tags || []).map((t) => TAG_LABELS[t]).filter(Boolean))],
      tagKeys: (c.tags || []).map((t) => (t.startsWith('no_allergen') || t === 'allergen_free' ? 'no_allergen' : t)),
      servings: number(c.servings),
      difficulty: DIFFICULTY_LABELS[c.difficulty] || null,
      activeMinutes: number(c.active_minutes),
      cookMinutes: number(c.cook_minutes),
      totalMinutes: number(c.total_minutes),
      nutrition: { kcal: number(nutrition.kcal), protein: number(nutrition.protein), carbs: number(nutrition.carbs), fats: number(nutrition.fats) },
      contains: allergenList(c.contains_allergens),
      mayContain: allergenList(c.may_contain_allergens),
      ingredients: (c.Ingredients || c.ingredients || []).map((i) => ({
        name: (i.name || '').trim(),
        amount: (i.amount || '').trim(),
        unit: (i.unit || '').trim(),
        note: (i.note || '').trim(),
        optional: Boolean(i.is_optional),
        linkedSlug: slugByUuid[i.linked_recipe] || null,
      })).filter((i) => i.name),
      steps: (c.steps || []).map((s) => ({ text: (s.text || '').trim(), note: (s.note || '').trim() })).filter((s) => s.text),
      tip: richTextToParagraphs(c.prep_tip),
      published: (story.first_published_at || story.published_at || story.created_at || '').slice(0, 10),
      updated: (story.published_at || story.first_published_at || '').slice(0, 10),
    };
  }).sort((a, b) => a.title.localeCompare(b.title, 'cs'));

  const snapshot = {
    totalInApp: recipes.filter((story) => String(story.content?.component).toLowerCase() === 'recipe').length,
    categories: categories.map((c) => ({ slug: c.slug, name: c.name })),
    allergenLabels: ALLERGEN_LABELS,
    recipes: normalized,
  };

  await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
  await fs.writeFile(OUTPUT, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
  console.log(`fetch-recipes: uloženo ${normalized.length} receptů pro web (z ${snapshot.totalInApp} v aplikaci)`);
}

try {
  await main();
} catch (error) {
  console.warn(`fetch-recipes: ${error.message} – používám uložený content/recepty/recipes.json`);
}
