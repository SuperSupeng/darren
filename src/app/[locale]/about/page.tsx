import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import RoomPortal from '@/components/spatial/RoomPortal';
import '@/components/spatial/interiors.css';
import { getSiteContent } from '@/lib/siteContent';
import { aboutStructuredData, createPageMetadata, getPageKeywords } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return createPageMetadata({
    locale,
    path: '/about',
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: getPageKeywords(locale, 'about'),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const site = getSiteContent(locale);
  const innerGround =
    locale === 'zh'
      ? {
          eyebrow: '禅修与自我观察',
          title: '禅修让我在忙碌时，也能停下来想一想。',
          description:
            '面对新的项目和机会，我会先问自己：这件事为什么值得做，我是否愿意投入，会给参与的人带来什么影响。禅修和长期的自我观察，帮助我更认真地考虑这些问题。',
          closing: '开始之前，先想清楚自己为什么愿意做。',
        }
      : {
          eyebrow: 'Meditation and reflection',
          title: 'Meditation helps me pause, even when work gets busy.',
          description:
            'Before taking on a project or opportunity, I ask why it matters, whether I am willing to commit, and how it may affect the people involved. Meditation and reflection help me give those questions more attention.',
          closing: 'Before I begin, I want to understand why I am willing to do the work.',
        };

  return (
    <>
      <JsonLd data={aboutStructuredData(locale)} />
      <main id="main-content" tabIndex={-1} className="interior-page interior-about">
        <div className="interior-wrap">
          <div className="interior-running-line"><span>{site.labels.about.roomEyebrow}</span><span>DARREN SU / {locale === 'zh' ? '关于我' : 'ABOUT ME'}</span></div>
          <header className="interior-profile">
            <div className="interior-profile-copy">
              <p className="interior-kicker">{site.labels.about.eyebrow}</p>
              <h1>{site.about.hero.title}</h1>
              <p className="interior-lead">{site.about.hero.subtitle}</p>
              <div className="interior-tags">{site.about.hero.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            </div>
            <div className="interior-profile-stage">
            <RoomPortal zone="notes" locale={locale} />
            <figure className="interior-photo interior-portrait">
              <div><Image src="/photo.jpg" alt="Darren Su" fill sizes="(min-width: 900px) 360px, 75vw" className="object-cover" priority /></div>
              <figcaption><span>Darren Su / 苏鹏</span><span>{locale === 'zh' ? '杭州' : 'HANGZHOU'}</span></figcaption>
            </figure>
            </div>
          </header>
          <div className="interior-profile-room">
            <blockquote>{site.labels.about.pullQuote}</blockquote>
          </div>

          <section className="interior-section interior-two-columns">
            <header className="interior-section-heading"><p className="interior-kicker">{site.labels.about.kernelEyebrow}</p><h2>{site.labels.about.kernelTitle}</h2><p>{site.labels.about.kernelDescription}</p></header>
            <div className="interior-chapters">
              {site.about.kernel.map((item, index) => <article key={item.title}>
                <span className="interior-kicker">{locale === 'zh' ? '经历' : 'Experience'} / {String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3><p>{item.description}</p>
              </article>)}
            </div>
          </section>

          <section className="interior-section interior-two-columns interior-inset-section">
            <header className="interior-section-heading"><p className="interior-kicker">{site.about.whyThisWork.eyebrow}</p><h2>{site.about.whyThisWork.title}</h2><blockquote>{site.about.whyThisWork.quote}</blockquote></header>
            <div><p className="interior-body">{site.about.whyThisWork.body}</p>
              <ol className="interior-numbered-list">{site.about.whyThisWork.points.map((point, index) => <li key={point}><span>{String(index + 1).padStart(2, '0')}</span><p>{point}</p></li>)}</ol>
            </div>
          </section>

          <section className="interior-section interior-inner-ground">
            <figure className="interior-photo">
              <div className="interior-landscape"><Image src="/blog/zongtong-retreat/temple.jpg" alt={locale === 'zh' ? '宗通寺禅修期间的寺院现场' : 'Temple grounds during Darren’s meditation retreat'} fill sizes="(min-width: 900px) 43vw, 100vw" className="object-cover" /></div>
              <figcaption>{innerGround.eyebrow}</figcaption>
            </figure>
            <div className="interior-section-heading"><p className="interior-kicker">{innerGround.eyebrow}</p><h2>{innerGround.title}</h2><p>{innerGround.description}</p><blockquote>{innerGround.closing}</blockquote></div>
          </section>

          <section className="interior-section interior-two-columns interior-current-work">
            <header className="interior-section-heading"><p className="interior-kicker">{site.labels.about.workEyebrow}</p><h2>{site.labels.about.workTitle}</h2></header>
            <ol className="interior-numbered-list">{site.labels.about.workItems.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></li>)}</ol>
          </section>
        </div>
      </main>
    </>
  );
}
