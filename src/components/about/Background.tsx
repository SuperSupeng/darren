'use client';

import { useTranslations } from 'next-intl';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  tags?: string[];
  links?: { text: string; url: string }[];
}

export default function Background() {
  const t = useTranslations('about');
  const items = t.raw('background.items') as TimelineItem[];

  return (
    <section className="section relative">
      <div className="container max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-zen-gold/50" />
            <span className="text-zen-gold text-xl">⟡</span>
            <h2 className="text-2xl md:text-3xl font-medium">
              {t('background.title')}
            </h2>
            <span className="text-zen-gold text-xl">⟡</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-zen-gold/50" />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-zen-gold/50 via-ink-700/50 to-transparent md:-translate-x-px" />

          <div className="space-y-8 md:space-y-12">
            {items.map((item, index) => (
              <div 
                key={index}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-0 md:left-1/2 w-3 h-3 -translate-x-1 md:-translate-x-1.5 rounded-full bg-ink-900 border-2 border-zen-gold/70 z-10">
                  <div className="absolute inset-0 rounded-full bg-zen-gold/30 animate-ping" style={{ animationDuration: '3s' }} />
                </div>

                {/* Year Badge - Mobile */}
                <div className="md:hidden ml-6 mb-2">
                  <span className="text-xs font-mono text-zen-gold bg-ink-800/80 px-2 py-1 rounded">
                    {item.year}
                  </span>
                </div>

                {/* Content Card */}
                <div className={`ml-6 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                }`}>
                  <div className="group relative p-5 rounded-xl bg-ink-900/50 border border-ink-700/50 hover:border-zen-gold/30 transition-all duration-300">
                    {/* Year Badge - Desktop */}
                    <div className={`hidden md:block absolute top-4 ${
                      index % 2 === 0 ? '-right-20' : '-left-20'
                    } text-xs font-mono text-zen-gold bg-ink-800/80 px-2 py-1 rounded`}>
                      {item.year}
                    </div>

                    <h3 className="text-lg font-medium text-paper-100 mb-2 group-hover:text-zen-gold transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm text-paper-400 leading-relaxed mb-3">
                      {item.description}
                    </p>

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="text-xs px-2 py-0.5 rounded bg-ink-800/60 text-geek-cyan/80 font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    {item.links && item.links.length > 0 && (
                      <div className="flex flex-wrap gap-3 text-xs">
                        {item.links.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-paper-500 hover:text-geek-cyan transition-colors underline underline-offset-2"
                          >
                            {link.text} →
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Hover glow */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-zen-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
