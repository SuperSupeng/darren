export function createArticleHeadingAnchors() {
  const seen = new Map<string, number>();
  let section = 0;

  return (value: string) => {
    const plainText = value
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[`*_~]/g, '')
      .normalize('NFKC')
      .toLocaleLowerCase()
      .replace(/[\u2018\u2019']/g, '')
      .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
      .replace(/^-+|-+$/g, '');
    const base = plainText || 'section';
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    section += 1;

    return {
      id: count === 0 ? base : `${base}-${count + 1}`,
      // A colon cannot occur in the generated text slug, so aliases never collide with it.
      sectionId: `article-section:${section}`,
    };
  };
}

export function languageSwitchHash(hash: string, page: Pick<Document, 'getElementById'>): string {
  if (!hash.startsWith('#')) return hash;

  let id: string;
  try {
    id = decodeURIComponent(hash.slice(1));
  } catch {
    return hash;
  }

  const sectionId = page.getElementById(id)?.getAttribute('data-article-section');
  if (!sectionId || !/^article-section:[1-9]\d*$/.test(sectionId)) return hash;
  if (!page.getElementById(sectionId)) return hash;

  return `#${sectionId}`;
}
