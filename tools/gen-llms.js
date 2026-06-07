#!/usr/bin/env node
// Regenerates llms.txt + llms-full.txt from the E data in index.html.
// Usage: node tools/gen-llms.js   (run from the repo root)
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

const m = html.match(/const E=(\[[\s\S]*?\n\]);/);
if (!m) { console.error('could not find the E array in index.html'); process.exit(1); }
const E = eval(m[1]);

const SECTIONS = [
  { id: 'auth',      label: 'Authentication & Login' },
  { id: 'network',   label: 'Network & Access' },
  { id: 'drm',       label: 'DRM & Playback' },
  { id: 'installer', label: 'Installer' },
  { id: 'webapi',    label: 'Web API' },
];

const SITE = 'https://0iy.github.io/spotify-error-ref/';
const REPO = 'https://github.com/0iy/spotify-error-ref';

const stripTags  = s => String(s).replace(/<[^>]+>/g, '');
const fixText    = f => (Array.isArray(f) ? f.join(' ') : f);
const chainText  = c => (c || []).map(n => (n.s ? `${n.l} (${n.s})` : n.l)).join(' -> ');

const seen = new Set();
const groups = [];
for (const { id, label } of SECTIONS) {
  const items = E.filter(e => (e.cat || []).includes(id) && !seen.has(e.code));
  items.forEach(e => seen.add(e.code));
  if (items.length) groups.push({ label, items });
}
const rest = E.filter(e => !seen.has(e.code));
if (rest.length) groups.push({ label: 'Other', items: rest });

let idx = '';
idx += '# Spotify Desktop Error Reference\n\n';
idx += '> Community reference for error codes in the Spotify desktop client (Windows). '
     + 'Each error code is documented with its displayed message, the chain of components that '
     + 'leads to it, the conditions that trigger it, and step-by-step resolution.\n\n';
idx += 'The website renders its content with JavaScript. The plain-text files linked below contain '
     + 'the complete reference for machine reading. Not affiliated with or endorsed by Spotify AB.\n\n';
idx += '## Docs\n';
idx += `- [Full reference - all codes, causes, fixes](${SITE}llms-full.txt): complete plain-text dump of every documented error code\n`;
idx += `- [Website](${SITE}): interactive reference with search and filtering\n`;
idx += `- [Source repository](${REPO}): contribute codes or corrections\n\n`;
idx += '## Error codes\n';
for (const g of groups) for (const e of g.items) idx += `- ${e.code} - ${stripTags(e.title)} (${e.sev})\n`;

let full = '';
full += '# Spotify Desktop Error Reference - Full Reference\n\n';
full += `Source: ${SITE}\nRepository: ${REPO}\n`;
full += `Scope: Windows desktop client. ${E.length} error codes documented.\n`;
full += 'Unofficial community reference based on observed client behavior and user-reported '
      + 'reproduction cases. Not affiliated with or endorsed by Spotify AB.\n\n';
for (const g of groups) {
  full += `\n## ${g.label}\n`;
  for (const e of g.items) {
    full += `\n### ${e.code} - ${stripTags(e.title)}\n`;
    full += `Severity: ${e.sev}\n`;
    if (e.msg) full += `Displayed message: "${stripTags(e.msg)}"\n`;
    if (e.chain && e.chain.length) full += `Cause chain: ${chainText(e.chain)}\n`;
    if (e.causes && e.causes.length) { full += 'Causes:\n'; e.causes.forEach(c => full += `  - ${stripTags(c)}\n`); }
    if (e.fixes && e.fixes.length)  { full += 'Resolution:\n'; e.fixes.forEach((f, i) => full += `  ${i + 1}. ${stripTags(fixText(f))}\n`); }
    if (e.note) full += `Note: ${stripTags(e.note)}\n`;
  }
}

fs.writeFileSync(path.join(root, 'llms.txt'), idx);
fs.writeFileSync(path.join(root, 'llms-full.txt'), full);
console.log(`wrote llms.txt and llms-full.txt for ${E.length} codes`);
