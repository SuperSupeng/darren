import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getSiteContent } from '@/lib/siteContent';

export default function Hero({ locale }: { locale: string }) {
  const content = getSiteContent(locale).home.hero;
  const titleParts = [content.title];

  return (
    <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden bg-paper-200">
      <Image
        src="/images/hero-longjing-mist.jpg"
        alt={content.imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_76%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,248,241,0.95)_0%,rgba(251,248,241,0.82)_34%,rgba(251,248,241,0.3)_66%,rgba(251,248,241,0.04)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,248,241,0.78)_0%,rgba(251,248,241,0.1)_48%,rgba(31,33,26,0.34)_100%)]" />

      <div className="container relative z-10 flex min-h-[calc(100svh-4rem)] flex-col justify-center py-10 md:py-14 lg:py-16">
        <div className="max-w-5xl">
          <p className="academy-kicker text-ink-700/70">{content.eyebrow}</p>
          <h1 className="heading-chunks mt-6 max-w-5xl font-serif text-[clamp(2.45rem,7.4vw,5.35rem)] font-medium leading-[1.08] text-ink-950 md:leading-[1.06]">
            {titleParts.map((part) => (
              <span key={part}>{part}</span>
            ))}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-ink-700 md:mt-8 md:text-lg md:leading-9">
            {content.subtitle}
          </p>
          <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center md:mt-7">
            <a href="mailto:supeng842499467@gmail.com" className="btn btn-primary px-6">
              {content.primaryCta}
            </a>
            <Link href="/services" className="quiet-link">
              {content.secondaryCta}
            </Link>
          </div>
          <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-ink-800 md:text-base md:leading-8">
            {content.quietLine}
          </p>
        </div>
      </div>
    </section>
  );
}
