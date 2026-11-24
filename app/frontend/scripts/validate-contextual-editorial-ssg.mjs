import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { load } from 'cheerio';

const route = 'blog/laptop-temperatures-kuwait-safe-cpu-gpu-temperatures';
const $ = load(readFileSync('dist/' + route + '.html', 'utf8'));
assert.equal($('[data-kcroc-contextual-editorial]').length, 1);
assert.equal($('[data-kcroc-article-toc]').length, 1);
assert.equal($('details[data-kcroc-article-toc][data-kcroc-intelligent-sticky="true"]').length, 1, 'One intelligent sticky TOC');
assert.equal($('[data-kcroc-current-section="true"]').length, 1, 'Current section indicator');
assert.equal($('[data-kcroc-reading-percent="true"]').length, 1, 'Reading progress indicator');
assert.equal($('link[rel="canonical"]').attr('href'), 'https://www.computerrepairkuwait.com/' + route);
for (const id of ['signs-of-thermal-problem','kcroc-thermal-diagnostic-method','causes-of-high-laptop-temperatures','when-to-clean-or-repaste','temperature-vs-thermal-limit','what-temperature-is-too-hot-cpu','what-temperature-is-too-hot-gpu','kuwait-climate-laptop-temperatures','thermal-throttling','how-to-check-laptop-temperature']) {
  const section = $('[data-kcroc-editorial-section="' + id + '"]');
  assert.equal(section.length, 1, id);
  assert.equal(section.find('h2#' + id).length, 1, id + ' anchor');
  const img = section.children('figure[data-kcroc-contextual-visual]').find('img');
  assert.equal(img.length, 1, id + ' contextual image');
  assert.ok(img.attr('alt')?.trim(), id + ' alt');
  assert.equal(img.attr('loading'), 'lazy');
  assert.ok(existsSync('dist' + img.attr('src')), 'Missing local image ' + img.attr('src'));
}
const sources = $('article img').map((_, el) => $(el).attr('src')).get();
assert.equal(new Set(sources).size, sources.length, 'Duplicate article image');
console.log('Contextual editorial SSG checks passed.');

const phase2 = {
  'why-is-my-laptop-so-slow': ['ram-pressure', 'old-hdd', 'dust-fan-thermal-paste', 'ssd-nearly-full', 'overheating', 'power-battery', 'upgrade-repair', 'startup-apps', 'disk-usage', 'storage-health'],
  'how-often-clean-laptop-replace-thermal-paste-kuwait': ['why-gaming-laptops-need-care', 'dust-cleaning-vs-thermal-paste-gaming', 'safe-gaming-laptop-cleaning'],
  'pc-gaming-graphics-settings-better-visuals-fps': ['when-settings-arent-the-problem'],
  'why-8gb-ram-is-no-longer-enough-for-windows-11': ['where-your-8gb-goes', 'memory-swapping', 'ram-comparison', 'check-upgrade-compatibility'],
  'gaming-pc-mistakes-kuwait': ['thermal-paste', 'xmp-bios', 'psu-quality', 'placement'],
  'windows-11-100-disk-usage-causes-solutions': ['hdd-vs-ssd', 'ssd-upgrade'],
};
for (const [slug, ids] of Object.entries(phase2)) {
  const page = 'blog/' + slug;
  const doc = load(readFileSync('dist/' + page + '.html', 'utf8'));
  assert.equal(doc('link[rel="canonical"]').attr('href'), 'https://www.computerrepairkuwait.com/' + page, page + ' canonical');
  assert.equal(doc('[data-kcroc-article-toc]').length, 1, page + ' single responsive TOC');
  for (const id of ids) {
    const section = doc('[data-kcroc-editorial-section="' + id + '"]');
    assert.equal(section.length, 1, page + '#' + id);
    assert.equal(section.attr('data-kcroc-contextual-pair'), 'true', page + '#' + id + ' contextual pair');
    assert.equal(section.find('h2#' + id).length, 1, page + '#' + id + ' anchor');
    assert.equal(doc('[data-kcroc-article-toc] a[href="#' + id + '"]').length, 1, page + '#' + id + ' TOC anchor');
    const figure = section.children('figure[data-kcroc-contextual-visual]');
    const img = figure.find('img');
    assert.equal(img.length, 1, page + '#' + id + ' image');
    assert.ok(img.attr('alt')?.trim(), page + '#' + id + ' alt');
    assert.equal(img.attr('loading'), 'lazy', page + '#' + id + ' lazy');
    assert.ok(figure.find('figcaption').text().trim(), page + '#' + id + ' caption');
    assert.ok(existsSync('dist' + img.attr('src')), page + ' missing local asset ' + img.attr('src'));
  }
  const sources = doc('article img').map((_, el) => doc(el).attr('src')).get();
  assert.equal(new Set(sources).size, sources.length, page + ' duplicate article image');
}
console.log('Phase 2 contextual blog placement checks passed: six priority blogs and 24 required section/image pairs.');

const slow = load(readFileSync('dist/blog/why-is-my-laptop-so-slow.html', 'utf8'));
assert.equal(slow('[data-kcroc-editorial-hero]').length, 1, 'Aligned hero');
assert.equal(slow('[data-kcroc-editorial-hero-image]').length, 1, 'Hero image');
assert.equal(slow('[data-kcroc-editorial-author]').length, 1, 'Editorial author card');
assert.ok(slow('[data-kcroc-editorial-table]').length > 0, 'Editorial table surface');
assert.equal(slow('[data-kcroc-contextual-pair="true"]').length, 10, 'Ten curated slow-laptop placements');

assert.equal($('[data-kcroc-contextual-pair="true"]').length, 10, 'Ten curated temperature-guide placements');
