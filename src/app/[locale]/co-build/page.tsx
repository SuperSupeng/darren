import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'coBuild' });
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

// Hero Section
function HeroSection() {
  const t = useTranslations('coBuild.hero');
  
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-ink-950" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Gradient Orb */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212, 168, 86, 0.1) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
      
      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-zen-gold/20" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-geek-cyan/20" />

      <div className="container relative z-10">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-800/50 border border-ink-700/50 mb-6">
            <span className="w-2 h-2 bg-zen-gold rounded-full animate-pulse" />
            <span className="text-sm font-mono text-zen-gold">co-build</span>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
            {t('title')}
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-paper-300/90 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </div>
    </section>
  );
}

// What We Build Section
function WhatWeBuildSection() {
  const t = useTranslations('coBuild.whatWeBuild');
  const items = t.raw('items') as Array<{ title: string; description: string }>;
  
  const icons = [
    // AI × Hardware
    <svg key="hw" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>,
    // AI Tools
    <svg key="ai" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>,
    // Creator Tools
    <svg key="creator" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>,
    // Buildathon
    <svg key="event" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>,
    // Web3
    <svg key="web3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>,
  ];

  const colors = [
    'text-geek-cyan border-geek-cyan/20 bg-geek-cyan/5',
    'text-geek-purple border-geek-purple/20 bg-geek-purple/5',
    'text-zen-gold border-zen-gold/20 bg-zen-gold/5',
    'text-zen-bamboo border-zen-bamboo/20 bg-zen-bamboo/5',
    'text-geek-blue border-geek-blue/20 bg-geek-blue/5',
  ];

  return (
    <section className="section relative">
      <div className="absolute inset-0 bg-ink-900/50" />
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium mb-10 flex items-center gap-3">
            <span className="text-zen-gold font-mono">{'>'}</span>
            {t('title')}
          </h2>
          
          <div className="grid gap-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="group flex items-start gap-4 p-5 rounded-xl bg-ink-900/50 border border-ink-700/50 hover:border-ink-600 transition-all duration-300"
              >
                <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl border ${colors[index]}`}>
                  {icons[index]}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-paper-100 mb-1">{item.title}</h3>
                  <p className="text-sm text-paper-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// How We Co-build Section
function HowWeCoBuildSection() {
  const t = useTranslations('coBuild.howWeCoBuild');
  const modes = t.raw('modes') as Array<{
    id: string;
    title: string;
    suitable: string;
    goal: string;
    outputs: string[];
  }>;

  const modeColors = [
    { border: 'border-geek-cyan/30', glow: 'rgba(34, 211, 238, 0.1)', tag: 'bg-geek-cyan/10 text-geek-cyan' },
    { border: 'border-geek-purple/30', glow: 'rgba(167, 139, 250, 0.1)', tag: 'bg-geek-purple/10 text-geek-purple' },
    { border: 'border-zen-gold/30', glow: 'rgba(212, 168, 86, 0.1)', tag: 'bg-zen-gold/10 text-zen-gold' },
  ];

  return (
    <section className="section relative">
      <div className="absolute inset-0 bg-ink-950" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium mb-10 text-center">
            {t('title')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {modes.map((mode, index) => (
              <div
                key={mode.id}
                className={`group relative p-6 rounded-2xl bg-ink-900/50 border ${modeColors[index].border} hover:-translate-y-2 transition-all duration-300`}
              >
                {/* Glow */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `radial-gradient(circle at top, ${modeColors[index].glow}, transparent 70%)` }}
                />
                
                <div className="relative z-10">
                  {/* Mode Tag */}
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono mb-4 ${modeColors[index].tag}`}>
                    {mode.id}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-lg font-medium mb-4">{mode.title}</h3>
                  
                  {/* Suitable */}
                  <div className="mb-3">
                    <span className="text-xs text-paper-400 font-mono uppercase tracking-wider">{t('suitable')}</span>
                    <p className="text-sm text-paper-300 mt-1">{mode.suitable}</p>
                  </div>
                  
                  {/* Goal */}
                  <div className="mb-3">
                    <span className="text-xs text-paper-400 font-mono uppercase tracking-wider">{t('goal')}</span>
                    <p className="text-sm text-paper-300 mt-1">{mode.goal}</p>
                  </div>
                  
                  {/* Outputs */}
                  <div>
                    <span className="text-xs text-paper-400 font-mono uppercase tracking-wider">{t('outputs')}</span>
                    <ul className="mt-2 space-y-1">
                      {mode.outputs.map((output, i) => (
                        <li key={i} className="text-sm text-paper-300 flex items-start gap-2">
                          <span className="text-zen-gold mt-1">•</span>
                          {output}
                        </li>
                      ))}
                    </ul>
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

// What I Do Section
function WhatIDoSection() {
  const t = useTranslations('coBuild.whatIDo');
  const items = t.raw('items') as string[];

  return (
    <section className="section relative">
      <div className="absolute inset-0 bg-ink-900/30" />
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium mb-10 flex items-center gap-3">
            <span className="text-geek-cyan font-mono">{'$'}</span>
            {t('title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-ink-800/30 border border-ink-700/50"
              >
                <span className="text-zen-gold font-mono text-sm">{String(index + 1).padStart(2, '0')}</span>
                <p className="text-paper-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// How To Start Section
function HowToStartSection() {
  const t = useTranslations('coBuild.howToStart');
  const template = t.raw('template') as string[];

  return (
    <section className="section relative">
      <div className="absolute inset-0 bg-ink-950" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.05) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
      
      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-medium mb-4">
            {t('title')}
          </h2>
          <p className="text-paper-400 mb-8">{t('description')}</p>
          
          {/* Email Template */}
          <div className="text-left p-6 rounded-2xl bg-ink-900/80 border border-ink-700/50 font-mono text-sm">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-ink-700/50">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-paper-400 text-xs">{t('templateTitle')}</span>
            </div>
            <div className="space-y-2 text-paper-300">
              {template.map((line, index) => (
                <p key={index}>
                  <span className="text-geek-cyan">{line.split('：')[0]}：</span>
                  <span className="text-paper-400">{line.split('：')[1] || ''}</span>
                </p>
              ))}
            </div>
          </div>
          
          {/* CTA */}
          <a
            href="mailto:supeng842499467@gmail.com?subject=Co-build Request"
            className="btn btn-primary mt-8 inline-flex"
          >
            {t('cta')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// Principles Section
function PrinciplesSection() {
  const t = useTranslations('coBuild.principles');
  const items = t.raw('items') as string[];
  const notSuitable = t.raw('notSuitable') as string[];

  return (
    <section className="section relative">
      <div className="absolute inset-0 bg-ink-900/50" />
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Principles */}
            <div>
              <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
                <span className="text-geek-green">✓</span>
                {t('title')}
              </h2>
              <ul className="space-y-3">
                {items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-paper-300">
                    <span className="text-geek-green mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Not Suitable */}
            <div>
              <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
                <span className="text-red-400">✗</span>
                {t('notSuitableTitle')}
              </h2>
              <ul className="space-y-3">
                {notSuitable.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-paper-400">
                    <span className="text-red-400/60 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const t = useTranslations('coBuild.contact');

  const links = [
    { name: 'Email', value: 'supeng842499467@gmail.com', href: 'mailto:supeng842499467@gmail.com' },
    { name: 'X', value: '@0xDarren_su', href: 'https://x.com/0xDarren_su' },
    { name: 'Github', value: 'SuperSupeng', href: 'https://github.com/SuperSupeng' },
    { name: 'Instagram', value: '@0xdarren_su', href: 'https://instagram.com/0xdarren_su' },
  ];

  return (
    <section className="section relative bg-gradient-to-b from-ink-950 to-ink-900">
      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-medium mb-8">
            {t('title')}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.name !== 'Email' ? '_blank' : undefined}
                rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                className="p-4 rounded-xl bg-ink-800/50 border border-ink-700/50 hover:border-zen-gold/30 transition-all group"
              >
                <span className="block text-xs text-paper-400 font-mono mb-1">{link.name}</span>
                <span className="block text-sm text-paper-200 group-hover:text-zen-gold transition-colors truncate">
                  {link.value}
                </span>
              </a>
            ))}
          </div>
          
          {/* Tagline */}
          <p className="text-2xl md:text-3xl font-medium text-gradient-gold">
            {t('tagline')}
          </p>
        </div>
      </div>
    </section>
  );
}

export default function CoBuildPage() {
  return (
    <>
      <HeroSection />
      <WhatWeBuildSection />
      <HowWeCoBuildSection />
      <WhatIDoSection />
      <HowToStartSection />
      <PrinciplesSection />
      <ContactSection />
    </>
  );
}
