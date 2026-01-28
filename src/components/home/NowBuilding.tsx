'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

// 服务配置
const serviceConfig: Record<string, { icon: string; accent: string }> = {
  activity: { icon: '🎯', accent: 'from-amber-500/20 to-orange-500/20' },
  kickstart: { icon: '🚀', accent: 'from-purple-500/20 to-pink-500/20' },
  aiSoftware: { icon: '🤖', accent: 'from-cyan-500/20 to-blue-500/20' },
  aiHardware: { icon: '⚡', accent: 'from-yellow-500/20 to-green-500/20' },
  global: { icon: '🌏', accent: 'from-blue-500/20 to-indigo-500/20' },
  overseas: { icon: '✈️', accent: 'from-indigo-500/20 to-purple-500/20' },
  community: { icon: '👥', accent: 'from-pink-500/20 to-rose-500/20' },
  connect: { icon: '🔗', accent: 'from-orange-500/20 to-red-500/20' },
};

export default function NowBuilding() {
  const t = useTranslations('services');
  const items = t.raw('items') as Array<{
    id: string;
    title: string;
    description: string;
  }>;

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(147,51,234,0.05)_0%,transparent_50%)]" />
      
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block text-zen-gold text-sm font-medium tracking-widest uppercase mb-4">
            Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-white">
            {t('title')}
          </h2>
          <p className="text-paper-400 text-lg md:text-xl max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {items.map((item, index) => {
            const config = serviceConfig[item.id] || { icon: '•', accent: 'from-gray-500/20 to-gray-600/20' };
            return (
              <div 
                key={item.id}
                className="group relative"
              >
                {/* Card - 添加实色背景层确保兼容性 */}
                <div className={`relative h-full p-6 md:p-8 rounded-2xl border border-white/5 
                  bg-ink-900/80 bg-gradient-to-br ${config.accent}
                  hover:border-white/10 hover:scale-[1.02] transition-all duration-300`}
                >
                  {/* Number badge */}
                  <span className="absolute top-4 right-4 text-xs font-mono text-paper-600">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  
                  {/* Icon */}
                  <div className="text-4xl mb-4">{config.icon}</div>
                  
                  {/* Content */}
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2 group-hover:text-zen-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-paper-400 text-sm leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/services"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full
              bg-gradient-to-r from-zen-gold to-amber-500 text-ink-950 font-semibold text-lg
              hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-300"
          >
            {t('viewAll') || 'View all services'}
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
