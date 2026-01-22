'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

// 动画计数器 Hook
function useCountUp(end: number, duration: number = 2000, delay: number = 0) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const startTime = Date.now() + delay;
    let animationFrame: number;
    
    const animate = () => {
      const now = Date.now();
      if (now < startTime) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }
      
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, delay]);
  
  return count;
}

export default function ImpactHero() {
  const t = useTranslations('impact');
  
  // 统计数据动画
  const peopleReached = useCountUp(1000, 2000, 500);
  const eventsHosted = useCountUp(30, 1500, 700);
  const citiesCovered = useCountUp(5, 1200, 900);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-ink-950">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, rgba(122, 158, 126, 0.15) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(74, 222, 128, 0.1) 0%, transparent 60%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['💚', '🌱', '✨', '🤝', '🌍'].map((emoji, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-20 animate-float"
            style={{
              left: `${10 + i * 20}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${5 + i * 0.5}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="mb-6 opacity-0 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-zen-bamboo/20 to-geek-green/10 border border-ink-700/50 relative">
              <span className="text-4xl">💚</span>
              <div className="absolute inset-0 rounded-2xl border border-dashed border-zen-bamboo/20 animate-rotate-slow" style={{ animationDuration: '15s' }} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 opacity-0 animate-fade-in-up animation-delay-100">
            <span className="text-zen-bamboo">{t('hero.title')}</span>
          </h1>

          {/* Subtitle */}
          <div className="text-lg md:text-xl text-paper-300 leading-relaxed max-w-2xl mx-auto opacity-0 animate-fade-in-up animation-delay-200 space-y-2 mb-10">
            <p>{t('hero.subtitle1')}</p>
            <p className="text-paper-400">{t('hero.subtitle2')}</p>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto opacity-0 animate-fade-in-up animation-delay-300">
            {[
              { value: peopleReached, suffix: '+', label: 'People Reached', color: '#7A9E7E' },
              { value: eventsHosted, suffix: '+', label: 'Events', color: '#4ADE80' },
              { value: citiesCovered, suffix: '', label: 'Cities', color: '#22D3EE' },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="relative p-4 rounded-xl bg-ink-900/50 border border-ink-700/50 group hover:border-zen-bamboo/30 transition-all duration-300"
              >
                {/* Glow on hover */}
                <div 
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ 
                    background: `radial-gradient(circle at center, ${stat.color}10, transparent 70%)`,
                  }}
                />
                
                <div className="relative z-10">
                  <div 
                    className="text-3xl md:text-4xl font-bold font-mono mb-1"
                    style={{ color: stat.color }}
                  >
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-xs text-paper-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ink-800 rounded-b-xl overflow-hidden">
                  <div 
                    className="h-full transition-all duration-2000 ease-out"
                    style={{ 
                      width: `${Math.min((stat.value / (i === 0 ? 1000 : i === 1 ? 30 : 5)) * 100, 100)}%`,
                      backgroundColor: stat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-ink-950 to-transparent pointer-events-none" />
    </section>
  );
}
