'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface ProjectType {
  id: string;
  name: string;
  tagline: string;
  status: string;
  tags: string[];
  links: Array<{ type: string; url: string }>;
  description: string;
  url: string;
  image: string;
}

interface LogEntryType {
  date: string;
  content: string;
}

// 状态标签配色
const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  shipped: { bg: 'bg-geek-green/10', text: 'text-geek-green', border: 'border-geek-green/30' },
  building: { bg: 'bg-geek-cyan/10', text: 'text-geek-cyan', border: 'border-geek-cyan/30' },
  planning: { bg: 'bg-zen-gold/10', text: 'text-zen-gold', border: 'border-zen-gold/30' },
};

export default function BuildPage() {
  const t = useTranslations('build');
  const projects = t.raw('selected.projects') as ProjectType[];
  const logEntries = t.raw('log.entries') as LogEntryType[];

  return (
    <main className="min-h-screen bg-ink-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        
        {/* Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full animate-pulse-glow"
            style={{
              background: 'radial-gradient(circle, rgba(212, 168, 86, 0.1) 0%, transparent 60%)',
              filter: 'blur(60px)',
            }}
          />
          <div 
            className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full animate-float"
            style={{
              background: 'radial-gradient(circle, rgba(34, 211, 238, 0.06) 0%, transparent 60%)',
              filter: 'blur(40px)',
            }}
          />
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-zen-gold/20" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-geek-cyan/20" />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-800/50 border border-ink-700/50 mb-6">
              <span className="w-2 h-2 bg-zen-gold rounded-full animate-pulse" />
              <span className="text-sm font-mono text-zen-gold">products</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
              {t('hero.title')}
            </h1>
            
            <p className="text-xl text-paper-300/90 leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink-950 to-transparent pointer-events-none" />
      </section>

      {/* Selected Projects */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950" />
        
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-10">
              <span className="text-zen-gold text-xl">◈</span>
              <h2 className="text-2xl md:text-3xl font-medium">{t('selected.title')}</h2>
            </div>

            {projects && projects.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project) => {
                  const status = statusColors[project.status] || statusColors.building;
                  return (
                    <a
                      key={project.id}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative rounded-2xl overflow-hidden border border-ink-700/50 bg-ink-900/50 hover:border-ink-600/50 hover:-translate-y-1 transition-all duration-300"
                    >
                      {/* Project Image */}
                      <div className="relative aspect-[16/9] overflow-hidden bg-ink-800">
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
                        
                        {/* Status Badge */}
                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono border ${status.bg} ${status.text} ${status.border}`}>
                          {project.status}
                        </div>
                      </div>
                      
                      {/* Project Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-medium text-paper-100 group-hover:text-zen-gold transition-colors mb-2">
                          {project.name}
                        </h3>
                        <p className="text-paper-400 text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="px-2.5 py-1 bg-ink-800/50 border border-ink-700/50 rounded-lg text-xs text-paper-500">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Hover Arrow */}
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-ink-800/80 border border-ink-700/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-4 h-4 text-paper-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </a>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 rounded-2xl bg-ink-900/30 border border-ink-700/50">
                <div className="text-4xl mb-4">🔧</div>
                <h3 className="text-xl font-medium mb-2 text-paper-300">{t('selected.empty.title')}</h3>
                <p className="text-paper-500 mb-4 max-w-md mx-auto">{t('selected.empty.description')}</p>
                <p className="text-sm text-geek-cyan">{t('selected.empty.cta')}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Build Log - Terminal Style */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-ink-900/30" />
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-geek-cyan font-mono text-lg">{'$'}</span>
              <h2 className="text-2xl md:text-3xl font-medium">{t('log.title')}</h2>
            </div>
            <p className="text-paper-400 mb-8">{t('log.description')}</p>

            {/* Terminal Window */}
            <div className="rounded-2xl bg-ink-950 border border-ink-700/50 overflow-hidden shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-ink-900/80 border-b border-ink-700/50">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-3 text-xs font-mono text-paper-500">~/darren/build-log</span>
              </div>
              
              {/* Terminal Content */}
              <div className="p-5 font-mono text-sm space-y-4 max-h-[400px] overflow-y-auto">
                {logEntries.map((entry, index) => (
                  <div key={index} className="group">
                    {/* Command Line */}
                    <div className="flex items-start gap-2">
                      <span className="text-geek-green select-none">➜</span>
                      <span className="text-geek-cyan select-none">~</span>
                      <span className="text-paper-500 select-none">git log --date=</span>
                      <span className="text-zen-gold">{entry.date}</span>
                    </div>
                    {/* Output */}
                    <div className="mt-1 pl-6 text-paper-300 group-hover:text-paper-100 transition-colors">
                      <span className="text-paper-500 select-none">│ </span>
                      {entry.content}
                    </div>
                  </div>
                ))}
                
                {/* Cursor Line */}
                <div className="flex items-center gap-2">
                  <span className="text-geek-green">➜</span>
                  <span className="text-geek-cyan">~</span>
                  <span className="w-2 h-4 bg-paper-300 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/50 to-transparent" />
        
        {/* Glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212, 168, 86, 0.06) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
        
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-paper-400 mb-6 text-lg">
              {t('hero.cta')}
            </p>
            <a 
              href="mailto:supeng842499467@gmail.com"
              className="btn btn-primary inline-flex"
            >
              <span>{t('cta') || '联系我'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
