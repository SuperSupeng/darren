'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, useCallback } from 'react';

// 服务配置
const serviceConfig: Record<string, string> = {
  activity: '🎯',
  kickstart: '🚀',
  aiSoftware: '🤖',
  aiHardware: '⚡',
  global: '🌏',
  overseas: '✈️',
  community: '👥',
  connect: '🔗',
};

export default function ServicesClient() {
  const t = useTranslations('services');
  const tPage = useTranslations('servicesPage');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const items = t.raw('items') as Array<{
    id: string;
    title: string;
    description: string;
  }>;

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, items.length]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, items.length]);

  const goToIndex = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, currentIndex]);

  const currentItem = items[currentIndex];
  const icon = serviceConfig[currentItem?.id] || '•';

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

        {/* Zen Circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div 
            className="absolute -inset-[200px] rounded-full border border-zen-gold/10 animate-rotate-slow"
            style={{ animationDuration: '50s' }}
          />
          <div 
            className="absolute -inset-[120px] rounded-full border border-ink-700/30 animate-rotate-slow"
            style={{ animationDirection: 'reverse', animationDuration: '35s' }}
          />
        </div>

        {/* Floating code elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none font-mono">
          <span className="absolute top-[15%] left-[10%] text-zen-gold/15 text-xl animate-float" style={{ animationDelay: '0s' }}>{'{ services }'}</span>
          <span className="absolute top-[25%] right-[15%] text-geek-cyan/15 text-lg animate-float" style={{ animationDelay: '1s' }}>{'<offer />'}</span>
          <span className="absolute bottom-[30%] left-[8%] text-geek-purple/15 text-lg animate-float" style={{ animationDelay: '2s' }}>{'( deliver )'}</span>
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
      
      {/* Spotlight Services */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_60%)]" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Main Spotlight Area */}
            <div className="relative min-h-[400px] md:min-h-[450px] flex items-center justify-center">
              {/* Content */}
              <div 
                key={currentIndex}
                className="text-center px-4 animate-fade-in-up"
              >
                {/* Number */}
                <div className="mb-6">
                  <span className="inline-block font-mono text-sm text-zen-gold tracking-widest">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                  </span>
                </div>
                
                {/* Icon */}
                <div className="text-7xl md:text-8xl mb-8">{icon}</div>
                
                {/* Title */}
                <h2 className="text-3xl md:text-5xl font-medium mb-6 text-white">
                  {currentItem?.title}
                </h2>
                
                {/* Description */}
                <p className="text-paper-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
                  {currentItem?.description}
                </p>
                
                {/* Navigation Buttons */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={goToPrev}
                    disabled={isAnimating}
                    className="group flex items-center gap-2 px-6 py-3 rounded-full
                      border border-ink-700 text-paper-400
                      hover:border-paper-400 hover:text-white
                      disabled:opacity-50 transition-all duration-300"
                  >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Prev
                  </button>
                  
                  <button
                    onClick={goToNext}
                    disabled={isAnimating}
                    className="group flex items-center gap-2 px-6 py-3 rounded-full
                      bg-zen-gold text-ink-950 font-medium
                      hover:bg-zen-gold/90
                      disabled:opacity-50 transition-all duration-300"
                  >
                    Next
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Dots Navigation */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-300
                    ${index === currentIndex 
                      ? 'w-8 bg-zen-gold' 
                      : 'bg-ink-700 hover:bg-ink-600'}
                  `}
                  aria-label={`Go to service ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Quick List - Collapsed view */}
            <div className="mt-16 pt-12 border-t border-ink-800">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {items.map((item, index) => {
                  const itemIcon = serviceConfig[item.id] || '•';
                  const isActive = index === currentIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => goToIndex(index)}
                      className={`
                        p-4 rounded-xl text-left transition-all duration-300
                        ${isActive 
                          ? 'bg-ink-800 border border-zen-gold/30' 
                          : 'bg-ink-900/50 border border-transparent hover:bg-ink-800/50'}
                      `}
                    >
                      <span className="text-xl mb-2 block">{itemIcon}</span>
                      <span className={`text-sm font-medium block truncate ${isActive ? 'text-white' : 'text-paper-400'}`}>
                        {item.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-paper-500 text-lg mb-4">Ready to collaborate?</p>
            <h2 className="text-3xl md:text-4xl font-medium mb-8">
              {tPage('cta.title')}
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="mailto:supeng842499467@gmail.com" 
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full
                  bg-white text-ink-950 font-medium text-lg
                  hover:bg-paper-200 transition-all duration-300"
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
