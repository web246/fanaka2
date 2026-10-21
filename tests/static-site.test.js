const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')
const vm = require('node:vm')

const root = path.resolve(__dirname, '..')
const pages = [
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

function loadData() {
  const context = { window: {} }
  vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/js/data.js'), 'utf8'), context)
  return context.window.FANAKA
}

test('all routes are standalone HTML documents using shared vanilla assets', () => {
  for (const page of pages) {
    const html = fs.readFileSync(path.join(root, page), 'utf8')
    assert.match(html, /<!doctype html>/i, `${page} is an HTML document`)
    assert.match(html, /assets\/css\/site\.css/, `${page} loads shared CSS`)
    assert.match(html, /assets\/js\/app\.js/, `${page} loads vanilla JavaScript`)
    assert.doesNotMatch(html, /src\/main\.jsx|id="root"/, `${page} does not mount React`)
  }
})

test('site data defines seven unique service routes with required detail copy', () => {
  const data = loadData()
  assert.equal(data.services.length, 7)
  assert.equal(new Set(data.services.map((item) => item.slug)).size, 7)
  for (const service of data.services) {
    assert.ok(service.title)
    assert.ok(service.image.startsWith('https://'))
    assert.equal(service.paragraphs.length, 2)
    assert.equal(service.highlights.length, 6)
    assert.equal(service.audience.length, 4)
  }
})

test('all static asset links and navigation documents exist', () => {
  const app = fs.readFileSync(path.join(root, 'assets/js/app.js'), 'utf8')
  const referencedFiles = [
    'about.html', 'services.html', 'service.html', 'contact.html',
    'privacy-policy.html', 'terms.html', 'cookie-policy.html', 'disclaimer.html',
  ]
  for (const file of referencedFiles) assert.ok(fs.existsSync(path.join(root, file)), `${file} exists`)
  assert.match(app, /mailto:/)
  assert.match(app, /aria-expanded/)
  assert.match(app, /IntersectionObserver/)
  assert.match(app, /prefers-reduced-motion/)
})

test('package scripts build and serve the static files without a framework runtime', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
  assert.equal(pkg.scripts.build, 'node scripts/build.js')
  assert.equal(pkg.scripts.dev, 'node scripts/server.js')
  assert.equal(pkg.scripts.test, 'node --test')
  assert.deepEqual(pkg.dependencies || {}, {})
  assert.deepEqual(pkg.devDependencies || {}, {})
})
