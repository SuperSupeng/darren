import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';

const { compareBlogPosts, getAllPosts, parseBlogContent } = createRequire(import.meta.url)('../src/lib/blog.ts');
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
    authors: ['Darren Su'],
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

test('coauthors retain source order and names, and ambiguous author input fails', () => {
  const source = fixture.replace('tags: [AI agents, Research]', 'authors: [苏鹏, "王瑞楠"]\ntags: [AI agents, Research]');
  assert.deepEqual(parseBlogContent(source).authors, ['苏鹏', '王瑞楠']);
  assert.deepEqual(parseBlogContent(source.replace('authors: [苏鹏, "王瑞楠"]', 'authors: ["Doe, Jane", \'Darren\'\'s collaborator\']')).authors, ['Doe, Jane', "Darren's collaborator"]);
  for (const authors of ['', '[]', '[苏鹏, ""]', '[苏鹏,]', '[苏鹏, 苏鹏]', '苏鹏, 王瑞楠', '["苏鹏]', '["王\\n瑞楠"]']) {
    assert.throws(() => parseBlogContent(source.replace('authors: [苏鹏, "王瑞楠"]', `authors: ${authors}`)), /authors/);
  }
  assert.throws(() => parseBlogContent(source.replace('authors: [苏鹏, "王瑞楠"]', 'author: 王瑞楠')), /authors/);
});

test('unknown publication dates need an explicit historical year or note and never become dates', () => {
  const archived = fixture.replace('date: 2024-02-29', 'archiveYear: "2024"\ndateNote: "2024 年旧稿，原发表日期未核实。"');
  const parsed = parseBlogContent(archived);
  assert.equal(parsed.archiveYear, '2024');
  assert.equal(parsed.dateNote, '2024 年旧稿，原发表日期未核实。');
  assert.ok(!Object.hasOwn(parsed, 'date'));
  assert.equal(parseBlogContent(fixture.replace('date: 2024-02-29', 'archiveYear: 2024')).archiveYear, '2024');
  const withoutYear = parseBlogContent(fixture.replace('date: 2024-02-29', 'dateNote: 原发表日期未核实。'));
  assert.equal(withoutYear.dateNote, '原发表日期未核实。');
  assert.ok(!Object.hasOwn(withoutYear, 'date') && !Object.hasOwn(withoutYear, 'archiveYear'));
  for (const metadata of ['archiveYear: 24', 'archiveYear: 0000', 'archiveYear: 2024-01-01', 'archiveYear: ""', 'dateNote: ""', 'date: 2024\narchiveYear: 2024', 'date: \narchiveYear: 2024']) {
    assert.throws(() => parseBlogContent(fixture.replace('date: 2024-02-29', metadata)), /date|archiveYear/);
  }
});

test('historical sorting is stable and does not invent publication dates for archive entries', () => {
  const posts = [
    { slug: 'note-b' },
    { slug: 'archive-b', archiveYear: '2024' },
    { slug: 'previous-year', date: '2023-12-31' },
    { slug: 'dated-later', date: '2024-12-01' },
    { slug: 'archive-a', archiveYear: '2024' },
    { slug: 'latest', date: '2026-01-01' },
    { slug: 'note-a' },
    { slug: 'dated-earlier', date: '2024-01-01' },
  ];
  const expected = ['latest', 'dated-later', 'dated-earlier', 'archive-a', 'archive-b', 'previous-year', 'note-a', 'note-b'];
  assert.deepEqual([...posts].sort(compareBlogPosts).map(post => post.slug), expected);
  assert.deepEqual([...posts].reverse().sort(compareBlogPosts).map(post => post.slug), expected);
  assert.ok(!Object.hasOwn(posts[1], 'date'));
});

test('published articles retain complete metadata and Markdown, with only supported date precision', () => {
  const historicalSlugs = ['superai-china-ecosystem-visit', 'managing-31-ai-employees', 'zongtong-temple-retreat'];
  for (const locale of ['zh', 'en']) {
    const posts = getAllPosts(locale);
    for (const slug of historicalSlugs) {
      const originalPost = posts.find(post => post.slug === slug);
      assert.ok(originalPost, `${locale}/${slug}: the existing article must remain published`);
      assert.equal(originalPost.archiveYear, '2026');
      assert.ok(!Object.hasOwn(originalPost, 'date'), `${locale}/${slug}: unverified legacy day must not reach publication metadata`);
    }
    for (const post of posts) {
      const source = fs.readFileSync(new URL(`../content/blog/${locale}/${post.slug}.md`, import.meta.url), 'utf8');
      const parsed = parseBlogContent(source);
      assert.notEqual(post.title, post.slug);
      assert.ok(post.description.length > 30);
      assert.ok(post.tags.length > 0);
      assert.ok(post.content.length > 1000);
      assert.equal(post.content, source.slice(source.indexOf('\n---\n') + '\n---\n'.length));
      for (const field of ['title', 'date', 'archiveYear', 'dateNote', 'authors', 'description', 'tags', 'content']) {
        assert.deepEqual(post[field], parsed[field]);
      }
      assert.deepEqual(parseBlogContent(`\uFEFF${source.replace(/\n/g, '\r\n')}`), parsed);
    }
  }
  const chinesePosts = getAllPosts('zh');
  assert.deepEqual(chinesePosts.filter(post => post.date).map(post => [post.slug, post.date]), [
    ['turning-expertise-into-an-asset', '2026-07-22'],
  ]);
  const expectedArchiveYears = {
    'ai-for-good-youth-classes': '2024',
    'how-ai-memory-works': '2024',
    'rag-from-demo-to-production': '2024',
    'myscaledb-vector-database-dialogue': '2024',
    'why-i-started-agi-villa': '2025',
    '2025-year-in-review': '2025',
  };
  for (const [slug, year] of Object.entries(expectedArchiveYears)) {
    const post = chinesePosts.find(post => post.slug === slug);
    assert.ok(post, `${slug}: the selected article must remain available`);
    assert.equal(post.archiveYear, year);
    assert.ok(post.dateNote.includes(year));
    assert.ok(!Object.hasOwn(post, 'date'), `${slug}: a copy or event date must not become the publication day`);
  }
  assert.deepEqual(chinesePosts.map(post => post.date?.slice(0, 4) ?? post.archiveYear), [
    '2026', '2026', '2026', '2026', '2025', '2025', '2024', '2024', '2024', '2024',
  ]);
});
