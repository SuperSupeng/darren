'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';

interface PastEventType {
  name: string;
  date: string;
  location: string;
  participants: number;
  image: string;
  community?: string;
}

// 活动卡片配色循环
const colorConfig = [
  { 
    color: '#22D3EE', // cyan
    glow: 'rgba(34, 211, 238, 0.15)',
  },
  { 
    color: '#D4A856', // gold
    glow: 'rgba(212, 168, 86, 0.15)',
  },
  { 
    color: '#A78BFA', // purple
    glow: 'rgba(167, 139, 250, 0.15)',
  },
];

export default function PastEvents() {
  const t = useTranslations('community');
  const pastEvents = t.raw('pastEvents.items') as PastEventType[];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 如果没有活动数据，不渲染
  if (!pastEvents || pastEvents.length === 0) return null;

  return (
    <section className="section relative">
      <div className="container max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-zen-gold/50" />
            <span className="text-zen-gold text-xl">⟡</span>
            <h2 className="text-2xl md:text-3xl font-medium">
              {t('pastEvents.title')}
            </h2>
            <span className="text-zen-gold text-xl">⟡</span>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-zen-gold/50" />
          </div>
          <p className="text-paper-500 text-sm">
            {t('pastEvents.subtitle')}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastEvents.map((event, index) => {
            const config = colorConfig[index % colorConfig.length];
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div 
                  className={`relative rounded-2xl bg-ink-900/70 backdrop-blur-sm border overflow-hidden transition-all duration-500 ${
                    isHovered ? 'border-transparent -translate-y-2' : 'border-ink-700/50'
                  }`}
                  style={{
                    boxShadow: isHovered ? `0 20px 60px ${config.glow}, 0 0 40px ${config.glow}` : 'none',
                  }}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.name}
                      fill
                      className={`object-cover transition-transform duration-500 ${
                        isHovered ? 'scale-110' : 'scale-100'
                      }`}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent" />
                    
                    {/* Community tag */}
                    {event.community && (
                      <div 
                        className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-mono font-medium backdrop-blur-sm"
                        style={{ 
                          backgroundColor: `${config.color}20`,
                          color: config.color,
                          border: `1px solid ${config.color}40`,
                        }}
                      >
                        {event.community}
                      </div>
                    )}

                    {/* Participants badge */}
                    <div 
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-mono backdrop-blur-sm bg-ink-900/60 text-paper-300 border border-ink-700/50"
                    >
                      👥 {event.participants}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Title */}
                    <h3 
                      className="text-lg font-medium mb-2 transition-colors duration-300 line-clamp-1"
                      style={{ color: isHovered ? config.color : '#faf9f7' }}
                    >
                      {event.name}
                    </h3>
                    
                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-sm text-paper-500">
                      <span className="flex items-center gap-1.5">
                        <span style={{ color: config.color }}>📅</span>
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span style={{ color: config.color }}>📍</span>
                        {event.location}
                      </span>
                    </div>
                  </div>

                  {/* Corner decoration */}
                  <div 
                    className="absolute bottom-3 right-3 w-6 h-6 border-b border-r transition-colors duration-300"
                    style={{ borderColor: isHovered ? `${config.color}50` : 'rgba(31, 31, 31, 0.3)' }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <p className="text-paper-500 text-sm font-mono">
            {t('pastEvents.note')}
          </p>
        </div>
      </div>
    </section>
  );
}
