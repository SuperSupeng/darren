'use client';

import { useTranslations } from 'next-intl';

interface CapabilityItem {
  icon: string;
  title: string;
  description: string;
}

export default function Background() {
  const t = useTranslations('about.background');
  const capabilities = t.raw('capabilities') as CapabilityItem[];

  return (
    <section className="py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-ink-900/20" />
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-12 h-px bg-gradient-to-r from-transparent to-geek-cyan/50" />
              <span className="text-geek-cyan text-2xl">💪</span>
              <h2 className="text-3xl md:text-4xl font-medium">
                {t('title')}
              </h2>
              <span className="text-geek-cyan text-2xl">💪</span>
              <span className="w-12 h-px bg-gradient-to-l from-transparent to-geek-cyan/50" />
            </div>
            <p className="text-paper-400 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Capabilities Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {capabilities.map((item, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-xl bg-ink-900/50 border border-ink-700/50 hover:border-geek-cyan/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-4xl mb-4">{item.icon}</div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-medium mb-3 text-paper-100 group-hover:text-geek-cyan transition-colors">
                    {item.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-paper-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-geek-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Journey Summary */}
          <div className="mt-12 p-6 rounded-xl bg-ink-900/40 border border-ink-700/30">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🛤️</span>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2">{t('journey.title')}</h3>
                <p className="text-paper-400 text-sm leading-relaxed">
                  {t('journey.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
