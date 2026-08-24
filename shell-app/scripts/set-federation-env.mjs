import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [, , env, ...rest] = process.argv;

const VALID_ENVS = ['dev', 'qa', 'preprod', 'prod'];

if (!env || !VALID_ENVS.includes(env)) {
  console.error(`Usage: node scripts/set-federation-env.mjs <${VALID_ENVS.join('|')}> [--out <path>]`);
  process.exit(1);
}

const outFlagIndex = rest.indexOf('--out');
const outPath =
  outFlagIndex !== -1 && rest[outFlagIndex + 1]
    ? resolve(process.cwd(), rest[outFlagIndex + 1])
    : join(rootDir, 'public', 'federation.manifest.json');

const sourcePath = join(rootDir, 'env', `federation.manifest.${env}.json`);

if (!existsSync(sourcePath)) {
  console.error(`No manifest found for env "${env}" at ${sourcePath}`);
  process.exit(1);
}

mkdirSync(dirname(outPath), { recursive: true });
copyFileSync(sourcePath, outPath);

console.log(`federation.manifest.json set to "${env}" -> ${outPath}`);
