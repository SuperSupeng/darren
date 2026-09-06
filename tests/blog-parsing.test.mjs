import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';

const { getAllPosts, parseBlogContent } = createRequire(import.meta.url)('../src/lib/blog.ts');
const fixture = [
  '---',
  'title: An original field note',
  'date: 2024-02-29',
  'description: A published observation: with its original date.',
  'tags: [AI agents, Research]',
  '---',
  '',
  '## Evidence',
  '',
  'A first-hand observation with a [source](https://example.com/source).',
  '',
].join('\n');

test('the production parser preserves metadata and body with CRLF, CR, and a UTF-8 BOM', () => {
  const expected = {
    title: 'An original field note',
    date: '2024-02-29',
    description: 'A published observation: with its original date.',
    tags: ['AI agents', 'Research'],
    content: '\n## Evidence\n\nA first-hand observation with a [source](https://example.com/source).\n',
  };
  for (const newline of ['\n', '\r\n', '\r']) {
    for (const prefix of ['', '\uFEFF']) {
      assert.deepEqual(parseBlogContent(prefix + fixture.replace(/\n/g, newline)), expected);
    }
  }
});

test('source dates never fall back to the build day or accept an impossible calendar date', () => {
  for (const invalidDate of ['', '2025-02-29', '2026-02-30', '2026-13-01', '2026-00-20', '2026-2-01', 'yesterday', '2026-05-18T12:00:00Z']) {
    assert.throws(
      () => parseBlogContent(fixture.replace('date: 2024-02-29', `date: ${invalidDate}`), 'content/blog/zh/example.md'),
      /content\/blog\/zh\/example\.md: date/,
    );
  }
  assert.throws(() => parseBlogContent(fixture.replace('date: 2024-02-29\n', '')), /date/);
  assert.equal(parseBlogContent(fixture.replace('date: 2024-02-29', 'date: "2024-02-29"')).date, '2024-02-29');
});

test('incomplete or ambiguous source metadata fails with the source filename', () => {
  const invalidSources = [
    fixture.replace(/^---\n/, ''),
    fixture.replace(/\n---\n/, '\n'),
    fixture.replace('title: An original field note', 'title: ""'),
    fixture.replace('title: An original field note', 'title: [A title]'),
    fixture.replace('title: An original field note', 'title: "An unclosed title'),
    fixture.replace('description: A published observation: with its original date.\n', ''),
    fixture.replace('description: A published observation: with its original date.', 'description: |'),
    fixture.replace('tags: [AI agents, Research]', 'tags: AI agents'),
    fixture.replace('tags: [AI agents, Research]', 'tags: []'),
    fixture.replace('tags: [AI agents, Research]', 'tags: [AI agents, ""]'),
    fixture.replace('tags: [AI agents, Research]', 'tags: [AI agents,]'),
    fixture.replace('tags: [AI agents, Research]', 'tags: ["AI agents, Research]'),
    fixture.replace('date: 2024-02-29', 'date: 2024-02-29\ndate: 2025-01-01'),
    fixture.slice(0, fixture.indexOf('\n---\n') + '\n---\n'.length),
  ];
  for (const source of invalidSources) {
    assert.throws(() => parseBlogContent(source, 'source.md'), /^Error: source\.md:/);
  }
});

test('quoted metadata preserves commas, apostrophes, and colons as source text', () => {
  const source = fixture
    .replace('title: An original field note', "title: 'Darren''s field note'")
    .replace('tags: [AI agents, Research]', String.raw`tags: ["AI, agents", 'Darren''s, work', "Quoted \"title\"", Research]`);
  const parsed = parseBlogContent(source);
  assert.equal(parsed.title, "Darren's field note");
  assert.deepEqual(parsed.tags, ['AI, agents', "Darren's, work", 'Quoted "title"', 'Research']);
  assert.equal(parsed.description, 'A published observation: with its original date.');
});

test('all six published articles retain their original dates, metadata, and complete Markdown body', () => {
  const expectedDates = {
    'superai-china-ecosystem-visit': '2026-05-18',
    'managing-31-ai-employees': '2026-04-15',
    'zongtong-temple-retreat': '2026-02-27',
  };
  for (const locale of ['zh', 'en']) {
    const posts = getAllPosts(locale);
    assert.equal(posts.length, 3);
    for (const post of posts) {
      const source = fs.readFileSync(new URL(`../content/blog/${locale}/${post.slug}.md`, import.meta.url), 'utf8');
      const parsed = parseBlogContent(source);
      assert.equal(post.date, expectedDates[post.slug]);
      assert.notEqual(post.title, post.slug);
      assert.ok(post.description.length > 30);
      assert.ok(post.tags.length > 0);
      assert.ok(post.content.length > 1000);
      assert.equal(post.content, source.slice(source.indexOf('\n---\n') + '\n---\n'.length));
      for (const field of ['title', 'date', 'description', 'tags', 'content']) {
        assert.deepEqual(post[field], parsed[field]);
      }
      assert.deepEqual(parseBlogContent(`\uFEFF${source.replace(/\n/g, '\r\n')}`), parsed);
    }
  }
});
