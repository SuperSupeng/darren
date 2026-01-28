'use client';

import { useTranslations } from 'next-intl';

const communityColors: Record<string, string> = {
  gold: 'border-zen-gold/30 bg-zen-gold/5',
  cyan: 'border-geek-cyan/30 bg-geek-cyan/5',
  purple: 'border-geek-purple/30 bg-geek-purple/5',
};

export default function Communities() {
  const t = useTranslations('about.communities');
  const items = t.raw('items') as Array<{
    name: string;
    tagline: string;
    role: string;
    color: string;
  }>;

  return (
    <section className="section">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium mb-8">{t('title')}</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            {items.map((item) => (
              <div 
                key={item.name}
                className={`p-5 rounded-xl border ${communityColors[item.color] || communityColors.gold}`}
              >
                <h3 className="font-medium text-paper-100 mb-1">{item.name}</h3>
                <p className="text-xs text-paper-400 mb-3">{item.tagline}</p>
                <span className="inline-block text-xs px-2 py-1 rounded bg-ink-800 text-paper-300">
                  {item.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
