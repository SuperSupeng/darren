'use client';

import { useTranslations } from 'next-intl';

interface RunItem {
  icon: string;
  title: string;
  description: string;
}

export default function HowWeRun() {
  const t = useTranslations('community');
  const items = t.raw('howWeRun.items') as RunItem[];

  return (
    <section className="section relative">
      <div className="container max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-geek-cyan/50" />
            <span className="text-geek-cyan text-xl">◉</span>
            <h2 className="text-2xl md:text-3xl font-medium">
              {t('howWeRun.title')}
            </h2>
            <span className="text-geek-cyan text-xl">◉</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-geek-cyan/50" />
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="group relative p-5 rounded-xl bg-ink-900/50 border border-ink-700/50 hover:border-geek-cyan/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <h3 className="text-lg font-medium text-paper-100 mb-1 group-hover:text-geek-cyan transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-paper-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
