// Stáhne ze Storybloku recepty se zapnutým polem `web` a uloží je do content/recepty/recipes.json.
//
// Token se čte jen z proměnné prostředí STORYBLOK_TOKEN (ve Vercelu: Settings → Environment Variables).
// Bez tokenu (nebo když API neodpoví) zůstane poslední uložený soubor a build pokračuje.

import fs from 'node:fs/promises';
import path from 'node:path';
import { root } from './lib/site.mjs';

const OUTPUT = path.join(root, 'content/recepty/recipes.json');
const TOKEN = process.env.STORYBLOK_TOKEN;

const DIFFICULTY_LABELS = { easy: true, medium: true, hard: true };

async function fetchAll(params, language) {
  const stories = [];
  for (let page = 1; page < 20; page += 1) {
    const url = new URL('https://api.storyblok.com/v2/cdn/stories');
    for (const [key, value] of Object.entries({ ...params, token: TOKEN, per_page: '100', page: String(page), version: 'published', ...(language ? { language } : {}) })) url.searchParams.set(key, value);
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
  const recipesEn = await fetchAll({ starts_with: 'recipes/' }, 'en');
  const categories = await fetchAll({ starts_with: 'recipe-category/' });
  const categoriesEn = await fetchAll({ starts_with: 'recipe-category/' }, 'en');
  const allergens = await fetchAll({ starts_with: 'allergen/' });
  const enByUuid = Object.fromEntries(recipesEn.map((story) => [story.uuid, story]));
  const enCategoryTitle = Object.fromEntries(categoriesEn.map((c) => [c.uuid, (c.content?.title || '').trim()]));

  const categoryByUuid = Object.fromEntries(categories.map((c) => [c.uuid, { slug: c.slug, name: c.name, nameEn: enCategoryTitle[c.uuid] || c.name }]));
  const allergenByUuid = Object.fromEntries(allergens.map((a) => [a.uuid, a.slug]));
  const allergenList = (ids) => [...new Set((ids || []).map((id) => allergenByUuid[id]).filter(Boolean))];

  const webRecipes = recipes.filter((story) => String(story.content?.component).toLowerCase() === 'recipe' && story.content.web === true);
  const slugByUuid = Object.fromEntries(webRecipes.map((story) => [story.uuid, story.slug]));

  const texts = (c, fallbackName) => ({
    title: (c.title || fallbackName).trim(),
    excerpt: (c.excerpt || '').trim(),
    imageAlt: c.image?.alt || '',
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
  });

  const normalized = webRecipes.map((story) => {
    const c = story.content;
    const en = enByUuid[story.uuid];
    const nutrition = (c.nutrition || [])[0] || {};
    return {
      slug: story.slug,
      ...texts(c, story.name),
      image: c.image?.filename || null,
      imageAlt: c.image?.alt || '',
      category: categoryByUuid[c.category] || null,
      tagKeys: (c.tags || []).map((t) => (t.startsWith('no_allergen') || t === 'allergen_free' ? 'no_allergen' : t)),
      servings: number(c.servings),
      difficultyKey: DIFFICULTY_LABELS[c.difficulty] ? c.difficulty : null,
      activeMinutes: number(c.active_minutes),
      cookMinutes: number(c.cook_minutes),
      totalMinutes: number(c.total_minutes),
      nutrition: { kcal: number(nutrition.kcal), protein: number(nutrition.protein), carbs: number(nutrition.carbs), fats: number(nutrition.fats) },
      contains: allergenList(c.contains_allergens),
      mayContain: allergenList(c.may_contain_allergens),
      en: en ? texts(en.content, en.name) : null,
      published: (story.first_published_at || story.published_at || story.created_at || '').slice(0, 10),
      updated: (story.published_at || story.first_published_at || '').slice(0, 10),
    };
  }).sort((a, b) => a.title.localeCompare(b.title, 'cs'));

  const snapshot = {
    totalInApp: recipes.filter((story) => String(story.content?.component).toLowerCase() === 'recipe').length,
    categories: categories.map((c) => ({ slug: c.slug, name: c.name, nameEn: enCategoryTitle[c.uuid] || c.name })),
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
