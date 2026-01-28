'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function Proof() {
  const t = useTranslations('about.proof');
  const [activeTab, setActiveTab] = useState<'communities' | 'events' | 'impact'>('communities');

  const tabs = [
    { id: 'communities' as const, label: t('tabs.communities'), icon: '🤝' },
    { id: 'events' as const, label: t('tabs.events'), icon: '🎯' },
    { id: 'impact' as const, label: t('tabs.impact'), icon: '💚' },
  ];

  // 获取数据
  const communities = t.raw('communities.items') as Array<{ name: string; role: string }>;
  const stats = t.raw('stats') as Array<{ value: string; label: string; icon: string }>;

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-ink-900/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(167,139,250,0.08)_0%,transparent_50%)]" />
      
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-12 h-px bg-gradient-to-r from-transparent to-zen-gold/50" />
              <span className="text-zen-gold text-2xl">✨</span>
              <h2 className="text-3xl md:text-4xl font-medium">{t('title')}</h2>
              <span className="text-zen-gold text-2xl">✨</span>
              <span className="w-12 h-px bg-gradient-to-l from-transparent to-zen-gold/50" />
            </div>
            <p className="text-paper-400 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-xl bg-ink-900/50 border border-ink-700/50"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-gradient-gold mb-1">{stat.value}</div>
                <div className="text-sm text-paper-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-zen-gold text-ink-950'
                    : 'bg-ink-900/50 border border-ink-700/50 text-paper-400 hover:border-ink-600'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px]">
            {activeTab === 'communities' && (
              <div className="grid md:grid-cols-3 gap-5 animate-fade-in-up">
                {communities.map((community, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-xl bg-ink-900/60 border border-ink-700/50 hover:border-zen-gold/30 transition-all duration-300 hover:-translate-y-1"
                  >
                    <h3 className="text-lg font-medium mb-2 text-paper-100">
                      {community.name}
                    </h3>
                    <p className="text-sm text-zen-gold font-mono">
                      {community.role}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'events' && (
              <div className="text-center py-12 animate-fade-in-up">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-medium mb-3">{t('events.title')}</h3>
                <p className="text-paper-400 max-w-md mx-auto mb-6">
                  {t('events.description')}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {(t.raw('events.list') as string[]).map((event, i) => (
                    <span key={i} className="px-4 py-2 rounded-lg bg-ink-800/50 text-paper-300 text-sm">
                      {event}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'impact' && (
              <div className="text-center py-12 animate-fade-in-up">
                <div className="text-6xl mb-4">💚</div>
                <h3 className="text-xl font-medium mb-3">{t('impact.title')}</h3>
                <p className="text-paper-400 max-w-md mx-auto mb-6">
                  {t('impact.description')}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {(t.raw('impact.list') as string[]).map((item, i) => (
                    <span key={i} className="px-4 py-2 rounded-lg bg-ink-800/50 text-paper-300 text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
