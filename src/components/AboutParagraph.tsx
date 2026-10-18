import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import type { AboutInlineLink } from '@/lib/about';

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function renderLinkedText(text: string, links: readonly AboutInlineLink[]) {
  if (links.length === 0) return text;
  const phrases = [...links].sort((a, b) => b.phrase.length - a.phrase.length);
  const pattern = new RegExp(phrases.map((link) => escapeRegExp(link.phrase)).join('|'), 'g');
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    const phrase = match[0];
    if (index > cursor) nodes.push(text.slice(cursor, index));
    const link = phrases.find((item) => item.phrase === phrase);
    if (!link) {
      nodes.push(phrase);
    } else if ('external' in link && link.external) {
      nodes.push(
        <a key={`${phrase}-${index}`} href={link.href} target="_blank" rel="noopener noreferrer">
          {phrase}
        </a>,
      );
    } else {
      nodes.push(
        <Link key={`${phrase}-${index}`} href={link.href}>
          {phrase}
        </Link>,
      );
    }
    cursor = index + phrase.length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes.length > 0 ? nodes : text;
}

export default function AboutParagraph({
  text,
  links = [],
  className,
}: {
  text: string;
  links?: readonly AboutInlineLink[];
  className?: string;
}) {
  return <p className={className}>{renderLinkedText(text, links)}</p>;
}
