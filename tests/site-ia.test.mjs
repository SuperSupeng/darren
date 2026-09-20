import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';

const require = createRequire(import.meta.url);
const {
  aboutLink,
  collaborateHref,
  footerLinks,
  githubProfileUrl,
  navigationLinks,
  studioZoneHrefs,
  substackUrl,
} = require('../src/lib/site-config.ts');
const { getAllPosts, getPostsBySection } = require('../src/lib/blog.ts');
const { getSiteContent } = require('../src/lib/siteContent.ts');

test('top navigation is the signed-off five items in both languages', () => {
  assert.deepEqual(navigationLinks.map((link) => link.href), [
    '/',
    '/blog',
    '/podcast',
    '/projects',
    '/elsewhere',
  ]);
  assert.deepEqual(navigationLinks.map((link) => link.en), [
    'Home',
    'Writing',
    'Podcast',
    'Projects',
    'Elsewhere',
  ]);
  assert.deepEqual(navigationLinks.map((link) => link.zh), [
    '首页',
    '文章',
    '播客',
    '项目',
    '别处',
  ]);
  assert.ok(!navigationLinks.some((link) => link.href === '/field-notes'));
  assert.ok(!navigationLinks.some((link) => link.href === collaborateHref || link.href === aboutLink.href));
  assert.ok(footerLinks.some((link) => link.href === aboutLink.href));
  assert.ok(!footerLinks.some((link) => link.href === collaborateHref));
  assert.ok(!footerLinks.some((link) => link.href === '/field-notes'));
});

test('studio hotspots map into the remapped hub routes', () => {
  assert.equal(studioZoneHrefs.work, '/projects');
  assert.equal(studioZoneHrefs.build, '/projects');
  assert.equal(studioZoneHrefs.notes, '/blog');
});

test('Writing lists every published article, including former field notes', () => {
  for (const locale of ['zh', 'en']) {
    const archive = getAllPosts(locale);
    const writing = getPostsBySection(locale, 'writing');
    const notes = getPostsBySection(locale, 'field-notes');
    assert.ok(archive.length > 0, `${locale} writing archive must not be empty`);
    assert.ok(writing.length > 0, `${locale} writing posts must not be empty`);
    assert.ok(notes.length > 0, `${locale} former field notes must remain in the article collection`);
    assert.equal(archive.length, writing.length + notes.length);
    assert.deepEqual(
      new Set(archive.map((post) => post.slug)),
      new Set([...writing, ...notes].map((post) => post.slug)),
    );
    for (const post of notes) {
      assert.ok(archive.some((item) => item.slug === post.slug), `${locale} archive must include ${post.slug}`);
    }
  }
});

test('Elsewhere keeps reserved destinations that are already public', () => {
  const items = getSiteContent('en').elsewhere.items;
  assert.ok(items.some((item) => item.id === 'wechat' && item.name === '公众号精选'));
  assert.ok(items.some((item) => item.href === substackUrl));
  assert.ok(items.some((item) => item.href === githubProfileUrl));
  assert.ok(items.some((item) => item.href === '/podcast'));
  const publicProjects = items.find((item) => item.id === 'public-projects');
  assert.deepEqual(
    publicProjects.links.map((link) => link.href),
    ['https://matchpoint.careers', 'https://agivilla.com'],
  );
  const chinese = getSiteContent('zh').elsewhere.items;
  assert.deepEqual(chinese.map((item) => item.id), items.map((item) => item.id));
});
