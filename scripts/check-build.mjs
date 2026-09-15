import { readFileSync } from 'node:fs';

const html = readFileSync('dist/public/index.html', 'utf8');
const leftovers = html.match(/%VITE_[A-Z0-9_]+%/g);

if (leftovers) {
  console.error('\n✖ Build contains unsubstituted Vite placeholders:', [...new Set(leftovers)].join(', '));
  process.exit(1);
}

console.log('✓ No unsubstituted Vite placeholders in build output.');
