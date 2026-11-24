import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { load } from 'cheerio';

const route = 'blog/laptop-temperatures-kuwait-safe-cpu-gpu-temperatures';
const $ = load(readFileSync('dist/' + route + '.html', 'utf8'));
assert.equal($('[data-kcroc-contextual-editorial]').length, 1);
assert.equal($('[data-kcroc-article-toc]').length, 1);
assert.equal($('link[rel="canonical"]').attr('href'), 'https://www.computerrepairkuwait.com/' + route);
for (const id of ['signs-of-thermal-problem','kcroc-thermal-diagnostic-method','causes-of-high-laptop-temperatures','when-to-clean-or-repaste']) {
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
