'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

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

export default function CityNodes() {
  const t = useTranslations('global');
  const cities = t.raw('cities.items') as CityNode[];
  const [hoveredCity, setHoveredCity] = useState<number | null>(null);

  const getColor = (cityName: string) => {
    return cityColors[cityName] || { primary: '#D4A856', glow: 'rgba(212, 168, 86, 0.3)' };
  };

  return (
    <section className="section relative overflow-hidden">
      {/* Connection Lines SVG Background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4A856" stopOpacity="0" />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#D4A856" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Animated connection paths */}
        <path
          d="M 100 200 Q 300 100 500 200 T 900 200"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          className="animate-pulse"
        />
        <path
          d="M 200 400 Q 400 300 600 400 T 1000 400"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </svg>

      <div className="container max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-geek-blue/50" />
            <div className="flex items-center gap-2">
              <span className="text-geek-blue text-xl">◈</span>
              <h2 className="text-2xl md:text-3xl font-medium">
                {t('cities.title')}
              </h2>
              <span className="text-geek-blue text-xl">◈</span>
            </div>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-geek-blue/50" />
          </div>
          <p className="text-paper-400 text-sm max-w-md mx-auto">
            Hover to explore each node
          </p>
        </div>

        {/* Cities Grid - Hexagonal-ish layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                {/* Card */}
                <div 
                  className={`relative p-6 rounded-2xl bg-ink-900/70 backdrop-blur-sm border transition-all duration-500 overflow-hidden ${
                    isHovered 
                      ? 'border-transparent -translate-y-2 scale-[1.02]' 
                      : 'border-ink-700/50 hover:border-ink-600'
                  }`}
                  style={{
                    boxShadow: isHovered ? `0 20px 60px ${color.glow}, 0 0 40px ${color.glow}` : 'none',
                  }}
                >
                  {/* Animated Border */}
                  <div 
                    className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      background: `linear-gradient(135deg, ${color.primary}40, transparent, ${color.primary}20)`,
                      padding: '1px',
                    }}
                  />

                  {/* Background Glow */}
                  <div 
                    className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${color.glow}, transparent 70%)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* City Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{city.flag}</span>
                        <div>
                          <h3 
                            className="font-medium text-lg transition-colors duration-300"
                            style={{ color: isHovered ? color.primary : 'inherit' }}
                          >
                            {city.city}
                          </h3>
                          <span className="text-xs text-paper-500 font-mono">{city.cityEn}</span>
                        </div>
                      </div>
                      
                      {/* Status Indicator */}
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: color.primary }}
                        />
                        <span className="text-xs text-paper-500 font-mono">active</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-ink-800/50 border border-ink-700/30">
                        <span className="text-paper-500 text-xs block mb-1.5 font-mono uppercase tracking-wider">
                          {t('cities.whatIDo')}
                        </span>
                        <p className="text-paper-200 text-sm leading-relaxed">{city.whatIDo}</p>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-ink-800/50 border border-ink-700/30">
                        <span className="text-paper-500 text-xs block mb-1.5 font-mono uppercase tracking-wider">
                          {t('cities.suitableFor')}
                        </span>
                        <p className="text-paper-300 text-sm leading-relaxed">{city.suitableFor}</p>
                      </div>
                    </div>

                    {/* Connect CTA */}
                    <a 
                      href="mailto:supeng842499467@gmail.com"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 group/link"
                      style={{ color: color.primary }}
                    >
                      <span>Connect in {city.cityEn}</span>
                      <svg 
                        className="w-4 h-4 transition-transform group-hover/link:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>

                  {/* Corner Decorations */}
                  <div 
                    className="absolute top-3 right-3 w-6 h-6 border-t border-r transition-colors duration-300"
                    style={{ borderColor: isHovered ? color.primary : 'rgba(31, 31, 31, 0.5)' }}
                  />
                  <div 
                    className="absolute bottom-3 left-3 w-6 h-6 border-b border-l transition-colors duration-300"
                    style={{ borderColor: isHovered ? color.primary : 'rgba(31, 31, 31, 0.5)' }}
                  />
                </div>

                {/* Node Index */}
                <div 
                  className="absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300"
                  style={{ 
                    backgroundColor: isHovered ? color.primary : '#1f1f1f',
                    color: isHovered ? '#0a0a0a' : '#6b6b6b',
                    boxShadow: isHovered ? `0 0 20px ${color.glow}` : 'none',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
            );
          })}
        </div>

        {/* Network Stats */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center">
          {[
            { icon: '🌐', label: 'Connected Cities', value: cities.length },
            { icon: '🤝', label: 'Active Connections', value: '24/7' },
            { icon: '🚀', label: 'Events Hosted', value: '10+' },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <div className="text-left">
                <div className="text-xl font-mono text-zen-gold">{stat.value}</div>
                <div className="text-xs text-paper-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
