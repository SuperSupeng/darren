'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export default function FeaturedProjects() {
  const t = useTranslations('featuredProjects');
  const projects = t.raw('items') as Array<{
    id: string;
    name: string;
    tagline: string;
    url: string;
    image: string;
  }>;

  // 只显示前 2 个项目
  const displayProjects = projects.slice(0, 2);

  if (displayProjects.length === 0) {
    return null;
  }

  return (
    <section className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-950 to-ink-900" />
      
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-medium mb-2">
                {t('title')}
              </h2>
              <p className="text-paper-400">
                {t('subtitle')}
              </p>
            </div>
            <Link 
              href="/build" 
              className="hidden md:flex items-center gap-2 text-sm text-paper-300 hover:text-paper-100 transition-colors"
            >
              {t('viewAll')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {displayProjects.map((project) => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl overflow-hidden border border-ink-700/50 bg-ink-900/50 hover:border-ink-600/50 transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-ink-800">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
                </div>
                
                {/* Project Info */}
                <div className="p-5">
                  <h3 className="text-lg font-medium text-paper-100 group-hover:text-white transition-colors mb-1">
                    {project.name}
                  </h3>
                  <p className="text-sm text-paper-400">
                    {project.tagline}
                  </p>
                </div>
                
                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-ink-800/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4 text-paper-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
          
          {/* Mobile View All Link */}
          <div className="mt-6 md:hidden text-center">
            <Link 
              href="/build" 
              className="inline-flex items-center gap-2 text-sm text-paper-300 hover:text-paper-100 transition-colors"
            >
              {t('viewAll')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
