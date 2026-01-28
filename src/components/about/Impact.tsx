'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface ImpactItem {
  name: string;
  tagline: string;
  whatIDid: string;
  result: string;
}

// 项目配置
const projectConfig = [
  { color: '#7A9E7E', icon: '🌱' },
  { color: '#4ADE80', icon: '🎓' },
  { color: '#22D3EE', icon: '🤝' },
];

export default function Impact() {
  const t = useTranslations('impact');
  const items = t.raw('whatIDid.items') as ImpactItem[];

  return (
    <section className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(122,158,126,0.08)_0%,transparent_50%)]" />
      
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-12 h-px bg-gradient-to-r from-transparent to-zen-bamboo/50" />
              <span className="text-zen-bamboo text-xl">💚</span>
              <h2 className="text-2xl md:text-3xl font-medium">{t('whatIDid.title')}</h2>
              <span className="text-zen-bamboo text-xl">💚</span>
              <span className="w-12 h-px bg-gradient-to-l from-transparent to-zen-bamboo/50" />
            </div>
            <p className="text-paper-400 max-w-2xl mx-auto">
              {t('hero.subtitle1')}
            </p>
          </div>

          {/* Impact Items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {items.map((item, index) => {
              const config = projectConfig[index % projectConfig.length];
              
              return (
                <div
                  key={index}
                  className="group relative p-6 rounded-xl bg-ink-900/60 border border-ink-700/50 hover:border-zen-bamboo/30 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Background gradient */}
                  <div 
                    className="absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, ${config.color}10, transparent 60%)`,
                    }}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 transition-transform group-hover:scale-110"
                      style={{ 
                        backgroundColor: `${config.color}15`,
                        border: `1px solid ${config.color}30`,
                      }}
                    >
                      {config.icon}
                    </div>

                    {/* Title */}
                    <h3 
                      className="text-lg font-medium mb-2 transition-colors duration-300 group-hover:text-zen-bamboo"
                    >
                      {item.name}
                    </h3>

                    {/* Tagline */}
                    <p className="text-paper-500 text-sm mb-3">
                      {item.tagline}
                    </p>

                    {/* What I did */}
                    <p className="text-paper-400 text-sm leading-relaxed">
                      {item.whatIDid}
                    </p>
                  </div>

                  {/* Corner decoration */}
                  <div 
                    className="absolute top-3 right-3 w-4 h-4 border-t border-r transition-colors duration-300"
                    style={{ borderColor: 'rgba(31, 31, 31, 0.3)' }}
                  />
                </div>
              );
            })}
          </div>

          {/* Mechanism highlight */}
          <div className="p-6 rounded-xl bg-ink-900/40 border border-ink-700/30">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <span className="text-geek-green">◉</span>
                  {t('mechanism.title')}
                </h3>
                <p className="text-paper-400 text-sm">
                  {t('mechanism.intro')}
                </p>
              </div>
              
              <Link 
                href="/impact"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zen-bamboo/30 text-zen-bamboo text-sm font-medium hover:bg-zen-bamboo/10 transition-all"
              >
                Learn more
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
