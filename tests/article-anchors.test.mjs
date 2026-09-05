import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import { JSDOM } from 'jsdom';

const { createArticleHeadingAnchors, languageSwitchHash } = createRequire(import.meta.url)('../src/lib/article-anchors.ts');
const contentRoot = new URL('../content/blog/', import.meta.url);

function visibleMarkdown(source) {
  const lines = [];
  let fence = null;
  for (const line of source.split('\n')) {
    if (fence) {
      const close = line.match(/^\s*(`+|~+)\s*$/);
      if (close && close[1][0] === fence[0] && close[1].length >= fence.length) fence = null;
      continue;
    }
    const open = line.match(/^\s*(`{3,}|~{3,})/);
    if (open) fence = open[1];
    else lines.push(line);
  }
  return lines.join('\n');
}

function headingFixture(source) {
  const dom = new JSDOM('<!doctype html><html><body></body></html>');
  const page = dom.window.document;
  const nextAnchors = createArticleHeadingAnchors();
  const headings = [...visibleMarkdown(source).matchAll(/^\s*(#{1,6})\s+(.+)$/gm)].map((match) => {
    const anchors = nextAnchors(match[2]);
    const element = page.createElement(`h${match[1].length}`);
    element.id = anchors.id;
    element.dataset.articleSection = anchors.sectionId;
    const alias = page.createElement('span');
    alias.id = anchors.sectionId;
    element.append(alias, match[2]);
    page.body.append(element);
    return { level: match[1].length, ...anchors };
  });
  return { dom, page, headings };
}

test('article aliases preserve existing text slugs and cannot collide with them', () => {
  const nextAnchors = createArticleHeadingAnchors();
  assert.deepEqual(nextAnchors('阿尼师父'), { id: '阿尼师父', sectionId: 'article-section:1' });
  assert.deepEqual(nextAnchors('Venerable **Ani**'), { id: 'venerable-ani', sectionId: 'article-section:2' });
  assert.deepEqual(nextAnchors('Venerable Ani'), { id: 'venerable-ani-2', sectionId: 'article-section:3' });
  assert.deepEqual(nextAnchors('article-section:4'), { id: 'article-section-4', sectionId: 'article-section:4' });
});

test('language switching maps encoded article headings and preserves ordinary or invalid fragments', () => {
  const { dom, page } = headingFixture('## 阿尼师父\n## Closing thoughts');
  try {
    const contact = page.createElement('section');
    contact.id = 'contact';
    page.body.append(contact);
    assert.equal(languageSwitchHash(`#${encodeURIComponent('阿尼师父')}`, page), '#article-section:1');
    assert.equal(languageSwitchHash('#closing-thoughts', page), '#article-section:2');
    for (const hash of ['', '#contact', '#unknown', '#%E0%A4%A', '#article-section:1', '#article-section%3A1']) {
      assert.equal(languageSwitchHash(hash, page), hash);
    }
    page.getElementById('article-section:1').remove();
    assert.equal(languageSwitchHash('#阿尼师父', page), '#阿尼师父', 'A missing alias must not replace a working text fragment');
  } finally {
    dom.window.close();
  }
});

test('all translated articles have matching section order and every table-of-contents anchor survives a language switch', () => {
  const chineseFiles = fs.readdirSync(new URL('zh/', contentRoot)).filter(name => /\.mdx?$/.test(name)).sort();
  const englishFiles = fs.readdirSync(new URL('en/', contentRoot)).filter(name => /\.mdx?$/.test(name)).sort();
  assert.deepEqual(englishFiles, chineseFiles, 'Both languages must contain the same complete articles');

  for (const filename of chineseFiles) {
    const zhSource = fs.readFileSync(new URL(`zh/${filename}`, contentRoot), 'utf8');
    const enSource = fs.readFileSync(new URL(`en/${filename}`, contentRoot), 'utf8');
    const zh = headingFixture(zhSource);
    const en = headingFixture(enSource);
    try {
      assert.deepEqual(en.headings.map(h => h.level), zh.headings.map(h => h.level), `${filename}: section counts and hierarchy must match`);
      for (const [source, from, to] of [[zhSource, zh, en], [enSource, en, zh]]) {
        for (const match of visibleMarkdown(source).matchAll(/(?<!!)\[[^\]]+\]\(#([^)]+)\)/g)) {
          const hash = `#${match[1]}`;
          const sourceHeading = from.page.getElementById(decodeURIComponent(match[1]));
          assert.ok(sourceHeading, `${filename}: original table-of-contents link must still resolve: ${hash}`);
          const switchedHash = languageSwitchHash(hash, from.page);
          const targetAlias = to.page.getElementById(decodeURIComponent(switchedHash.slice(1)));
          assert.ok(targetAlias, `${filename}: translated anchor must resolve: ${switchedHash}`);
          assert.equal(targetAlias.parentElement.dataset.articleSection, sourceHeading.dataset.articleSection);
        }
      }
    } finally {
      zh.dom.window.close();
      en.dom.window.close();
    }
  }
});
