const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const output = path.join(root, 'dist')
const files = [
  'index.html',
  'about.html',
  'services.html',
  'service.html',
  'contact.html',
  'privacy-policy.html',
  'terms.html',
  'cookie-policy.html',
  'disclaimer.html',
]

fs.rmSync(output, { recursive: true, force: true })
fs.mkdirSync(output, { recursive: true })
for (const file of files) {
  fs.copyFileSync(path.join(root, file), path.join(output, file))
}
fs.cpSync(path.join(root, 'assets'), path.join(output, 'assets'), { recursive: true })
fs.copyFileSync(path.join(root, 'manifest.json'), path.join(output, 'manifest.json'))
console.log(`Built static website into ${output}`)
