import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');

const copyTargets = [
  'index.html',
  'CNAME',
  'assets',
  'eczema',
  'signs',
  'main-suspects',
  'en',
];

const requiredAssetFiles = [
  'styles.css',
  'main.js',
];

await fs.rm(publicDir, { recursive: true, force: true });
await fs.mkdir(publicDir, { recursive: true });

for (const target of copyTargets) {
  const source = path.join(root, target);
  const destination = path.join(publicDir, target);
  await fs.cp(source, destination, { recursive: true });
}

await fs.cp(path.join(root, 'assets/favicon.png'), path.join(publicDir, 'favicon.png'));

for (const file of requiredAssetFiles) {
  await fs.access(path.join(publicDir, 'assets', file));
}

console.log(`Prepared ${copyTargets.length} deployment targets in /public`);
