'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface EventType {
  name: string;
  tagline: string;
  details: string[];
  icon: string;
}

// 活动类型配置
const eventConfig = [
  { 
    color: '#22D3EE', // cyan
    glow: 'rgba(34, 211, 238, 0.2)',
    bgGradient: 'from-geek-cyan/10',
    tag: 'LEARN'
  },
  { 
    color: '#D4A856', // gold
    glow: 'rgba(212, 168, 86, 0.2)',
    bgGradient: 'from-zen-gold/10',
    tag: 'BUILD'
  },
  { 
    color: '#A78BFA', // purple
    glow: 'rgba(167, 139, 250, 0.2)',
    bgGradient: 'from-geek-purple/10',
    tag: 'GROW'
  },
];

export default function Events() {
  const t = useTranslations('community');
  const events = t.raw('events.items') as EventType[];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="section relative">
      <div className="container max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-zen-gold/50" />
            <span className="text-zen-gold text-xl">⟡</span>
            <h2 className="text-2xl md:text-3xl font-medium">
              {t('events.title')}
            </h2>
            <span className="text-zen-gold text-xl">⟡</span>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-zen-gold/50" />
          </div>
        </div>

        {/* Events Timeline/Grid */}
        <div className="relative">
          {/* Connection line - visible on desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-geek-cyan/20 via-zen-gold/20 to-geek-purple/20" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
            {events.map((event, index) => {
              const config = eventConfig[index % eventConfig.length];
              const isHovered = hoveredIndex === index;
              
              return (
                <div
                  key={index}
                  className="group relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Connection dot */}
                  <div 
                    className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 bg-ink-900 z-10 transition-all duration-300"
                    style={{ 
                      borderColor: isHovered ? config.color : '#2a2a2a',
                      boxShadow: isHovered ? `0 0 20px ${config.glow}` : 'none',
                    }}
                  />

                  {/* Card */}
                  <div 
                    className={`relative p-6 rounded-2xl bg-ink-900/70 backdrop-blur-sm border transition-all duration-500 overflow-hidden ${
                      isHovered ? 'border-transparent -translate-y-2' : 'border-ink-700/50'
                    }`}
                    style={{
                      boxShadow: isHovered ? `0 20px 60px ${config.glow}, 0 0 40px ${config.glow}` : 'none',
                    }}
                  >
                    {/* Background gradient on hover */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        {/* Icon */}
                        <div 
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all duration-300"
                          style={{ 
                            backgroundColor: `${config.color}15`,
                            border: `1px solid ${config.color}40`,
                            boxShadow: isHovered ? `0 0 30px ${config.glow}` : 'none',
                          }}
                        >
                          {event.icon}
                        </div>

                        {/* Type tag */}
                        <span 
                          className="px-2.5 py-1 rounded-full text-xs font-mono font-bold"
                          style={{ 
                            backgroundColor: `${config.color}15`,
                            color: config.color,
                            border: `1px solid ${config.color}30`,
                          }}
                        >
                          {config.tag}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 
                        className="text-xl font-medium mb-2 transition-colors duration-300"
                        style={{ color: isHovered ? config.color : '#faf9f7' }}
                      >
                        {event.name}
                      </h3>
                      
                      {/* Tagline */}
                      <p 
                        className="text-sm mb-4 font-mono"
                        style={{ color: `${config.color}cc` }}
                      >
                        {event.tagline}
                      </p>
                      
                      {/* Details */}
                      <ul className="space-y-2.5">
                        {event.details.map((detail, i) => (
                          <li 
                            key={i} 
                            className="flex items-start gap-3 text-sm text-paper-400"
                          >
                            <span 
                              className="w-1 h-1 rounded-full mt-2 shrink-0"
                              style={{ backgroundColor: config.color }}
                            />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Index number */}
                    <div 
                      className="absolute bottom-4 right-4 text-4xl font-bold font-mono transition-colors duration-300"
                      style={{ color: isHovered ? `${config.color}20` : 'rgba(31, 31, 31, 0.5)' }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Corner decorations */}
                    <div 
                      className="absolute top-3 left-3 w-4 h-4 border-t border-l transition-colors duration-300"
                      style={{ borderColor: isHovered ? `${config.color}50` : 'rgba(31, 31, 31, 0.3)' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-10 text-center">
          <p className="text-paper-500 text-sm font-mono">
            All events are <span className="text-zen-gold">works-oriented</span> → ship something real
          </p>
        </div>
      </div>
    </section>
  );
}
