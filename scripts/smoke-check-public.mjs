import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');

const requiredFiles = ['favicon.png', 'assets/styles.css', 'assets/main.js'];

async function exists(relPath) {
  try {
    await fs.access(path.join(publicDir, relPath));
    return true;
  } catch {
    return false;
  }
}

async function* walkHtml(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkHtml(fullPath);
      continue;
    }
    if (entry.isFile() && entry.name.endsWith('.html')) {
      yield fullPath;
    }
  }
}

function assetRefsFromHtml(htmlFilePath, html) {
  const refs = new Set();
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const ref = match[1];
    if (!ref.includes('assets/')) continue;
    if (/^[a-z]+:/i.test(ref) || ref.startsWith('//')) continue;

    const normalized = ref.startsWith('/')
      ? ref.slice(1)
      : path.normalize(path.join(path.dirname(path.relative(publicDir, htmlFilePath)), ref));

    if (normalized.startsWith('assets/')) {
      refs.add(normalized);
    }
  }
  return refs;
}

const missing = [];
for (const required of requiredFiles) {
  if (!(await exists(required))) missing.push(required);
}

const referencedAssets = new Set();
for await (const htmlFile of walkHtml(publicDir)) {
  const html = await fs.readFile(htmlFile, 'utf8');
  for (const ref of assetRefsFromHtml(htmlFile, html)) {
    referencedAssets.add(ref);
  }
}

for (const asset of referencedAssets) {
  if (!(await exists(asset))) missing.push(asset);
}

if (missing.length) {
  console.error('Smoke check failed. Missing build artifacts:');
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

console.log(`Smoke check passed. Verified ${requiredFiles.length} required files and ${referencedAssets.size} referenced assets.`);
