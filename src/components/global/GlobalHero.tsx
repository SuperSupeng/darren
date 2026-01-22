'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

// 城市坐标（相对于地球的百分比位置）
const cityPositions = [
  { id: 'shanghai', name: '上海', lat: 31.2, lng: 121.5, color: '#D4A856' },
  { id: 'beijing', name: '北京', lat: 39.9, lng: 116.4, color: '#D4A856' },
  { id: 'shenzhen', name: '深圳', lat: 22.5, lng: 114.1, color: '#D4A856' },
  { id: 'chiangmai', name: 'Chiang Mai', lat: 18.8, lng: 98.9, color: '#22D3EE' },
  { id: 'bangkok', name: 'Bangkok', lat: 13.8, lng: 100.5, color: '#22D3EE' },
];

// 连接线（城市之间的连接）
const connections = [
  ['shanghai', 'beijing'],
  ['shanghai', 'shenzhen'],
  ['shanghai', 'chiangmai'],
  ['shanghai', 'bangkok'],
  ['chiangmai', 'bangkok'],
];

export default function GlobalHero() {
  const t = useTranslations('global');
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.3) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-ink-950">
      {/* Star Field Background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Globe */}
          <div className="relative flex-shrink-0">
            {/* Globe Container */}
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
              {/* Outer Glow */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  transform: 'scale(1.5)',
                }}
              />
              
              {/* Globe Body */}
              <div 
                className="absolute inset-4 rounded-full overflow-hidden"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                    radial-gradient(circle at 70% 70%, rgba(34, 211, 238, 0.2) 0%, transparent 50%),
                    linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)
                  `,
                  boxShadow: `
                    inset -20px -20px 60px rgba(0, 0, 0, 0.5),
                    inset 10px 10px 40px rgba(59, 130, 246, 0.1),
                    0 0 80px rgba(59, 130, 246, 0.2)
                  `,
                }}
              >
                {/* Grid Lines - Latitude */}
                {[20, 40, 60, 80].map((lat) => (
                  <div
                    key={`lat-${lat}`}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-geek-blue/20"
                    style={{
                      width: `${lat}%`,
                      height: `${lat}%`,
                    }}
                  />
                ))}
                
                {/* Grid Lines - Longitude (rotating) */}
                <div 
                  className="absolute inset-0"
                  style={{ transform: `rotateY(${rotation}deg)` }}
                >
                  {[0, 30, 60, 90, 120, 150].map((lng) => (
                    <div
                      key={`lng-${lng}`}
                      className="absolute left-1/2 top-0 bottom-0 w-px bg-geek-blue/10 origin-center"
                      style={{ transform: `rotateY(${lng}deg)` }}
                    />
                  ))}
                </div>

                {/* City Dots */}
                {cityPositions.map((city) => {
                  // 简化的投影计算
                  const x = 50 + (city.lng - 110) * 0.8;
                  const y = 50 - (city.lat - 25) * 1.2;
                  const isActive = activeCity === city.id;
                  
                  return (
                    <div
                      key={city.id}
                      className="absolute cursor-pointer transition-all duration-300"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      onMouseEnter={() => setActiveCity(city.id)}
                      onMouseLeave={() => setActiveCity(null)}
                    >
                      {/* Pulse ring */}
                      <div 
                        className={`absolute inset-0 rounded-full animate-ping ${isActive ? 'opacity-100' : 'opacity-50'}`}
                        style={{ 
                          backgroundColor: city.color,
                          width: isActive ? '24px' : '16px',
                          height: isActive ? '24px' : '16px',
                          margin: isActive ? '-8px' : '-4px',
                        }}
                      />
                      {/* Core dot */}
                      <div 
                        className={`relative rounded-full transition-all duration-300 ${isActive ? 'w-4 h-4' : 'w-2 h-2'}`}
                        style={{ backgroundColor: city.color }}
                      />
                      {/* Label */}
                      {isActive && (
                        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-ink-900/90 px-2 py-1 rounded text-xs text-paper-200 border border-ink-700">
                          {city.name}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Orbit Ring 1 */}
              <div 
                className="absolute inset-0 rounded-full border border-dashed border-geek-blue/20 animate-rotate-slow"
                style={{ animationDuration: '30s' }}
              />
              
              {/* Orbit Ring 2 */}
              <div 
                className="absolute -inset-6 rounded-full border border-zen-gold/10 animate-rotate-slow"
                style={{ animationDuration: '45s', animationDirection: 'reverse' }}
              />

              {/* Orbit Ring 3 */}
              <div 
                className="absolute -inset-12 rounded-full border border-ink-700/30 animate-rotate-slow"
                style={{ animationDuration: '60s' }}
              />

              {/* Floating Satellite */}
              <div 
                className="absolute w-2 h-2 bg-zen-gold rounded-full animate-orbit"
                style={{ 
                  top: '50%',
                  left: '50%',
                  transformOrigin: '0 0',
                }}
              />
            </div>

            {/* Connection Status */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-paper-400 font-mono bg-ink-900/80 px-3 py-1.5 rounded-full border border-ink-700/50">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>5 nodes connected</span>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
              <span className="text-geek-blue">{t('hero.title')}</span>
            </h1>

            {/* Subtitle */}
            <div className="text-lg md:text-xl text-paper-300 leading-relaxed max-w-xl space-y-3 mb-6">
              <p>{t('hero.subtitle1')}</p>
              <p className="text-paper-400">{t('hero.subtitle2')}</p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-6">
              {[
                { value: '5', label: 'City Nodes' },
                { value: '3', label: 'Countries' },
                { value: '∞', label: 'Possibilities' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-mono text-zen-gold">{stat.value}</div>
                  <div className="text-xs text-paper-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Note */}
            <p className="text-sm text-paper-500 italic">
              {t('hero.note')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
