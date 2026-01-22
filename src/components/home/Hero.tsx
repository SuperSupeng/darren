'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useState, useEffect, useRef } from 'react';

// 文字解码效果 - 鼠标悬停时字符逐个"解密"显示
function DecodeText({ children, className = '', showCursor = false }: { children: string; className?: string; showCursor?: boolean }) {
  const [displayText, setDisplayText] = useState(children);
  const [isDecoding, setIsDecoding] = useState(false);
  
  // 更干净的字符集：只用字母和数字
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isDecoding) {
      let iteration = 0;
      intervalRef.current = setInterval(() => {
        setDisplayText(
          children
            .split('')
            .map((char, index) => {
              // 保留所有中文字符、标点和空格不变化
              if (/[\u4e00-\u9fa5\s，。、：；！？""''（）｜\/\-×]/.test(char)) return char;
              if (index < iteration) return children[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        // 更快锁定：每次锁定更多字符
        iteration += 0.8;
        if (iteration >= children.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setDisplayText(children);
          setIsDecoding(false);
        }
      }, 40);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isDecoding, children]);

  const handleMouseEnter = () => {
    if (!isDecoding) {
      setIsDecoding(true);
    }
  };

  return (
    <span
      className={`cursor-default transition-colors duration-300 ${isDecoding ? 'text-geek-cyan drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]' : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
      {showCursor && (
        <span className="inline-block w-[3px] h-[1em] bg-geek-cyan/80 ml-1 animate-pulse align-baseline relative top-[2px]" />
      )}
    </span>
  );
}

// 单个字符动画组件
function AnimatedChar({ char, delay }: { char: string; delay: number }) {
  return (
    <span
      className="inline-block transition-all duration-300 hover:text-zen-gold hover:scale-110 hover:-translate-y-1"
      style={{ 
        animationDelay: `${delay}ms`,
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  );
}

// 科幻风格标题组件
function CyberTitle({ text }: { text: string }) {
  const words = text.split(' ');
  
  return (
    <span className="relative inline-block">
      {/* Glitch layers */}
      <span className="cyber-glitch-1 absolute inset-0 text-geek-cyan opacity-0 hover:opacity-70" aria-hidden="true">
        {text}
      </span>
      <span className="cyber-glitch-2 absolute inset-0 text-geek-purple opacity-0 hover:opacity-70" aria-hidden="true">
        {text}
      </span>
      
      {/* Main text with character animation */}
      <span className="relative">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block group">
            {word.split('').map((char, charIndex) => {
              const isAI = word === 'AI';
              return (
                <span
                  key={charIndex}
                  className={`inline-block transition-all duration-200 hover:scale-110 ${
                    isAI 
                      ? 'text-gradient-gold hover:drop-shadow-[0_0_20px_rgba(212,168,86,0.8)]' 
                      : 'hover:text-geek-cyan hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]'
                  }`}
                  style={{
                    animationDelay: `${(wordIndex * 5 + charIndex) * 50}ms`,
                  }}
                >
                  {char}
                </span>
              );
            })}
            {wordIndex < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function Hero() {
  const t = useTranslations('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  // 跟踪鼠标位置实现光晕跟随效果
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink-950">
      {/* ===== Cyber Background Layers ===== */}
      
      {/* Base Grid */}
      <div className="absolute inset-0 bg-grid" />
      
      {/* Mouse-following glow */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
          background: 'radial-gradient(circle, rgba(212, 168, 86, 0.08) 0%, rgba(34, 211, 238, 0.03) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, rgba(212, 168, 86, 0.12) 0%, rgba(212, 168, 86, 0.04) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 60%)',
            filter: 'blur(40px)',
            animationDelay: '1s',
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.06) 0%, transparent 60%)',
            filter: 'blur(40px)',
            animationDelay: '2s',
          }}
        />
      </div>

      {/* Scanlines Effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
        }}
      />

      {/* Animated Circles - Zen Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div 
          className="absolute -inset-[300px] md:-inset-[400px] rounded-full border border-zen-gold/10 animate-rotate-slow"
          style={{ animationDuration: '40s' }}
        />
        <div 
          className="absolute -inset-[200px] md:-inset-[280px] rounded-full border border-geek-cyan/5 animate-rotate-slow"
          style={{ animationDirection: 'reverse', animationDuration: '30s' }}
        />
        <div 
          className="absolute -inset-[100px] md:-inset-[160px] rounded-full border border-zen-gold/5 animate-pulse-glow"
        />
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none font-mono">
        <span className="absolute top-[15%] left-[8%] text-geek-cyan/20 text-2xl animate-float" style={{ animationDelay: '0s' }}>{'<build>'}</span>
        <span className="absolute top-[20%] right-[12%] text-geek-purple/20 text-xl animate-float" style={{ animationDelay: '1s' }}>{'{ ship }'}</span>
        <span className="absolute bottom-[35%] left-[15%] text-zen-gold/20 text-lg animate-float" style={{ animationDelay: '2s' }}>{'( create )'}</span>
        <span className="absolute bottom-[25%] right-[8%] text-geek-cyan/20 text-2xl animate-float" style={{ animationDelay: '0.5s' }}>{'[ deploy ]'}</span>
        <span className="absolute top-[45%] left-[5%] text-ink-700/30 text-sm animate-float" style={{ animationDelay: '1.5s' }}>{'// TODO: change the world'}</span>
        <span className="absolute top-[60%] right-[5%] text-geek-green/20 text-sm animate-float" style={{ animationDelay: '2.5s' }}>{'=> success'}</span>
      </div>

      {/* Corner Decorations - Cyber UI */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-zen-gold/20 pointer-events-none" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-geek-cyan/20 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-geek-cyan/20 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-zen-gold/20 pointer-events-none" />

      {/* ===== Content ===== */}
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Pre-title Tag */}
          <div className="inline-block mb-8 opacity-0 animate-fade-in-up">
            <div className="relative">
              <span className="code-tag inline-flex items-center gap-2 pr-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-geek-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-geek-green shadow-[0_0_10px_rgba(74,222,128,0.8)]"></span>
                </span>
                <DecodeText className="text-geek-cyan">building...</DecodeText>
              </span>
              {/* Decorative line */}
              <div className="absolute -right-20 top-1/2 w-16 h-px bg-gradient-to-r from-geek-cyan/50 to-transparent" />
            </div>
          </div>

          {/* Main Title with Cyber Effect */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-6 opacity-0 animate-fade-in-up animation-delay-100 leading-tight relative">
            {/* Horizontal lines decoration */}
            <span className="absolute -left-4 md:-left-8 top-1/2 w-2 md:w-4 h-px bg-zen-gold/50" />
            <span className="absolute -right-4 md:-right-8 top-1/2 w-2 md:w-4 h-px bg-zen-gold/50" />
            
            <CyberTitle text={t('title')} />
          </h1>

          {/* Subtitle with typing effect style */}
          <div className="mb-10 opacity-0 animate-fade-in-up animation-delay-200">
            <p className="text-lg md:text-xl text-paper-300/90 leading-relaxed max-w-2xl mx-auto relative">
              <span className="absolute -left-6 top-1 text-geek-cyan/40 font-mono text-sm hidden md:inline">{'>'}</span>
              <DecodeText showCursor>{t('subtitle')}</DecodeText>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 opacity-0 animate-fade-in-up animation-delay-300">
            <Link href="/co-build" className="btn btn-primary group relative overflow-hidden">
              <span className="relative z-10">{t('cta.coBuild')}</span>
              <svg 
                className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              {/* Animated border */}
              <span className="absolute inset-0 border border-zen-gold/50 rounded-md animate-pulse" />
            </Link>
            <Link href="/build" className="btn btn-outline group">
              <span>{t('cta.viewBuild')}</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </Link>
            <Link href="/about" className="btn btn-ghost group">
              <span>{t('cta.contact')}</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>

          {/* Tagline with cyber style */}
          <div className="opacity-0 animate-fade-in-up animation-delay-400">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink-900/50 border border-ink-700/50 backdrop-blur-sm">
              <span className="w-1 h-1 bg-zen-gold rounded-full animate-pulse" />
              <p className="text-sm text-paper-400/80 font-mono tracking-wide">
                {t('tagline').split('｜').map((tag, i, arr) => (
                  <span key={i} className="group inline-flex items-center">
                    <span className="transition-all duration-300 hover:text-zen-gold cursor-default hover:drop-shadow-[0_0_8px_rgba(212,168,86,0.5)]">
                      {tag}
                    </span>
                    {i < arr.length - 1 && <span className="mx-3 w-1 h-1 rounded-full bg-ink-600" />}
                  </span>
                ))}
              </p>
              <span className="w-1 h-1 bg-geek-cyan rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-up animation-delay-500">
        <div className="flex flex-col items-center gap-3 text-paper-400/60 group cursor-pointer hover:text-geek-cyan transition-colors">
          <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
          <div className="relative w-6 h-10 rounded-full border border-current flex justify-center overflow-hidden">
            <div className="w-1 h-2 bg-current rounded-full mt-2 animate-bounce" />
            {/* Scan line effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-current/10 to-transparent animate-scan" />
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink-950 to-transparent pointer-events-none" />

      {/* Inline Styles for Cyber Effects */}
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        .cyber-glitch-1 {
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          transform: translate(-2px, -2px);
          animation: glitch-1 2.5s infinite linear alternate-reverse;
        }
        .cyber-glitch-2 {
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
          transform: translate(2px, 2px);
          animation: glitch-2 3s infinite linear alternate-reverse;
        }
        @keyframes glitch-1 {
          0%, 100% { transform: translate(-2px, -2px); opacity: 0; }
          20% { transform: translate(2px, 0); opacity: 0.7; }
          40% { transform: translate(-1px, 1px); opacity: 0; }
          60% { transform: translate(1px, -1px); opacity: 0.7; }
          80% { transform: translate(-2px, 2px); opacity: 0; }
        }
        @keyframes glitch-2 {
          0%, 100% { transform: translate(2px, 2px); opacity: 0; }
          25% { transform: translate(-2px, 0); opacity: 0.7; }
          50% { transform: translate(1px, -1px); opacity: 0; }
          75% { transform: translate(-1px, 1px); opacity: 0.7; }
        }
      `}</style>
    </section>
  );
}
