'use client';

import { useTranslations } from 'next-intl';

interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

export default function Journey() {
  const t = useTranslations('about');
  const values = t.raw('values.items') as ValueItem[];

  return (
    <section className="section relative">
      <div className="container max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-geek-purple/50" />
            <span className="text-geek-purple text-xl">◈</span>
            <h2 className="text-2xl md:text-3xl font-medium">
              {t('values.title')}
            </h2>
            <span className="text-geek-purple text-xl">◈</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-geek-purple/50" />
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-xl bg-ink-900/50 border border-ink-700/50 hover:border-geek-purple/30 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-geek-purple/20 to-geek-cyan/10 border border-ink-700/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">{value.icon}</span>
              </div>

              {/* Content */}
              <h3 className="text-lg font-medium text-paper-100 mb-2 group-hover:text-geek-purple transition-colors">
                {value.title}
              </h3>
              <p className="text-sm text-paper-400 leading-relaxed">
                {value.description}
              </p>

              {/* Corner decoration */}
              <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-ink-700/50 group-hover:border-geek-purple/30 transition-colors" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-ink-700/50 group-hover:border-geek-purple/30 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
