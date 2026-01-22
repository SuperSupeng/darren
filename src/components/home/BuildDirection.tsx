'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function BuildDirection() {
  const t = useTranslations('buildDirection');
  const items = t.raw('items') as string[];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // 技能树节点数据
  const nodes = [
    { 
      icon: '🔧', 
      color: 'from-geek-cyan to-geek-blue',
      glowColor: 'rgba(34, 211, 238, 0.4)',
      borderColor: 'border-geek-cyan/30',
      position: 'left-[10%] top-[20%]',
      size: 'w-16 h-16',
      level: 3,
    },
    { 
      icon: '⚙️', 
      color: 'from-geek-purple to-pink-500',
      glowColor: 'rgba(167, 139, 250, 0.4)',
      borderColor: 'border-geek-purple/30',
      position: 'right-[15%] top-[15%]',
      size: 'w-14 h-14',
      level: 2,
    },
    { 
      icon: '⚡', 
      color: 'from-zen-gold to-orange-500',
      glowColor: 'rgba(212, 168, 86, 0.4)',
      borderColor: 'border-zen-gold/30',
      position: 'left-[20%] bottom-[25%]',
      size: 'w-16 h-16',
      level: 4,
    },
    { 
      icon: '👥', 
      color: 'from-zen-bamboo to-emerald-500',
      glowColor: 'rgba(122, 158, 126, 0.4)',
      borderColor: 'border-zen-bamboo/30',
      position: 'right-[10%] bottom-[20%]',
      size: 'w-14 h-14',
      level: 2,
    },
    { 
      icon: '🌐', 
      color: 'from-geek-blue to-indigo-500',
      glowColor: 'rgba(59, 130, 246, 0.4)',
      borderColor: 'border-geek-blue/30',
      position: 'left-1/2 -translate-x-1/2 top-[5%]',
      size: 'w-12 h-12',
      level: 1,
    },
  ];

  return (
    <section className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-ink-950" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Connection Lines SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#d4a856" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" />
        <line x1="80%" y1="25%" x2="50%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" />
        <line x1="25%" y1="70%" x2="50%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" />
        <line x1="85%" y1="75%" x2="50%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" />
        <line x1="50%" y1="15%" x2="50%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" />
      </svg>
      
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-800/50 border border-ink-700/50 mb-4">
              <span className="text-zen-gold font-mono text-sm">{'>'}</span>
              <span className="text-sm text-paper-300">skill_tree.render()</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-medium">
              {t('title')}
            </h2>
          </div>

          {/* Skill Tree Grid */}
          <div className="grid md:grid-cols-5 gap-4">
            {items.map((item, index) => {
              const node = nodes[index];
              const isActive = activeIndex === index;
              
              return (
                <div
                  key={index}
                  className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                    isActive ? 'bg-ink-800/80 scale-105' : 'bg-ink-900/50 hover:bg-ink-800/50'
                  } border ${node.borderColor} hover:border-opacity-60`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {/* Glow Effect */}
                  <div 
                    className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                    style={{ 
                      background: `radial-gradient(circle at center, ${node.glowColor} 0%, transparent 70%)`,
                      filter: 'blur(20px)',
                    }}
                  />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${node.color} flex items-center justify-center text-2xl shadow-lg transform transition-transform duration-300 ${isActive ? 'scale-110 rotate-3' : ''}`}>
                      {node.icon}
                    </div>
                    
                    {/* Level Indicator */}
                    <div className="flex justify-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            i < node.level 
                              ? `bg-gradient-to-r ${node.color}` 
                              : 'bg-ink-700'
                          }`}
                        />
                      ))}
                    </div>
                    
                    {/* Text */}
                    <p className={`text-sm text-center leading-relaxed transition-colors duration-300 ${
                      isActive ? 'text-paper-100' : 'text-paper-400'
                    }`}>
                      {item}
                    </p>
                    
                    {/* Level Badge */}
                    <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-ink-900 border ${node.borderColor} flex items-center justify-center text-xs font-mono transition-all duration-300 ${isActive ? 'scale-110' : ''}`}>
                      <span className={`bg-gradient-to-r ${node.color} bg-clip-text text-transparent`}>
                        {node.level}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Stats Bar */}
          <div className="mt-8 flex items-center justify-center gap-8 text-xs font-mono text-paper-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-geek-cyan" />
              Skills: 5
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zen-gold" />
              Total Level: {nodes.reduce((acc, n) => acc + n.level, 0)}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-geek-green" />
              Status: Active
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
