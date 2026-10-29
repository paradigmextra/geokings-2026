import assert from 'node:assert/strict';

const origin = process.env.TEST_BASE_URL || 'http://localhost:3000';
const routes = [
  ['/', 'Transforming', 'https://geoking.org'],
  ['/about', 'Our Vision', 'https://geoking.org/about'],
  ['/services/land-surveying', 'Boundary surveys', 'https://geoking.org/services/land-surveying'],
  ['/blog/gis-technology-agriculture', 'Agriculture', 'https://geoking.org/blog/gis-technology-agriculture'],
  ['/contact', 'Continue on WhatsApp', 'https://geoking.org/contact'],
];
for (const [path, content, canonical] of routes) {
  const response = await fetch(origin + path);
  const html = await response.text();
  assert.equal(response.status, 200, path);
  assert.ok(html.includes(content), `${path}: content must exist before JavaScript`);
  assert.equal((html.match(/<title>/g) || []).length, 1, `${path}: unique title`);
  assert.ok(html.includes(`rel="canonical" href="${canonical}"`), `${path}: canonical`);
  assert.ok(html.includes('application/ld+json'), `${path}: business schema`);
  console.log(`PASS ${path}: HTML content, title, canonical, schema`);
}
for (const path of ['/admin', '/client', '/agent-portal']) {
  const html = await (await fetch(origin + path)).text();
  assert.ok(html.includes('noindex'), `${path}: portal must not be indexed`);
}
assert.equal((await fetch(origin + '/this-page-does-not-exist')).status, 404);
assert.equal((await fetch(origin + '/services/this-service-does-not-exist')).status, 404);
const sitemap = await (await fetch(origin + '/sitemap.xml')).text();
assert.ok(sitemap.includes('/services/land-surveying'));
assert.ok(sitemap.includes('/blog/gis-technology-agriculture'));
assert.ok(!sitemap.includes('/admin'));
const robots = await (await fetch(origin + '/robots.txt')).text();
assert.ok(robots.includes('Sitemap: https://geoking.org/sitemap.xml'));
const image = await fetch(origin + '/opengraph-image');
assert.equal(image.status, 200);
assert.ok(image.headers.get('content-type')?.includes('image/png'));
console.log('PASS portals, HTTP 404s, sitemap, robots and social image');
