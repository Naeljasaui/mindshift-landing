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
]

fs.rmSync('public', { recursive: true, force: true })
fs.mkdirSync('public/assets', { recursive: true })

for (const f of FILES) {
  fs.copyFileSync(f, `public/${f}`)
}
fs.copyFileSync('assets/app.js', 'public/assets/app.js')

console.log('public/ ready:', fs.readdirSync('public').join(', '))
