import { access, readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) => {
        const path = join(directory, entry.name);
        return entry.isDirectory() ? walk(path) : path;
      }),
    )
  ).flat();
}

const files = await walk('dist');
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const errors = [];
let internalLinks = 0;
let imageReferences = 0;

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  if (!/<title>.+<\/title>/.test(html)) errors.push(`${file}: missing title`);
  if (!/<meta name="description" content="[^"]+">/.test(html)) errors.push(`${file}: missing description`);
  if (!/<link rel="canonical" href="https?:\/\/[^"]+">/.test(html)) errors.push(`${file}: missing canonical`);

  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    if (
      href.startsWith('/images/') ||
      href.startsWith('/favicon') ||
      href.startsWith('/_astro/') ||
      /\.[a-z0-9]+(?:[?#]|$)/i.test(href)
    )
      continue;
    internalLinks += 1;
    const pathname = href.split(/[?#]/)[0];
    const target = pathname === '/' ? 'dist/index.html' : join('dist', pathname, 'index.html');
    try {
      await access(target);
    } catch {
      errors.push(`${file}: broken internal link ${href}`);
    }
  }

  for (const [, src] of html.matchAll(/(?:src|content)="(\/images\/[^"]+)"/g)) {
    imageReferences += 1;
    try {
      await access(join('dist', src));
    } catch {
      errors.push(`${file}: missing image ${src}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(
    JSON.stringify(
      {
        htmlPages: htmlFiles.length,
        internalLinksChecked: internalLinks,
        imageReferencesChecked: imageReferences,
        status: 'ok',
      },
      null,
      2,
    ),
  );
}
