import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';

const { getStudioLocation, updateStudioLocation, getStudioHref } = createRequire(import.meta.url)('../src/lib/studio-location.ts');

test('existing room bookmarks still open in daylight and unknown values fall back safely', () => {
  assert.deepEqual(getStudioLocation(new URL('https://example.com/zh/studio#notes')), {
    zone: 'notes', lighting: 'day',
  });
  assert.deepEqual(getStudioLocation(new URL('https://example.com/en/studio?light=night#attic')), {
    zone: 'overview', lighting: 'day',
  });
  assert.deepEqual(getStudioLocation(new URL('https://example.com/en/studio?light=evening#attic')), {
    zone: 'overview', lighting: 'evening',
  });
});

test('changing light or room preserves the other selection and unrelated URL context', () => {
  const original = new URL('https://preview.example.com/zh/studio?source=invite#notes');
  const evening = updateStudioLocation(original, { lighting: 'evening' });
  assert.equal(evening.href, 'https://preview.example.com/zh/studio?source=invite&light=evening#notes');

  const work = updateStudioLocation(evening, { zone: 'work' });
  assert.equal(work.href, 'https://preview.example.com/zh/studio?source=invite&light=evening#work');
});

test('returning to the default view clears state without mutating the input URL', () => {
  const original = new URL('https://example.com/en/studio?light=evening&source=invite#build');
  const originalHref = original.href;
  const updated = updateStudioLocation(original, { zone: 'overview', lighting: 'day' });

  assert.notEqual(updated, original);
  assert.equal(original.href, originalHref);
  assert.equal(updated.href, 'https://example.com/en/studio?source=invite');
  assert.deepEqual(getStudioLocation(updated), { zone: 'overview', lighting: 'day' });
});

test('language-switch links carry the full room and lighting state without a locale prefix', () => {
  const state = { zone: 'notes', lighting: 'evening' };
  const href = getStudioHref(state);
  assert.equal(href, '/studio?light=evening#notes');

  for (const locale of ['zh', 'en']) {
    const localized = new URL(`/${locale}${href}`, 'https://example.com');
    assert.deepEqual(getStudioLocation(localized), state);
  }
  assert.equal(getStudioHref({ zone: 'overview', lighting: 'day' }), '/studio');
});
