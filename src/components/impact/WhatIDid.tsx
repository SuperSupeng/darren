'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface ImpactItem {
  name: string;
  tagline: string;
  whatIDid: string;
  result: string;
}

// 项目状态配置
const projectConfig = [
  { color: '#7A9E7E', icon: '🌱', status: 'Active' },
  { color: '#4ADE80', icon: '🎓', status: 'Completed' },
  { color: '#22D3EE', icon: '🤝', status: 'Ongoing' },
];

export default function WhatIDid() {
  const t = useTranslations('impact');
  const items = t.raw('whatIDid.items') as ImpactItem[];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section className="section relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-zen-bamboo/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-geek-green/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-zen-bamboo/50" />
            <span className="text-zen-bamboo text-xl">❋</span>
            <h2 className="text-2xl md:text-3xl font-medium">
              {t('whatIDid.title')}
            </h2>
            <span className="text-zen-bamboo text-xl">❋</span>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-zen-bamboo/50" />
          </div>
          <p className="text-paper-400 text-sm">Click to see details</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-zen-bamboo/50 via-geek-green/30 to-transparent" />

          {/* Impact Items */}
          <div className="space-y-8">
            {items.map((item, index) => {
              const config = projectConfig[index % projectConfig.length];
              const isHovered = hoveredIndex === index;
              const isExpanded = expandedIndex === index;
              const isLeft = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className={`relative flex items-start gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Timeline dot */}
                  <div 
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 bg-ink-900 z-10 transition-all duration-300"
                    style={{ 
                      borderColor: isHovered || isExpanded ? config.color : '#2a2a2a',
                      boxShadow: isHovered || isExpanded ? `0 0 20px ${config.color}40` : 'none',
                    }}
                  >
                    {/* Pulse ring */}
                    {(isHovered || isExpanded) && (
                      <div 
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{ backgroundColor: `${config.color}30` }}
                      />
                    )}
                  </div>

                  {/* Card */}
                  <div 
                    className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}
                  >
                    <div 
                      className={`relative p-6 rounded-2xl bg-ink-900/70 backdrop-blur-sm border cursor-pointer transition-all duration-500 overflow-hidden ${
                        isExpanded 
                          ? 'border-transparent' 
                          : isHovered 
                            ? 'border-ink-600' 
                            : 'border-ink-700/50'
                      }`}
                      style={{
                        boxShadow: isExpanded 
                          ? `0 20px 60px ${config.color}30, 0 0 40px ${config.color}20` 
                          : 'none',
                      }}
                      onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    >
                      {/* Background gradient */}
                      <div 
                        className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 ${isExpanded || isHovered ? 'opacity-100' : 'opacity-0'}`}
                        style={{ 
                          background: `linear-gradient(135deg, ${config.color}15, transparent 60%)`,
                        }}
                      />

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300"
                              style={{ 
                                backgroundColor: `${config.color}20`,
                                border: `1px solid ${config.color}40`,
                              }}
                            >
                              {config.icon}
                            </div>
                            <div>
                              <h3 
                                className="text-lg font-medium transition-colors duration-300"
                                style={{ color: isExpanded || isHovered ? config.color : '#faf9f7' }}
                              >
                                {item.name}
                              </h3>
                              <span 
                                className="text-xs font-mono"
                                style={{ color: `${config.color}cc` }}
                              >
                                {item.tagline}
                              </span>
                            </div>
                          </div>

                          {/* Status badge */}
                          <span 
                            className="px-2.5 py-1 rounded-full text-xs font-mono"
                            style={{ 
                              backgroundColor: `${config.color}15`,
                              color: config.color,
                              border: `1px solid ${config.color}30`,
                            }}
                          >
                            {config.status}
                          </span>
                        </div>

                        {/* Expanded content */}
                        <div 
                          className={`overflow-hidden transition-all duration-500 ${
                            isExpanded ? 'max-h-[300px] opacity-100 mt-4 pt-4 border-t border-ink-700/30' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="grid grid-cols-1 gap-4">
                            {/* What I did */}
                            <div className="p-4 rounded-xl bg-ink-800/50 border border-ink-700/30">
                              <span className="text-xs font-mono uppercase tracking-wider text-paper-500 block mb-2">
                                {t('whatIDid.whatIDid')}
                              </span>
                              <p className="text-paper-300 text-sm leading-relaxed">{item.whatIDid}</p>
                            </div>

                            {/* Result */}
                            <div className="p-4 rounded-xl bg-ink-800/50 border border-ink-700/30">
                              <span className="text-xs font-mono uppercase tracking-wider text-paper-500 block mb-2">
                                {t('whatIDid.result')}
                              </span>
                              <p 
                                className="text-sm leading-relaxed font-medium"
                                style={{ color: config.color }}
                              >
                                {item.result}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Expand indicator */}
                        <div 
                          className={`flex items-center justify-center mt-4 transition-all duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        >
                          <svg 
                            className="w-5 h-5" 
                            fill="none" 
                            stroke={isExpanded || isHovered ? config.color : '#6b6b6b'} 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      {/* Corner decorations */}
                      <div 
                        className="absolute top-3 right-3 w-4 h-4 border-t border-r transition-colors duration-300"
                        style={{ borderColor: isExpanded ? `${config.color}50` : 'rgba(31, 31, 31, 0.3)' }}
                      />
                      <div 
                        className="absolute bottom-3 left-3 w-4 h-4 border-b border-l transition-colors duration-300"
                        style={{ borderColor: isExpanded ? `${config.color}50` : 'rgba(31, 31, 31, 0.3)' }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
