import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createRequire } from 'node:module';
import { JSDOM } from 'jsdom';
import { act, createElement } from 'react';
const ContactActions = createRequire(import.meta.url)('../src/components/ContactActions.tsx').default;

let dom;
let createRoot;
before(() => {
  dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://example.test' });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: dom.window.navigator });
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  ({ createRoot } = createRequire(import.meta.url)('react-dom/client'));
});
after(() => dom.window.close());

test('contact remains usable when both clipboard methods fail', async (t) => {
  for (const locale of ['zh', 'en']) {
    for (const variant of ['light', 'dark', 'quiet']) {
      await t.test(`${locale} / ${variant}`, async () => {
        Object.defineProperty(navigator, 'clipboard', {
          configurable: true,
          value: { writeText: async () => { throw new Error('Clipboard permission denied'); } },
        });
        document.execCommand = () => false;
        const container = document.createElement('div');
        document.body.appendChild(container);
        const root = createRoot(container);
        try {
          await act(async () => root.render(createElement(ContactActions, { locale, variant, context: 'test' })));
          await act(async () => container.querySelector('button').click());
          const address = container.querySelector('input[readonly]');
          assert.ok(address, 'A manually selectable email address must be visible');
          assert.equal(address.value, 'supeng842499467@gmail.com');
          assert.equal(document.activeElement, address);
          assert.equal(address.selectionStart, 0);
          assert.equal(address.selectionEnd, address.value.length);
          assert.ok(address.getAttribute('aria-label'));
          if (locale === 'zh' && variant === 'light') {
            await act(async () => new Promise(resolve => setTimeout(resolve, 2600)));
            assert.ok(container.contains(address), 'The manual address must remain until the user succeeds or leaves');
          }
          let copied;
          navigator.clipboard.writeText = async (value) => { copied = value; };
          await act(async () => container.querySelector('button').click());
          assert.equal(copied, address.value);
          assert.equal(container.querySelector('input'), null);
          assert.match(container.querySelector('button').textContent, /邮箱已复制|Email copied/);
        } finally {
          await act(async () => root.unmount());
          container.remove();
        }
      });
    }
  }
});
