'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface CommunityItem {
  name: string;
  tagline: string;
  role: string;
  whatIDo: string[];
  suitableFor: string[];
  color: string;
}

// 社区品牌配置
const brandConfig: Record<string, { 
  primary: string; 
  secondary: string;
  glow: string; 
  icon: string;
  bgGradient: string;
}> = {
  gold: { 
    primary: '#D4A856', 
    secondary: '#f0d590',
    glow: 'rgba(212, 168, 86, 0.3)',
    icon: '🏯',
    bgGradient: 'from-zen-gold/15 via-zen-gold/5 to-transparent',
  },
  cyan: { 
    primary: '#22D3EE', 
    secondary: '#67e8f9',
    glow: 'rgba(34, 211, 238, 0.3)',
    icon: '🐳',
    bgGradient: 'from-geek-cyan/15 via-geek-cyan/5 to-transparent',
  },
  purple: { 
    primary: '#A78BFA', 
    secondary: '#c4b5fd',
    glow: 'rgba(167, 139, 250, 0.3)',
    icon: '⛓️',
    bgGradient: 'from-geek-purple/15 via-geek-purple/5 to-transparent',
  },
};

export default function Communities() {
  const t = useTranslations('community');
  const communities = t.raw('communities.items') as CommunityItem[];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section className="section relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-zen-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-geek-cyan/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-geek-purple/3 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-geek-purple/50" />
            <span className="text-geek-purple text-xl">◈</span>
            <h2 className="text-2xl md:text-3xl font-medium">
              {t('communities.title')}
            </h2>
            <span className="text-geek-purple text-xl">◈</span>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-geek-purple/50" />
          </div>
          <p className="text-paper-400 text-sm">Click to expand details</p>
        </div>

        {/* Communities Cards */}
        <div className="space-y-4">
          {communities.map((community, index) => {
            const brand = brandConfig[community.color] || brandConfig.gold;
            const isHovered = hoveredIndex === index;
            const isExpanded = expandedIndex === index;
            
            return (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Card */}
                <div 
                  className={`relative rounded-2xl bg-ink-900/70 backdrop-blur-sm border overflow-hidden transition-all duration-500 cursor-pointer ${
                    isExpanded 
                      ? 'border-transparent' 
                      : isHovered 
                        ? 'border-ink-600' 
                        : 'border-ink-700/50'
                  }`}
                  style={{
                    boxShadow: isExpanded ? `0 20px 60px ${brand.glow}, 0 0 40px ${brand.glow}` : 'none',
                  }}
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                >
                  {/* Animated border gradient */}
                  {isExpanded && (
                    <div 
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${brand.primary}40, transparent 50%, ${brand.primary}20)`,
                        padding: '1px',
                      }}
                    />
                  )}

                  {/* Background gradient */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${brand.bgGradient} transition-opacity duration-500 ${isExpanded || isHovered ? 'opacity-100' : 'opacity-0'}`}
                  />

                  {/* Content */}
                  <div className="relative z-10 p-6 md:p-8">
                    {/* Header - Always visible */}
                    <div className="flex items-center gap-4">
                      {/* Brand Icon */}
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all duration-300"
                        style={{ 
                          backgroundColor: `${brand.primary}20`,
                          border: `1px solid ${brand.primary}40`,
                          boxShadow: isExpanded ? `0 0 30px ${brand.glow}` : 'none',
                        }}
                      >
                        {brand.icon}
                      </div>

                      {/* Title & Tagline */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 
                            className="text-xl md:text-2xl font-medium transition-colors"
                            style={{ color: isExpanded || isHovered ? brand.primary : 'inherit' }}
                          >
                            {community.name}
                          </h3>
                          <span 
                            className="px-2.5 py-1 rounded-full text-xs font-mono"
                            style={{ 
                              backgroundColor: `${brand.primary}15`,
                              color: brand.primary,
                              border: `1px solid ${brand.primary}30`,
                            }}
                          >
                            {community.role}
                          </span>
                        </div>
                        <p className="text-paper-400 text-sm">{community.tagline}</p>
                      </div>

                      {/* Expand indicator */}
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        style={{ 
                          backgroundColor: `${brand.primary}10`,
                          border: `1px solid ${brand.primary}30`,
                        }}
                      >
                        <svg 
                          className="w-5 h-5" 
                          fill="none" 
                          stroke={brand.primary} 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    <div 
                      className={`grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden transition-all duration-500 ${
                        isExpanded ? 'max-h-[500px] opacity-100 mt-6 pt-6 border-t border-ink-700/30' : 'max-h-0 opacity-0'
                      }`}
                    >
                      {/* What I do */}
                      <div className="bg-ink-800/30 rounded-xl p-5 border border-ink-700/30">
                        <h4 
                          className="text-sm font-medium mb-4 uppercase tracking-wider flex items-center gap-2"
                          style={{ color: brand.primary }}
                        >
                          <span>▸</span>
                          {t('communities.whatIDo')}
                        </h4>
                        <ul className="space-y-3">
                          {community.whatIDo.map((item, i) => (
                            <li 
                              key={i} 
                              className="flex items-start gap-3 text-sm text-paper-300"
                            >
                              <span 
                                className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                                style={{ backgroundColor: brand.primary }}
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Suitable for */}
                      <div className="bg-ink-800/30 rounded-xl p-5 border border-ink-700/30">
                        <h4 
                          className="text-sm font-medium mb-4 uppercase tracking-wider flex items-center gap-2"
                          style={{ color: brand.secondary }}
                        >
                          <span>◦</span>
                          {t('communities.suitableFor')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {community.suitableFor.map((item, i) => (
                            <span 
                              key={i}
                              className="px-3 py-1.5 rounded-lg text-sm text-paper-300 bg-ink-800/60 border border-ink-700/50 hover:border-ink-600 transition-colors"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Corner decoration */}
                  <div 
                    className="absolute top-3 right-3 w-8 h-8 border-t border-r transition-colors duration-300"
                    style={{ borderColor: isExpanded ? `${brand.primary}50` : 'rgba(31, 31, 31, 0.3)' }}
                  />
                  <div 
                    className="absolute bottom-3 left-3 w-8 h-8 border-b border-l transition-colors duration-300"
                    style={{ borderColor: isExpanded ? `${brand.primary}50` : 'rgba(31, 31, 31, 0.3)' }}
                  />
                </div>

                {/* Index badge */}
                <div 
                  className="absolute -top-2 -left-2 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold transition-all duration-300"
                  style={{ 
                    backgroundColor: isExpanded ? brand.primary : '#1f1f1f',
                    color: isExpanded ? '#0a0a0a' : '#6b6b6b',
                    boxShadow: isExpanded ? `0 0 20px ${brand.glow}` : 'none',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
