// Stáhne ze Storybloku recepty se zapnutým polem `web` a uloží je do content/recepty/recipes.json.
//
// Token se čte jen z proměnné prostředí STORYBLOK_TOKEN (ve Vercelu: Settings → Environment Variables).
// Bez tokenu (nebo když API neodpoví) zůstane poslední uložený soubor a build pokračuje.

import fs from 'node:fs/promises';
import path from 'node:path';
import { root } from './lib/site.mjs';

const OUTPUT = path.join(root, 'content/recepty/recipes.json');
const OVERRIDES = JSON.parse(await fs.readFile(path.join(root, 'content/recepty/slug-overrides.json'), 'utf8'));

// URL slug from a title: lowercase ASCII, words joined by dashes, at most ~60 characters.
function slugify(text) {
  const slug = String(text).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  if (slug.length <= 60) return slug;
  return slug.slice(0, 61).replace(/-[^-]*$/, '');
}
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

// First image asset in a Storyblok content object (field names differ between content types).
function firstImage(content) {
  for (const value of Object.values(content || {})) {
    if (value && typeof value === 'object' && /\.(png|jpe?g|webp|svg)$/i.test(value.filename || '')) return value.filename;
  }
  return null;
}

// Field lookup that ignores case (Storyblok blocks may use Name / name), like the app does.
function field(obj, key) {
  if (!obj || typeof obj !== 'object') return undefined;
  if (key in obj) return obj[key];
  const hit = Object.keys(obj).find((k) => k.toLowerCase() === key.toLowerCase());
  return hit ? obj[hit] : undefined;
}

// Recipe author block (name, link, logo). Empty → the recipe is by Bejby bez alergií.
function recipeAuthor(raw) {
  const block = Array.isArray(raw) ? raw[0] : raw;
  const name = String(field(block, 'name') || '').trim();
  if (!name) return null;
  const link = field(block, 'link');
  let url = typeof link === 'string' ? link : link?.url || (link?.linktype === 'url' ? link?.cached_url : '') || '';
  url = url.trim();
  if (url && !/^https?:\/\//i.test(url) && /^[\w.-]+\.[a-z]{2,}/i.test(url)) url = `https://${url}`;
  return { name, url: /^https?:\/\//i.test(url) ? url : '', logo: field(block, 'logo')?.filename || null };
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
  // Allergen photos (shown as tiles on the recipe detail, like in the app).
  const allergenImages = Object.fromEntries(allergens.map((a) => [a.slug, firstImage(a.content)]).filter(([, img]) => img));
  const allergenList = (ids) => [...new Set((ids || []).map((id) => allergenByUuid[id]).filter(Boolean))];

  const webRecipes = recipes.filter((story) => String(story.content?.component).toLowerCase() === 'recipe' && story.content.web === true);
  // Web slugs: Storyblok fields web_slug / web_slug_en win, then content/recepty/slug-overrides.json,
  // then the Storyblok slug (CZ) or the English title (EN).
  const webSlug = (story) => (story.content.web_slug || '').trim() || OVERRIDES[story.slug]?.cs || story.slug;
  const webSlugEn = (story) => {
    const en = enByUuid[story.uuid];
    return (story.content.web_slug_en || '').trim() || OVERRIDES[story.slug]?.en || slugify(en?.content?.title || story.content.title || story.slug);
  };
  const slugByUuid = Object.fromEntries(webRecipes.map((story) => [story.uuid, webSlug(story)]));

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
      slug: webSlug(story),
      slugEn: webSlugEn(story),
      storyblokSlug: story.slug,
      ...texts(c, story.name),
      // image2 = full photo used in the app; image = older cut-out (fallback).
      image: field(c, 'image2')?.filename || c.image?.filename || null,
      imageAlt: field(c, 'image2')?.alt || c.image?.alt || '',
      photo: Boolean(field(c, 'image2')?.filename),
      author: recipeAuthor(field(c, 'author')),
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
    allergenImages,
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
  console.warn(`fetch-recipes: CHYBA – ${error.message} – používám uložený content/recepty/recipes.json (fotky image2 a autoři se neaktualizují)`);
}
