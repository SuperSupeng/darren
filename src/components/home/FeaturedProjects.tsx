import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getSiteContent } from '@/lib/siteContent';

export default function FeaturedProjects({ locale }: { locale: string }) {
  const site = getSiteContent(locale);
  const products = site.products.items.slice(0, 2);
  const projectOffsets = ['', 'lg:mt-14'];

  return (
    <section className="landscape-band px-4 py-24 text-ink-950 md:px-6 md:py-32">
      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="academy-kicker">{site.home.productLab.eyebrow}</p>
            <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
              {site.home.productLab.title}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-9 text-ink-600 lg:justify-self-end">
            {site.home.productLab.subtitle}
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {products.map((project, index) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group natural-slip overflow-hidden ${projectOffsets[index] ?? ''}`}
            >
              <div className="relative bg-paper-300/52 p-3 md:p-4">
                <div className="relative aspect-[16/9] overflow-hidden bg-paper-100/70">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="project-image-muted object-contain transition duration-700"
                  />
                </div>
                <div className="absolute left-5 top-5 border-b border-zen-gold/30 bg-paper-100/72 px-2 py-1 text-xs uppercase tracking-[0.12em] text-ink-700">
                  {project.status}
                </div>
              </div>

              <div className="p-6 md:p-8">
                <p className="academy-kicker text-ink-700/48">
                  {site.labels.productLab.projectLabel} {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-4 text-2xl font-medium text-ink-950 md:text-3xl">
                  {project.name}
                </h3>
                <p className="mt-2 text-sm text-zen-gold-dim/80">{project.tagline}</p>
                <p className="mt-5 text-sm leading-8 text-ink-600">{project.description}</p>
                <div className="mt-7 grid gap-4 border-t border-dashed border-ink-950/12 pt-6">
                  <div>
                    <p className="academy-kicker text-ink-700/48">{site.labels.productLab.problem}</p>
                    <p className="mt-2 text-sm leading-7 text-ink-600">{project.problem}</p>
                  </div>
                  <div>
                    <p className="academy-kicker text-ink-700/48">{site.labels.productLab.signal}</p>
                    <p className="mt-2 text-sm leading-7 text-ink-600">{project.signal}</p>
                  </div>
                </div>
                <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs uppercase tracking-[0.12em] text-ink-600/58">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/build" className="quiet-link">
            {site.labels.viewProductLab}
          </Link>
        </div>
      </div>
    </section>
  );
}
