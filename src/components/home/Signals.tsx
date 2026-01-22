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
      border: 'hover:border-geek-cyan/30', 
      accent: 'text-geek-cyan',
      tag: 'AI Builder',
      tagBg: 'bg-geek-cyan/10 text-geek-cyan',
      glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.3)]'
    },
    { 
      bg: 'from-geek-purple/10 to-transparent', 
      border: 'hover:border-geek-purple/30', 
      accent: 'text-geek-purple',
      tag: 'Open Source',
      tagBg: 'bg-geek-purple/10 text-geek-purple',
      glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(167,139,250,0.3)]'
    },
    { 
      bg: 'from-zen-gold/10 to-transparent', 
      border: 'hover:border-zen-gold/30', 
      accent: 'text-zen-gold',
      tag: 'Web3 × AI',
      tagBg: 'bg-zen-gold/10 text-zen-gold',
      glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(212,168,86,0.3)]'
    },
  ];

  return (
    <section className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-ink-900/30" />
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-geek-cyan text-xl">⚡</span>
            <h2 className="text-2xl md:text-3xl font-medium">{t('title')}</h2>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-5">
            {items.map((item, index) => {
              const style = cardStyles[index];
              return (
                <div
                  key={index}
                  className={`group relative p-6 rounded-2xl bg-ink-900/50 border border-ink-700/50 ${style.border} ${style.glow} transition-all duration-300 hover:-translate-y-1`}
                >
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${style.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Number */}
                  <span className="absolute top-4 right-4 text-5xl font-mono text-ink-800 group-hover:text-ink-700 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="relative z-10">
                    {/* Tag */}
                    <span className={`inline-block text-xs font-mono px-2 py-1 rounded-md mb-3 ${style.tagBg}`}>
                      {style.tag}
                    </span>
                    
                    {/* Role */}
                    <h3 className="font-medium text-paper-100 mb-2 pr-8 leading-tight">
                      {item.role}
                    </h3>
                    
                    {/* Position */}
                    <p className={`text-sm font-mono ${style.accent}`}>
                      {item.position}
                    </p>
                  </div>

                  {/* Bottom Decoration */}
                  <div className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent ${style.accent.replace('text-', 'via-')}/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
