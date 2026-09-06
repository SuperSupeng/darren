import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';
import { JSDOM } from 'jsdom';

const { observeSiteMotion } = createRequire(import.meta.url)('../src/components/spatial/site-motion.ts');

function fixture(t, html, { observerAvailable = true, animationAvailable = true } = {}) {
  const dom = new JSDOM(`<main>${html}</main>`, { url: 'https://example.test/zh/work' });
  const root = dom.window.document.querySelector('main');
  const observers = [];
  const animations = [];
  const cleanups = [];

  class FakeIntersectionObserver {
    observed = new Set();
    disconnected = false;
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe(element) { this.observed.add(element); }
    unobserve(element) { this.observed.delete(element); }
    disconnect() { this.disconnected = true; this.observed.clear(); }
    report(...entries) {
      assert.equal(this.disconnected, false);
      this.callback(entries.filter(entry => this.observed.has(entry.target)));
    }
  }

  if (animationAvailable) {
    // WAAPI owns an effect separately from inline styles; cancellation must remove that effect.
    dom.window.HTMLElement.prototype.animate = function (keyframes, options) {
      const animation = {
        element: this, keyframes, options, canceled: false,
        cancel() { this.canceled = true; },
      };
      animations.push(animation);
      return animation;
    };
  }

  const globals = {
    window: dom.window,
    Node: dom.window.Node,
    MutationObserver: dom.window.MutationObserver,
    IntersectionObserver: observerAvailable ? FakeIntersectionObserver : undefined,
  };
  const previous = new Map(Object.keys(globals).map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  for (const [key, value] of Object.entries(globals)) {
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  }
  t.after(() => {
    for (const cleanup of cleanups) cleanup();
    dom.window.close();
    for (const [key, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  });

  return {
    dom, root, observers, animations,
    find: selector => root.querySelector(selector),
    start(revealed = new WeakSet()) {
      const cleanup = observeSiteMotion(root, revealed);
      cleanups.push(cleanup);
      return cleanup;
    },
    navigateHash(hash) {
      dom.window.history.replaceState(null, '', hash);
      // jsdom 30 caches :target results until a DOM mutation, unlike a browser.
      // Invalidate that cache outside the observed root before delivering navigation.
      dom.window.document.body.setAttribute('data-test-hash', hash);
      dom.window.dispatchEvent(new dom.window.HashChangeEvent('hashchange'));
    },
  };
}

test('missing IntersectionObserver or WAAPI leaves content unchanged and readable', async (t) => {
  for (const missing of ['observerAvailable', 'animationAvailable']) {
    await t.test(missing, t => {
      const f = fixture(t, '<article class="collection-work-card"><a href="/zh/services">Contact Darren</a></article>', { [missing]: false });
      const before = f.root.outerHTML;
      const cleanup = f.start();
      cleanup();
      assert.equal(f.root.outerHTML, before);
      assert.equal(f.observers.length, 0);
      assert.equal(f.animations.length, 0);
      assert.notEqual(f.dom.window.getComputedStyle(f.find('article')).display, 'none');
      assert.equal(f.find('a').getAttribute('href'), '/zh/services');
    });
  }
});

test('cleanup cancels active and delayed effects without leaving altered styles or stage flags', t => {
  const f = fixture(t, '<div class="studio-stage"></div><article class="collection-work-card" style="opacity: 0.9; transform: rotate(2deg)">One</article><article class="collection-work-card">Two</article>');
  const cards = [...f.root.querySelectorAll('article')];
  const styles = cards.map(card => card.getAttribute('style'));
  const stage = f.find('.studio-stage');
  const cleanup = f.start();
  f.observers[0].report(...[stage, ...cards].map(target => ({ target, isIntersecting: true })));
  assert.equal(stage.dataset.motionVisible, 'true');
  assert.equal(f.animations.length, 2);
  assert.ok(f.animations[1].options.delay > 0, 'The staggered effect must also be canceled');
  assert.ok(f.animations.every(animation => animation.options.fill === 'backwards'), 'A delayed reveal must apply its initial frame without retaining its final frame');

  cleanup();
  assert.ok(f.animations.every(animation => animation.canceled));
  assert.equal(f.observers[0].disconnected, true);
  assert.equal(stage.hasAttribute('data-motion-visible'), false);
  assert.deepEqual(cards.map(card => card.getAttribute('style')), styles);
});

test('resuming reuses revealed blocks but still observes blocks that never entered the viewport', t => {
  const f = fixture(t, '<article id="seen" class="collection-work-card">One</article><article id="later" class="collection-work-card">Two</article>');
  const seen = f.find('#seen');
  const later = f.find('#later');
  const revealed = new WeakSet();
  const pause = f.start(revealed);
  f.observers[0].report({ target: seen, isIntersecting: true }, { target: later, isIntersecting: false });
  assert.equal(revealed.has(seen), true);
  assert.equal(revealed.has(later), false);
  pause();

  f.start(revealed);
  assert.equal(f.observers[1].observed.has(seen), false, 'Already revealed content must not replay after a pause');
  assert.equal(f.observers[1].observed.has(later), true, 'Registration alone must not count as having been revealed');
  f.observers[1].report({ target: later, isIntersecting: true });
  assert.deepEqual(f.animations.map(animation => animation.element.id), ['seen', 'later']);
});

test('focus and hash navigation cancel only the blocks currently being used', t => {
  const f = fixture(t, '<article id="focus-block" class="collection-work-card"><button>Open case</button></article><section class="case-chapter"><h2 id="case-result">Result</h2></section><article id="other" class="collection-work-card">Other</article>');
  const blocks = [...f.root.children];
  const before = f.root.innerHTML;
  f.start();
  f.observers[0].report(...blocks.map(target => ({ target, isIntersecting: true })));
  f.find('button').focus();
  assert.deepEqual(f.animations.map(animation => animation.canceled), [true, false, false]);

  f.navigateHash('#case-result');
  assert.deepEqual(f.animations.map(animation => animation.canceled), [true, true, false]);
  assert.equal(f.root.innerHTML, before, 'Canceling motion must not leave opacity or movement in markup');
});

test('focused blocks and existing deep-link targets do not start an entrance effect', t => {
  const f = fixture(t, '<article class="collection-work-card"><a href="/zh/work">Read</a></article><section class="case-chapter" id="case-result">Result</section>');
  f.find('a').focus();
  f.navigateHash('#case-result');
  f.start();
  f.observers[0].report(...[...f.root.children].map(target => ({ target, isIntersecting: true })));
  assert.equal(f.animations.length, 0);
});

test('article prose and the reading sheet are never registered for entrance effects', t => {
  const f = fixture(t, '<article class="reading-sheet"><header class="reading-header"><h1>Article title</h1></header><div class="reading-prose"><nav><a href="#section">Contents</a></nav><h2 id="section">Section</h2><p>Long article body</p><pre><code>long code line</code></pre></div><footer class="reading-footer">Share</footer></article>');
  f.start();
  const observed = f.observers[0].observed;
  assert.equal(observed.has(f.find('h1')), true);
  assert.equal(observed.has(f.find('.reading-footer')), true);
  for (const element of f.root.querySelectorAll('.reading-sheet, .reading-prose, .reading-prose *')) {
    assert.equal(observed.has(element), false, `Reading content must remain stable: ${element.tagName}.${element.className}`);
  }
  assert.equal(f.animations.length, 0, 'Registering content alone must not animate or hide it');
});
