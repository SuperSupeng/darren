'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

const serviceConfig: Record<string, { icon: string; color: string; accent: string; borderColor: string }> = {
  globalStrategy: { icon: '🌍', color: 'from-zen-gold/20 to-amber-500/10', accent: 'text-zen-gold', borderColor: 'border-zen-gold/30' },
  hardwareSupplyChain: { icon: '🏭', color: 'from-geek-cyan/20 to-blue-500/10', accent: 'text-geek-cyan', borderColor: 'border-geek-cyan/30' },
};

const PRODUCT_SERVICE_IDS = ['globalStrategy', 'hardwareSupplyChain'];

export default function NowBuilding() {
  const t = useTranslations('services');
  const itemsObj = t.raw('items') as Record<string, { title: string; description: string }>;
  const items = PRODUCT_SERVICE_IDS.map(id => ({ id, ...itemsObj[id] }));

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_60%)]" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-zen-gold text-sm font-medium tracking-widest uppercase mb-4">
            {t('title')}
          </span>
          <h2 className="text-4xl md:text-5xl font-medium mb-4 text-white">
            {t('subtitle')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {items.map((item) => {
            const config = serviceConfig[item.id];
            return (
              <div
                key={item.id}
                className={`group relative p-8 rounded-2xl bg-ink-900/60 border border-ink-700/50 ${config.borderColor} hover:border-geek-cyan/40 transition-all duration-300 hover:-translate-y-2`}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${config.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className="text-5xl mb-6">{config.icon}</div>
                  <h3 className="text-xl md:text-2xl font-medium text-paper-100 mb-4">{item.title}</h3>
                  <p className="text-paper-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-zen-gold text-ink-950 font-medium text-lg hover:bg-zen-gold/90 transition-all duration-300"
          >
            {t('viewAll')}
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
