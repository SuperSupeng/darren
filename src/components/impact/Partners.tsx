'use client';

import { useTranslations } from 'next-intl';

// Partner organizations that focus on tech for good, education, accessibility
const partners = [
  { name: 'Datawhale', logo: '🐳', color: 'cyan' },
  { name: 'AGI Villa', logo: '🏠', color: 'gold' },
  { name: 'OpenAI', logo: '⬡', color: 'green' },
  { name: 'UNICEF', logo: '🌍', color: 'blue' },
  { name: 'Code.org', logo: '< >', color: 'orange' },
  { name: 'Khan Academy', logo: '🎓', color: 'green' },
  { name: 'GitHub Education', logo: '🐙', color: 'purple' },
  { name: 'MIT Media Lab', logo: '◇', color: 'red' },
];

export default function Partners() {
  const t = useTranslations('impact');

  return (
    <section className="section relative overflow-hidden">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-zen-bamboo/50" />
            <span className="text-zen-bamboo text-xl">🤝</span>
            <h2 className="text-xl md:text-2xl font-medium">
              {t('partners.title')}
            </h2>
            <span className="text-zen-bamboo text-xl">🤝</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-zen-bamboo/50" />
          </div>
          <p className="text-paper-500 text-sm max-w-lg mx-auto">
            {t('partners.description')}
          </p>
        </div>

        {/* Logo Wall - Scrolling */}
        <div className="relative">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-ink-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-ink-950 to-transparent z-10 pointer-events-none" />

          {/* Scrolling container */}
          <div className="overflow-hidden">
            <div className="flex gap-8 animate-scroll-x">
              {/* Double the items for seamless loop */}
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 group"
                >
                  <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-ink-900/50 border border-ink-700/30 hover:border-ink-600/50 transition-all duration-300 hover:-translate-y-1">
                    {/* Logo placeholder */}
                    <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">
                      {partner.logo}
                    </span>
                    <span className="text-paper-400 group-hover:text-paper-200 transition-colors font-medium whitespace-nowrap">
                      {partner.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="text-center text-xs text-paper-600 mt-6 font-mono">
          {t('partners.note')}
        </p>
      </div>

      {/* Add the animation styles */}
      <style jsx>{`
        @keyframes scroll-x {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-x {
          animation: scroll-x 30s linear infinite;
        }
        .animate-scroll-x:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
