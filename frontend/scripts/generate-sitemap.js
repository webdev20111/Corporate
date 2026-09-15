const fs = require('fs');
const path = require('path');

const baseUrl = (process.argv[2] || process.env.SITE_URL || '').trim();
if (!baseUrl) {
  console.error('Usage: node scripts/generate-sitemap.js https://example.com');
  process.exit(1);
}

const normalizedBase = baseUrl.replace(/\/+$/, '');
const routesFile = path.join(__dirname, '..', 'src', 'app', 'pages', 'pages-routing.module.ts');
const outputFile = path.join(__dirname, '..', 'src', 'assets', 'sitemap.xml');

const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const extractRouteBlocks = (source) => {
  const routesIndex = source.indexOf('const routes');
  if (routesIndex === -1) {
    return [];
  }

  const arrayStart = source.indexOf('[', routesIndex);
  if (arrayStart === -1) {
    return [];
  }

  const blocks = [];
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let blockStart = -1;

  for (let i = arrayStart + 1; i < source.length; i += 1) {
    const ch = source[i];
    const prev = source[i - 1];

    if (inString) {
      if (ch === stringChar && prev !== '\\') {
        inString = false;
      }
      continue;
    }

    if (ch === '"' || ch === "'" || ch === '`') {
      inString = true;
      stringChar = ch;
      continue;
    }

    if (ch === '{') {
      if (depth === 0) {
        blockStart = i;
      }
      depth += 1;
      continue;
    }

    if (ch === '}') {
      depth -= 1;
      if (depth === 0 && blockStart !== -1) {
        blocks.push(source.slice(blockStart, i + 1));
        blockStart = -1;
      }
      continue;
    }

    if (ch === ']' && depth === 0) {
      break;
    }
  }

  return blocks;
};

const content = fs.readFileSync(routesFile, 'utf8');
const blocks = extractRouteBlocks(content);

const paths = blocks
  .filter((block) => !/\bredirectTo\b/.test(block))
  .map((block) => {
    const match = block.match(/\bpath\s*:\s*(['"])(.*?)\1/);
    return match ? match[2].trim() : null;
  })
  .filter((routePath) => routePath !== null)
  .filter((routePath) => !routePath.includes(':'));

const uniquePaths = Array.from(new Set(paths));
uniquePaths.sort((a, b) => {
  if (a === '') return -1;
  if (b === '') return 1;
  return a.localeCompare(b);
});

const urls = uniquePaths.map((routePath) =>
  routePath === '' ? `${normalizedBase}/` : `${normalizedBase}/${routePath}`
);

const xmlLines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`),
  '</urlset>',
  ''
];

fs.writeFileSync(outputFile, xmlLines.join('\n'), 'utf8');
console.log(`Generated ${urls.length} URLs at ${outputFile}`);
