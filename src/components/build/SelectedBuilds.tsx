'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useState, useEffect } from 'react';

interface Project {
  id: string;
  name: string;
  tagline: string;
  status: 'building' | 'shipped' | 'paused';
  tags: string[];
  links?: { type: string; url: string }[];
  description: string;
}

// 打字机效果 Hook
function useTypewriter(text: string, speed: number = 100, delay: number = 0) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setDisplayText('');
    const startTimer = setTimeout(() => {
      setIsTyping(true);
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, speed);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [text, speed, delay]);

  return { displayText, isTyping };
}

export default function SelectedBuilds() {
  const t = useTranslations('build');
  const projects = t.raw('selected.projects') as Project[] | undefined;
  const hasProjects = projects && projects.length > 0;
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const statusConfig = {
    building: { label: 'Now Building', color: 'bg-geek-green', textColor: 'text-geek-green', glow: 'shadow-geek-green/20' },
    shipped: { label: 'Shipped', color: 'bg-zen-gold', textColor: 'text-zen-gold', glow: 'shadow-zen-gold/20' },
    paused: { label: 'Paused', color: 'bg-paper-500', textColor: 'text-paper-500', glow: '' },
  };

  // 空状态的打字机效果
  const buildingText = useTypewriter('Building something awesome...', 80, 500);

  return (
    <section className="section relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-geek-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-geek-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-geek-cyan/50" />
            <span className="text-geek-cyan text-xl">◈</span>
            <h2 className="text-2xl md:text-3xl font-medium">
              {t('selected.title')}
            </h2>
            <span className="text-geek-cyan text-xl">◈</span>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-geek-cyan/50" />
          </div>
        </div>

        {hasProjects ? (
          /* Projects Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => {
              const isHovered = hoveredCard === project.id;
              const status = statusConfig[project.status];
              
              return (
                <div
                  key={project.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredCard(project.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Card */}
                  <div 
                    className={`relative p-6 rounded-2xl bg-ink-900/70 backdrop-blur-sm border transition-all duration-500 ${
                      isHovered 
                        ? 'border-geek-cyan/50 -translate-y-2 scale-[1.02]' 
                        : 'border-ink-700/50'
                    }`}
                    style={{
                      boxShadow: isHovered ? '0 20px 60px rgba(34, 211, 238, 0.15), 0 0 40px rgba(34, 211, 238, 0.1)' : 'none',
                    }}
                  >
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono ${status.textColor} bg-ink-800/90 border border-ink-700/50`}>
                        <span className={`w-2 h-2 rounded-full ${status.color} ${project.status === 'building' ? 'animate-pulse' : ''}`} />
                        {status.label}
                      </span>
                    </div>

                    {/* Project Image Placeholder / Icon */}
                    <div className="mb-4 aspect-video rounded-xl bg-ink-800/50 border border-ink-700/30 flex items-center justify-center overflow-hidden group-hover:border-geek-cyan/20 transition-colors">
                      <div className="text-6xl opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500">
                        🔧
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-medium text-paper-100 mb-2 group-hover:text-geek-cyan transition-colors">
                      {project.name}
                    </h3>
                    
                    <p className="text-sm text-zen-gold/80 mb-3 font-mono">
                      {project.tagline}
                    </p>

                    <p className="text-sm text-paper-400 leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-lg bg-ink-800/60 text-geek-purple/80 font-mono border border-ink-700/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    {project.links && project.links.length > 0 && (
                      <div className="flex gap-3 text-sm pt-4 border-t border-ink-700/30">
                        {project.links.map((link) => (
                          <a
                            key={link.type}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-paper-500 hover:text-geek-cyan transition-colors"
                          >
                            {link.type}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Corner decorations */}
                    <div className={`absolute top-3 left-3 w-4 h-4 border-l border-t transition-colors duration-300 ${isHovered ? 'border-geek-cyan/50' : 'border-ink-700/30'}`} />
                    <div className={`absolute bottom-3 right-3 w-4 h-4 border-r border-b transition-colors duration-300 ${isHovered ? 'border-geek-cyan/50' : 'border-ink-700/30'}`} />
                  </div>

                  {/* Index number */}
                  <div 
                    className={`absolute -top-2 -left-2 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 ${
                      isHovered ? 'bg-geek-cyan text-ink-900' : 'bg-ink-800 text-paper-500'
                    }`}
                    style={{ boxShadow: isHovered ? '0 0 20px rgba(34, 211, 238, 0.3)' : 'none' }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State - Enhanced */
          <div className="relative">
            {/* Terminal-style empty state */}
            <div className="rounded-2xl border border-ink-700/50 bg-ink-900/80 overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-ink-700/50 bg-ink-800/50">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-3 text-xs text-paper-500 font-mono">~/projects</span>
              </div>

              {/* Terminal Content */}
              <div className="p-8 md:p-12 font-mono text-center">
                {/* ASCII Art */}
                <div className="text-geek-cyan/60 text-xs md:text-sm mb-8 whitespace-pre leading-tight">
{`
    ██████╗ ██╗   ██╗██╗██╗     ██████╗ 
    ██╔══██╗██║   ██║██║██║     ██╔══██╗
    ██████╔╝██║   ██║██║██║     ██║  ██║
    ██╔══██╗██║   ██║██║██║     ██║  ██║
    ██████╔╝╚██████╔╝██║███████╗██████╔╝
    ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝ 
`}
                </div>

                {/* Typing effect */}
                <div className="mb-6">
                  <span className="text-geek-green text-lg">$ </span>
                  <span className="text-paper-200 text-lg">
                    {buildingText.displayText}
                    {buildingText.isTyping && (
                      <span className="inline-block w-2 h-5 bg-geek-cyan ml-1 animate-pulse" />
                    )}
                  </span>
                </div>

                {/* Status */}
                <div className="space-y-2 text-sm text-paper-400 mb-8">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-geek-green">✓</span>
                    <span>Ideas: loaded</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-geek-green">✓</span>
                    <span>Coffee: brewed</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-zen-gold animate-pulse">◉</span>
                    <span>Projects: initializing...</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-paper-400 mb-6 max-w-md mx-auto">
                  {t('selected.empty.description')}
                </p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/co-build" className="btn btn-primary">
                    <span>Co-build with me</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link href="/blog" className="btn btn-outline">
                    <span>Read my thoughts</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-geek-cyan/5 via-geek-purple/5 to-zen-gold/5 rounded-3xl blur-xl -z-10" />
          </div>
        )}
      </div>
    </section>
  );
}
