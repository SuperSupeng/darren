'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface HelpScenario {
  title: string;
  description: string;
  action: string;
  icon: string;
  color: string;
}

const scenarioConfig: Record<string, { accent: string; bg: string; glow: string }> = {
  product: { accent: 'text-geek-cyan', bg: 'from-geek-cyan/10', glow: 'rgba(34, 211, 238, 0.15)' },
  event: { accent: 'text-zen-gold', bg: 'from-zen-gold/10', glow: 'rgba(212, 168, 86, 0.15)' },
  connect: { accent: 'text-geek-purple', bg: 'from-geek-purple/10', glow: 'rgba(167, 139, 250, 0.15)' },
  learn: { accent: 'text-geek-green', bg: 'from-geek-green/10', glow: 'rgba(74, 222, 128, 0.15)' },
};

export default function WhatICanHelp() {
  const t = useTranslations('about.whatICanHelp');
  const scenarios = t.raw('scenarios') as HelpScenario[];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212, 168, 86, 0.08) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />
      
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-ink-800/50 border border-zen-gold/30 mb-6">
              <span className="text-sm font-mono text-zen-gold">💡 Core Value</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6">
              {t('title')}
            </h2>
            
            <p className="text-lg md:text-xl text-paper-300 max-w-2xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          {/* Scenarios Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {scenarios.map((scenario, index) => {
              const config = scenarioConfig[scenario.color] || scenarioConfig.product;
              
              return (
                <div
                  key={index}
                  className="group relative p-8 rounded-2xl bg-ink-900/60 border border-ink-700/50 hover:border-ink-600 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    boxShadow: '0 0 0 rgba(0,0,0,0)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 20px 60px ${config.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 rgba(0,0,0,0)';
                  }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${config.bg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="text-5xl mb-5">
                      {scenario.icon}
                    </div>
                    
                    {/* Title */}
                    <h3 className={`text-xl md:text-2xl font-medium mb-3 transition-colors duration-300 group-hover:${config.accent}`}>
                      {scenario.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-paper-400 leading-relaxed mb-4">
                      {scenario.description}
                    </p>
                    
                    {/* Action */}
                    <div className={`inline-flex items-center gap-2 text-sm font-medium ${config.accent} group-hover:gap-3 transition-all`}>
                      <span>{scenario.action}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Corner decoration */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-ink-700/50 group-hover:border-ink-600 transition-colors" />
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-paper-400 mb-6">
              {t('cta.description')}
            </p>
            <Link href="/services" className="btn btn-outline group">
              <span>{t('cta.button')}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
