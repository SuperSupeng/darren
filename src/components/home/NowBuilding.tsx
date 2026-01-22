'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

// 模拟进度的 Hook
function useProgress(targetProgress: number, duration: number = 2000) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * targetProgress, targetProgress);
      setProgress(newProgress);
      if (elapsed < duration) {
        requestAnimationFrame(animate);
      }
    };
    const timer = setTimeout(() => requestAnimationFrame(animate), 500);
    return () => clearTimeout(timer);
  }, [targetProgress, duration]);
  
  return progress;
}

// 进度条组件
function ProcessBar({ label, progress, color, delay = 0 }: { 
  label: string; 
  progress: number; 
  color: string;
  delay?: number;
}) {
  const [show, setShow] = useState(false);
  const animatedProgress = useProgress(show ? progress : 0);
  
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-paper-300 font-mono group-hover:text-paper-100 transition-colors">
          {label}
        </span>
        <span className={`text-xs font-mono ${color}`}>
          {Math.round(animatedProgress)}%
        </span>
      </div>
      <div className="h-2 bg-ink-800 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out`}
          style={{ 
            width: `${animatedProgress}%`,
            background: `linear-gradient(90deg, ${color.includes('cyan') ? '#22d3ee' : color.includes('purple') ? '#a78bfa' : '#d4a856'}, ${color.includes('cyan') ? '#0891b2' : color.includes('purple') ? '#7c3aed' : '#a08040'})`,
            boxShadow: `0 0 10px ${color.includes('cyan') ? 'rgba(34, 211, 238, 0.5)' : color.includes('purple') ? 'rgba(167, 139, 250, 0.5)' : 'rgba(212, 168, 86, 0.5)'}`,
          }}
        />
      </div>
    </div>
  );
}

export default function NowBuilding() {
  const t = useTranslations('nowBuilding');
  const items = t.raw('items') as string[];
  
  const processData = [
    { progress: 75, color: 'text-geek-cyan' },
    { progress: 60, color: 'text-geek-purple' },
    { progress: 45, color: 'text-zen-gold' },
  ];

  return (
    <section className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950" />
      
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Terminal Window */}
          <div className="rounded-2xl overflow-hidden border border-ink-700/50 bg-ink-900/80 backdrop-blur-sm">
            {/* Terminal Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-ink-800/50 border-b border-ink-700/50">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs font-mono text-paper-400">darren@builder ~ / now-building</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-geek-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-geek-green"></span>
                </span>
                <span className="text-xs font-mono text-geek-green">LIVE</span>
              </div>
            </div>
            
            {/* Terminal Content */}
            <div className="p-6">
              {/* Command */}
              <div className="flex items-center gap-2 mb-6 font-mono text-sm">
                <span className="text-geek-green">➜</span>
                <span className="text-geek-cyan">~</span>
                <span className="text-paper-300">htop --filter=building</span>
                <span className="w-2 h-4 bg-paper-100 animate-pulse ml-1" />
              </div>

              {/* Section Title */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xl font-medium">{t('title')}</span>
                <span className="text-xs font-mono text-paper-400 px-2 py-0.5 rounded bg-ink-800">3 processes</span>
              </div>
              
              {/* Process List */}
              <div className="space-y-5">
                {items.map((item, index) => (
                  <div key={index} className="group">
                    {/* Process Header */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`w-6 h-6 flex items-center justify-center rounded text-xs font-mono ${
                        index === 0 ? 'bg-geek-cyan/20 text-geek-cyan' :
                        index === 1 ? 'bg-geek-purple/20 text-geek-purple' :
                        'bg-zen-gold/20 text-zen-gold'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 text-paper-200 group-hover:text-paper-100 transition-colors">
                        {item}
                      </span>
                      <span className="text-xs font-mono text-paper-500">PID {1000 + index}</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="ml-9">
                      <ProcessBar 
                        label="progress" 
                        progress={processData[index].progress} 
                        color={processData[index].color}
                        delay={index * 200}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Footer Stats */}
              <div className="mt-6 pt-4 border-t border-ink-700/50 flex items-center justify-between text-xs font-mono text-paper-500">
                <span>Tasks: 3 running</span>
                <span>Load: 0.42 0.38 0.35</span>
                <span>Uptime: 365 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
