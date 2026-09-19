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
const { getPostsBySection } = require('../src/lib/blog.ts');
const { getSiteContent } = require('../src/lib/siteContent.ts');

test('top navigation is the signed-off six items in both languages', () => {
  assert.deepEqual(navigationLinks.map((link) => link.href), [
    '/',
    '/blog',
    '/podcast',
    '/field-notes',
    '/projects',
    '/elsewhere',
  ]);
  assert.deepEqual(navigationLinks.map((link) => link.en), [
    'Home',
    'Writing',
    'Podcast',
    'Field Notes',
    'Projects',
    'Elsewhere',
  ]);
  assert.deepEqual(navigationLinks.map((link) => link.zh), [
    '首页',
    '文章',
    '播客',
    '手记',
    '项目',
    '别处',
  ]);
  assert.ok(!navigationLinks.some((link) => link.href === collaborateHref || link.href === aboutLink.href));
  assert.ok(footerLinks.some((link) => link.href === aboutLink.href));
  assert.ok(!footerLinks.some((link) => link.href === collaborateHref));
});

test('studio hotspots map into the remapped hub routes', () => {
  assert.equal(studioZoneHrefs.work, '/projects');
  assert.equal(studioZoneHrefs.build, '/projects');
  assert.equal(studioZoneHrefs.notes, '/blog');
});

test('Writing and Field Notes partition the published articles without dropping either language', () => {
  for (const locale of ['zh', 'en']) {
    const writing = getPostsBySection(locale, 'writing');
    const notes = getPostsBySection(locale, 'field-notes');
    assert.ok(writing.length > 0, `${locale} writing must not be empty`);
    assert.ok(notes.length > 0, `${locale} field notes must not be empty`);
    assert.equal(
      new Set([...writing, ...notes].map((post) => post.slug)).size,
      writing.length + notes.length,
    );
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
