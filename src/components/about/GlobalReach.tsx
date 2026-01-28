'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';

interface CityNode {
  city: string;
  cityEn: string;
  whatIDo: string;
  suitableFor: string;
  flag: string;
}

// 城市对应的主题色
const cityColors: Record<string, { primary: string; glow: string }> = {
  '上海': { primary: '#D4A856', glow: 'rgba(212, 168, 86, 0.3)' },
  'Shanghai': { primary: '#D4A856', glow: 'rgba(212, 168, 86, 0.3)' },
  '北京': { primary: '#3B82F6', glow: 'rgba(59, 130, 246, 0.3)' },
  'Beijing': { primary: '#3B82F6', glow: 'rgba(59, 130, 246, 0.3)' },
  '深圳': { primary: '#22D3EE', glow: 'rgba(34, 211, 238, 0.3)' },
  'Shenzhen': { primary: '#22D3EE', glow: 'rgba(34, 211, 238, 0.3)' },
  '清迈': { primary: '#4ADE80', glow: 'rgba(74, 222, 128, 0.3)' },
  'Chiang Mai': { primary: '#4ADE80', glow: 'rgba(74, 222, 128, 0.3)' },
  '曼谷': { primary: '#A78BFA', glow: 'rgba(167, 139, 250, 0.3)' },
  'Bangkok': { primary: '#A78BFA', glow: 'rgba(167, 139, 250, 0.3)' },
};

export default function GlobalReach() {
  const t = useTranslations('about.global');
  const tGlobal = useTranslations('global');
  const [hoveredCity, setHoveredCity] = useState<number | null>(null);
  
  // 使用 global 页面的详细城市数据
  const cities = tGlobal.raw('cities.items') as CityNode[];

  const getColor = (cityName: string) => {
    return cityColors[cityName] || cityColors[cityName.split(' ')[0]] || { primary: '#D4A856', glow: 'rgba(212, 168, 86, 0.3)' };
  };

  return (
    <section className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-ink-900/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.08)_0%,transparent_50%)]" />
      
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-12 h-px bg-gradient-to-r from-transparent to-geek-blue/50" />
              <span className="text-geek-blue text-xl">🌐</span>
              <h2 className="text-2xl md:text-3xl font-medium">{t('title')}</h2>
              <span className="text-geek-blue text-xl">🌐</span>
              <span className="w-12 h-px bg-gradient-to-l from-transparent to-geek-blue/50" />
            </div>
            <p className="text-paper-400 max-w-2xl mx-auto">{t('subtitle')}</p>
          </div>
          
          {/* City Nodes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {cities.map((city, index) => {
              const color = getColor(city.city);
              const isHovered = hoveredCity === index;
              
              return (
                <div
                  key={index}
                  className="group relative"
                  onMouseEnter={() => setHoveredCity(index)}
                  onMouseLeave={() => setHoveredCity(null)}
                >
                  <div 
                    className={`relative p-5 rounded-xl bg-ink-900/70 border transition-all duration-300 ${
                      isHovered 
                        ? 'border-transparent -translate-y-1' 
                        : 'border-ink-700/50 hover:border-ink-600'
                    }`}
                    style={{
                      boxShadow: isHovered ? `0 10px 40px ${color.glow}` : 'none',
                    }}
                  >
                    {/* Background glow */}
                    <div 
                      className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${color.glow}, transparent 70%)`,
                      }}
                    />

                    <div className="relative z-10">
                      {/* City Header */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{city.flag}</span>
                        <div>
                          <h3 
                            className="font-medium transition-colors duration-300"
                            style={{ color: isHovered ? color.primary : '#faf9f7' }}
                          >
                            {city.city}
                          </h3>
                          <span className="text-xs text-paper-500 font-mono">{city.cityEn}</span>
                        </div>
                        {/* Status */}
                        <div className="ml-auto flex items-center gap-1.5">
                          <span 
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ backgroundColor: color.primary }}
                          />
                          <span className="text-xs text-paper-500 font-mono">active</span>
                        </div>
                      </div>

                      {/* What I do */}
                      <p className="text-paper-400 text-sm leading-relaxed line-clamp-2">
                        {city.whatIDo}
                      </p>
                    </div>

                    {/* Corner decoration */}
                    <div 
                      className="absolute top-2 right-2 w-4 h-4 border-t border-r transition-colors duration-300"
                      style={{ borderColor: isHovered ? color.primary : 'rgba(31, 31, 31, 0.5)' }}
                    />
                  </div>

                  {/* Node index */}
                  <div 
                    className="absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300"
                    style={{ 
                      backgroundColor: isHovered ? color.primary : '#1f1f1f',
                      color: isHovered ? '#0a0a0a' : '#6b6b6b',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats & CTA */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-ink-800">
            <div className="flex items-center gap-6">
              {[
                { icon: '🌐', value: cities.length, label: 'Cities' },
                { icon: '🤝', value: '24/7', label: 'Connected' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xl">{stat.icon}</span>
                  <div>
                    <div className="text-lg font-mono text-zen-gold">{stat.value}</div>
                    <div className="text-xs text-paper-500">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <Link 
              href="/global"
              className="group inline-flex items-center gap-2 text-sm font-medium text-paper-400 hover:text-geek-blue transition-colors"
            >
              View all global nodes
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
