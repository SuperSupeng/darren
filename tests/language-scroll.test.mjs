import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';

const { LANGUAGE_SCROLL_KEY, rememberLanguageScroll, clearLanguageScroll, consumeLanguageScroll } = createRequire(import.meta.url)('../src/lib/language-scroll.ts');

function memoryStorage() {
  const entries = new Map();
  return {
    getItem: key => entries.get(key) ?? null,
    setItem: (key, value) => entries.set(key, value),
    removeItem: key => entries.delete(key),
  };
}

const destination = { pathname: '/blog/zongtong-temple-retreat', locale: 'en', hash: '' };

test('a fresh language switch restores the intended page once after a full reload', () => {
  const storage = memoryStorage();
  rememberLanguageScroll(storage, { ...destination, scrollY: 1838 }, 1000);
  assert.equal(consumeLanguageScroll(storage, { ...destination, locale: 'zh' }, 1001), null);
  assert.equal(consumeLanguageScroll(storage, { ...destination, pathname: '/work' }, 1002), null);
  assert.equal(consumeLanguageScroll(storage, destination, 1003), 1838);
  assert.equal(storage.getItem(LANGUAGE_SCROLL_KEY), null);
  assert.equal(consumeLanguageScroll(storage, destination, 1004), null);
});

test('hash navigation wins over any saved scroll position', () => {
  const storage = memoryStorage();
  rememberLanguageScroll(storage, { ...destination, scrollY: 1838 }, 1000);
  assert.equal(consumeLanguageScroll(storage, { ...destination, hash: '#article-section:2' }, 1001), null);
  assert.equal(storage.getItem(LANGUAGE_SCROLL_KEY), null);
  assert.equal(consumeLanguageScroll(storage, destination, 1002), null);
});

test('expired, malformed, future-dated, or invalid scroll records are discarded', () => {
  const storage = memoryStorage();
  rememberLanguageScroll(storage, { ...destination, scrollY: 1838 }, 1000);
  assert.equal(consumeLanguageScroll(storage, destination, 11000), null);
  assert.equal(storage.getItem(LANGUAGE_SCROLL_KEY), null);

  for (const raw of [
    '{not-json',
    'null',
    JSON.stringify({ ...destination, scrollY: -1, savedAt: 1000 }),
    JSON.stringify({ ...destination, scrollY: '1838', savedAt: 1000 }),
    JSON.stringify({ ...destination, scrollY: 1838, savedAt: 3000 }),
  ]) {
    storage.setItem(LANGUAGE_SCROLL_KEY, raw);
    assert.equal(consumeLanguageScroll(storage, destination, 2000), null);
    assert.equal(storage.getItem(LANGUAGE_SCROLL_KEY), null);
  }
});

test('unavailable browser storage does not block language navigation', () => {
  const blocked = {
    getItem() { throw new Error('Storage blocked'); },
    setItem() { throw new Error('Storage blocked'); },
    removeItem() { throw new Error('Storage blocked'); },
  };
  assert.doesNotThrow(() => rememberLanguageScroll(blocked, { ...destination, scrollY: 1838 }));
  assert.doesNotThrow(() => clearLanguageScroll(blocked));
  assert.equal(consumeLanguageScroll(blocked, destination), null);
});
