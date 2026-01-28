'use client';

import { useTranslations } from 'next-intl';

interface SignalItem {
  role: string;
  position: string;
}

export default function Signals() {
  const t = useTranslations('signals');
  const items = t.raw('items') as SignalItem[];

  const cardStyles = [
    { 
      bg: 'from-geek-cyan/10 to-transparent', 
      border: 'hover:border-geek-cyan/40', 
      accent: 'text-geek-cyan',
      tag: 'AI Builder',
      tagBg: 'bg-geek-cyan/10 text-geek-cyan border-geek-cyan/30',
      glow: 'group-hover:shadow-[0_0_40px_-5px_rgba(34,211,238,0.4)]',
      icon: '🤖'
    },
    { 
      bg: 'from-geek-purple/10 to-transparent', 
      border: 'hover:border-geek-purple/40', 
      accent: 'text-geek-purple',
      tag: 'Open Source',
      tagBg: 'bg-geek-purple/10 text-geek-purple border-geek-purple/30',
      glow: 'group-hover:shadow-[0_0_40px_-5px_rgba(167,139,250,0.4)]',
      icon: '📖'
    },
    { 
      bg: 'from-zen-gold/10 to-transparent', 
      border: 'hover:border-zen-gold/40', 
      accent: 'text-zen-gold',
      tag: 'Web3 × AI',
      tagBg: 'bg-zen-gold/10 text-zen-gold border-zen-gold/30',
      glow: 'group-hover:shadow-[0_0_40px_-5px_rgba(212,168,86,0.4)]',
      icon: '⛓️'
    },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-ink-900/30" />
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-12 h-px bg-gradient-to-r from-transparent to-geek-cyan/50" />
              <span className="text-geek-cyan text-2xl">⚡</span>
              <h2 className="text-3xl md:text-4xl font-medium">{t('title')}</h2>
              <span className="text-geek-cyan text-2xl">⚡</span>
              <span className="w-12 h-px bg-gradient-to-l from-transparent to-geek-cyan/50" />
            </div>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {items.map((item, index) => {
              const style = cardStyles[index];
              return (
                <div
                  key={index}
                  className={`group relative p-8 rounded-2xl bg-ink-900/60 border border-ink-700/50 ${style.border} ${style.glow} transition-all duration-300 hover:-translate-y-2`}
                >
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${style.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Number */}
                  <span className="absolute top-5 right-5 text-6xl font-mono text-ink-800/50 group-hover:text-ink-700/50 transition-colors select-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="text-4xl mb-4">
                      {style.icon}
                    </div>
                    
                    {/* Tag */}
                    <span className={`inline-block text-sm font-mono px-3 py-1.5 rounded-lg mb-4 border ${style.tagBg}`}>
                      {style.tag}
                    </span>
                    
                    {/* Role */}
                    <h3 className="text-lg md:text-xl font-medium text-paper-100 mb-3 pr-8 leading-snug">
                      {item.role}
                    </h3>
                    
                    {/* Position */}
                    <p className={`text-base font-mono ${style.accent}`}>
                      {item.position}
                    </p>
                  </div>

                  {/* Bottom Decoration */}
                  <div className={`absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent ${style.accent.replace('text-', 'via-')}/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
