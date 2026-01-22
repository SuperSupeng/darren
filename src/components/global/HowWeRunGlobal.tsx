'use client';

import { useTranslations } from 'next-intl';

export default function HowWeRunGlobal() {
  const t = useTranslations('global');
  const items = t.raw('howWeRun.items') as string[];

  return (
    <section className="section relative">
      <div className="container max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-zen-gold/50" />
            <span className="text-zen-gold text-xl">⟡</span>
            <h2 className="text-2xl md:text-3xl font-medium">
              {t('howWeRun.title')}
            </h2>
            <span className="text-zen-gold text-xl">⟡</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-zen-gold/50" />
          </div>
        </div>

        {/* Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-lg bg-ink-900/50 border border-ink-700/50"
            >
              <span className="text-zen-gold mt-0.5">▸</span>
              <span className="text-paper-300">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
