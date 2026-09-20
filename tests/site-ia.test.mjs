import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';

const require = createRequire(import.meta.url);
const {
  aboutLink,
  collaborateHref,
  footerLinks,
  githubProfileUrl,
  linkedinProfileUrl,
  navigationLinks,
  personSameAs,
  socialLinks,
  studioZoneHrefs,
  substackUrl,
} = require('../src/lib/site-config.ts');
const { getAllPosts, getPostsBySection } = require('../src/lib/blog.ts');

test('top navigation is the signed-off four items in both languages', () => {
  assert.deepEqual(navigationLinks.map((link) => link.href), [
    '/',
    '/blog',
    '/podcast',
    '/projects',
  ]);
  assert.deepEqual(navigationLinks.map((link) => link.en), [
    'Home',
    'Writing',
    'Podcast',
    'Projects',
  ]);
  assert.deepEqual(navigationLinks.map((link) => link.zh), [
    '首页',
    '文章',
    '播客',
    '项目',
  ]);
  assert.ok(!navigationLinks.some((link) => link.href === '/elsewhere' || link.href === '/field-notes'));
  assert.ok(!navigationLinks.some((link) => link.href === collaborateHref || link.href === aboutLink.href));
  assert.ok(footerLinks.some((link) => link.href === aboutLink.href));
  assert.ok(!footerLinks.some((link) => link.href === collaborateHref));
  assert.ok(!footerLinks.some((link) => link.href === '/elsewhere' || link.href === '/field-notes'));
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

test('footer keeps existing platform links without an Elsewhere section', () => {
  assert.deepEqual(socialLinks.map(([label]) => label), [
    'GitHub',
    'LinkedIn',
    'X',
    'Instagram',
    '小红书',
    'n8n Ambassador',
  ]);
  assert.ok(socialLinks.some(([, href]) => href === githubProfileUrl));
});

test('Person sameAs uses the confirmed public profiles, including LinkedIn', () => {
  assert.ok(personSameAs.includes(githubProfileUrl));
  assert.ok(personSameAs.includes(linkedinProfileUrl));
  assert.ok(personSameAs.includes('https://x.com/zenshipai'));
  assert.ok(personSameAs.includes('https://www.threads.net/@0xdarren_su'));
  assert.ok(personSameAs.includes(substackUrl));
  assert.ok(personSameAs.includes('https://www.zhihu.com/people/superssssss'));
  assert.ok(personSameAs.includes('https://www.instagram.com/0xdarren_su/'));
  assert.ok(!personSameAs.some((href) => /xhslink|xiaohongshu/i.test(href)));
});
