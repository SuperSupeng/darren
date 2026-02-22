'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

export default function ServicesClient() {
  const t = useTranslations('services');
  const tPage = useTranslations('servicesPage');
  
  // 核心服务 - 全球化战略与咨询服务 和 硬件供应链战略咨询服务
  const coreServices = [
    {
      id: 'globalStrategy',
      title: t('items.globalStrategy.title'),
      description: t('items.globalStrategy.description'),
      icon: '🌍',
      color: 'from-zen-gold/20 to-amber-500/10',
      accent: 'text-zen-gold',
      borderColor: 'border-zen-gold/30'
    },
    {
      id: 'hardwareSupplyChain',
      title: t('items.hardwareSupplyChain.title'),
      description: t('items.hardwareSupplyChain.description'),
      icon: '🏭',
      color: 'from-geek-cyan/20 to-blue-500/10',
      accent: 'text-geek-cyan',
      borderColor: 'border-geek-cyan/30'
    }
  ];

  // 产品驱动的服务
  const productServices = [
    {
      id: 'kickstart',
      title: t('items.kickstart.title'),
      description: t('items.kickstart.description'),
      icon: '🚀'
    },
    {
      id: 'aiSoftware',
      title: t('items.aiSoftware.title'),
      description: t('items.aiSoftware.description'),
      icon: '🤖'
    },
    {
      id: 'community',
      title: t('items.community.title'),
      description: t('items.community.description'),
      icon: '👥'
    },
    {
      id: 'connect',
      title: t('items.connect.title'),
      description: t('items.connect.description'),
      icon: '🔗'
    }
  ];

  return (
    <main className="min-h-screen bg-ink-950">
      {/* Hero */}
      <section className="relative pt-28 pb-8 md:pt-36 md:pb-12 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        
        {/* Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full animate-pulse-glow"
            style={{
              background: 'radial-gradient(circle, rgba(212, 168, 86, 0.1) 0%, transparent 60%)',
              filter: 'blur(60px)',
            }}
          />
          <div 
            className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full animate-float"
            style={{
              background: 'radial-gradient(circle, rgba(34, 211, 238, 0.06) 0%, transparent 60%)',
              filter: 'blur(40px)',
            }}
          />
        </div>

        {/* Content */}
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Icon */}
            <div className="mb-6 opacity-0 animate-fade-in-up">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-zen-gold/20 to-amber-500/10 border border-ink-700/50">
                <span className="text-3xl">💼</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4 opacity-0 animate-fade-in-up animation-delay-100">
              <span className="text-gradient-gold">{tPage('hero.title')}</span>
            </h1>
            <p className="text-paper-400 text-lg md:text-xl leading-relaxed opacity-0 animate-fade-in-up animation-delay-200">
              {tPage('hero.subtitle')}
            </p>
          </div>
        </div>
        
        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-ink-950 to-transparent pointer-events-none" />
      </section>
      
      {/* Core Consulting Services */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_60%)]" />
        
        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium mb-4 text-white">
                Core Consulting Services
              </h2>
              <p className="text-paper-400 max-w-2xl mx-auto">
                Strategic consulting in high-value, information-differentiated industries
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {coreServices.map((service, index) => (
                <div 
                  key={service.id}
                  className={`group relative p-8 rounded-2xl bg-ink-900/60 border border-ink-700/50 ${service.borderColor} hover:border-geek-cyan/40 transition-all duration-300 hover:-translate-y-2`}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className="text-5xl mb-6">
                      {service.icon}
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-medium text-paper-100 mb-4 leading-snug">
                      {service.title}
                    </h3>
                    
                    <p className={`text-paper-400 leading-relaxed mb-6`}>
                      {service.description}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-ink-800 ${service.accent}`}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                      <span className={`${service.accent} text-sm font-medium`}>Strategic Consultation</span>
                    </div>
                  </div>
                  
                  {/* Bottom Decoration */}
                  <div className={`absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent ${service.accent.replace('text-', 'via-')}/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Product-Driven Services */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium mb-4 text-white">
                Product-Driven Solutions
              </h2>
              <p className="text-paper-400 max-w-2xl mx-auto">
                Additional services delivered through our proprietary products and platforms
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {productServices.map((service) => (
                <div 
                  key={service.id}
                  className="group p-6 rounded-xl bg-ink-900/50 border border-ink-700/50 hover:border-ink-600/50 transition-all duration-300"
                >
                  <div className="text-3xl mb-4">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-lg font-medium text-paper-100 mb-2">
                    {service.title}
                  </h3>
                  
                  <p className="text-paper-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-paper-500 text-lg mb-4">Ready to leverage strategic insights?</p>
            <h2 className="text-3xl md:text-4xl font-medium mb-8">
              {tPage('cta.title')}
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="mailto:supeng842499467@gmail.com" 
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full
                  bg-zen-gold text-ink-950 font-medium text-lg
                  hover:bg-zen-gold/90 transition-all duration-300"
              >
                {tPage('cta.button')}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <Link 
                href="/build"
                className="text-paper-400 hover:text-white transition-colors"
              >
                {tPage('cta.viewWork') || 'View past work →'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
