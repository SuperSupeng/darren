import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const require = createRequire(import.meta.url);
const AboutParagraph = require('../src/components/AboutParagraph.tsx').default;
const { NextIntlClientProvider } = require('next-intl');
const { getAboutCopy, getAboutInlineLinks } = require('../src/lib/about.ts');

const expected = {
  en: [
    ['AGI Villa', '/en/blog/why-i-started-agi-villa', 'community'],
    ['MatchPoint', '/en/projects', 'making'],
    ['GlobalTechEvents', 'https://www.globaltechevents.xyz/authors/darren-su', 'making'],
    ['31 agents', '/en/blog/managing-31-ai-employees', 'making'],
  ],
  zh: [
    ['AGI Villa', '/zh/blog/why-i-started-agi-villa', 'community'],
    ['MatchPoint', '/zh/projects', 'making'],
    ['GlobalTechEvents', 'https://www.globaltechevents.xyz/authors/darren-su', 'making'],
    ['31 个 Agent', '/zh/blog/managing-31-ai-employees', 'making'],
  ],
};

function textContent(html) {
  return html.replace(/<[^>]+>/g, '').replaceAll('&amp;', '&');
}

test('About prose links wrap existing names without changing the sentences', () => {
  for (const locale of ['en', 'zh']) {
    const copy = getAboutCopy(locale);
    const links = getAboutInlineLinks(locale);
    const html = renderToStaticMarkup(createElement(
      NextIntlClientProvider,
      { locale, messages: {} },
      createElement(
        'div',
        null,
        ...copy.community.map((paragraph) => createElement(AboutParagraph, { text: paragraph, links: links.community })),
        ...copy.making.map((paragraph) => createElement(AboutParagraph, { text: paragraph, links: links.making })),
        createElement('p', null, copy.intro),
      ),
    ));
    const anchors = [...html.matchAll(/<a\b([^>]*)>([^<]*)<\/a>/g)].map((match) => ({
      attrs: match[1],
      label: match[2],
    }));
    assert.deepEqual(anchors.map((anchor) => anchor.label), expected[locale].map(([label]) => label));
    for (const [label, href] of expected[locale]) {
      const anchor = anchors.find((item) => item.label === label);
      assert.match(anchor.attrs, new RegExp(`href="${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`));
      const section = expected[locale].find((item) => item[0] === label)[2];
      assert.equal(copy[section].filter((paragraph) => paragraph.includes(label)).length, 1);
    }
    const external = anchors.find((anchor) => anchor.label === 'GlobalTechEvents');
    assert.match(external.attrs, /target="_blank"/);
    assert.match(external.attrs, /rel="noopener noreferrer"/);
    assert.equal(
      textContent(html),
      [...copy.community, ...copy.making, copy.intro].join(''),
    );
    const introHtml = html.slice(html.lastIndexOf('<p>'));
    assert.equal(introHtml.includes('<a'), false);
  }
});
