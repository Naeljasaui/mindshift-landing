// Assembles the deployable site into public/ (Vercel's expected output dir).
// Runs after Babel compiles src/app.jsx -> assets/app.js.
const fs = require('fs')

const FILES = [
  'index.html',
  'privacy.html',
  'terms.html',
  'refunds.html',
  'robots.txt',
  'sitemap.xml',
  'og-image.png',
]

// Don't rm the directory itself — on Windows an open handle (e.g. a local
// dev server) makes that EPERM. Overwriting the files is enough.
fs.mkdirSync('public/assets', { recursive: true })

// Clean stale files that are no longer part of the site
for (const f of fs.readdirSync('public')) {
  if (f !== 'assets' && !FILES.includes(f)) {
    try { fs.rmSync(`public/${f}`, { recursive: true, force: true }) } catch {}
  }
}

for (const f of FILES) {
  fs.copyFileSync(f, `public/${f}`)
}
fs.copyFileSync('assets/app.js', 'public/assets/app.js')

console.log('public/ ready:', fs.readdirSync('public').join(', '))
