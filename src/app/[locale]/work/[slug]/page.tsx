import Image from 'next/image';
import { notFound } from 'next/navigation';
import ContactActions from '@/components/ContactActions';
import JsonLd from '@/components/JsonLd';
import { Link } from '@/i18n/navigation';
import { locales } from '@/i18n/config';
import { getAllWorkIds, getPortfolio, getWorkById, getWorkCollaboration } from '@/lib/portfolio';
import { createPageMetadata, getPageKeywords, workCaseStructuredData } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllWorkIds().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const work = getWorkById(locale, slug);

  if (!work) {
    return {
      title: locale === 'zh' ? '案例未找到' : 'Case study not found',
      robots: { index: false, follow: false },
    };
  }

  return createPageMetadata({
    locale,
    path: `/work/${work.id}`,
    title: work.title,
    description: work.summary,
    keywords: [...getPageKeywords(locale, 'work'), work.title, work.location],
    image: work.image,
    imageWidth: work.imageWidth,
    imageHeight: work.imageHeight,
    imageAlt: work.imageAlt,
    availableLocales: locales,
  });
}

export default async function WorkCasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const work = getWorkById(locale, slug);

  if (!work) notFound();

  const works = getPortfolio(locale).work;
  const currentIndex = works.findIndex((item) => item.id === work.id);
  const nextWork = works[(currentIndex + 1) % works.length];
  const collaboration = getWorkCollaboration(locale, work.id);
  const copy = locale === 'zh'
    ? {
        back: '返回项目索引',
        caseLabel: '项目记录',
        role: '我的角色',
        result: '规模与结果',
        place: '时间与地点',
        context: '事情从哪里开始',
        responsibilities: '我负责的部分',
        outcome: '最后完成了什么',
        reflection: '这件事留下的经验',
        note: '阅读相关现场记录',
        next: '下一个项目',
        contactEyebrow: '如果你正在做类似的事',
        contactTitle: '告诉我你想解决的问题。',
        contactBody: '不需要先准备完整方案。简单说明目标、时间和地点，就够我们开始判断是否适合。',
        collaborationBody: '了解这类合作适合什么情况、可以一起完成什么。已经有具体需求，也可以直接写邮件。',
      }
    : {
        back: 'Back to the work index',
        caseLabel: 'Case record',
        role: 'My role',
        result: 'Scale and outcome',
        place: 'Time and place',
        context: 'Where it started',
        responsibilities: 'What I handled',
        outcome: 'What was completed',
        reflection: 'What the work taught me',
        note: 'Read the related field note',
        next: 'Next project',
        contactEyebrow: 'Working on something similar?',
        contactTitle: 'Tell me what you are trying to solve.',
        contactBody: 'You do not need a finished proposal. A short note with the goal, rough timing, and location is enough for us to decide whether there is a fit.',
        collaborationBody: 'See who this collaboration is for and what we can work on together. If you already have a specific need, you can also email me directly.',
      };

  return (
    <>
      <JsonLd data={workCaseStructuredData(work, locale)} />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-paper-100 text-ink-950">
        <section className="site-page-hero site-work-case-hero relative isolate overflow-hidden bg-ink-950 px-4 py-20 text-paper-100 md:px-6 md:py-28">
          {work.image ? (
            <Image
              src={work.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className={`${work.imageClassName ?? 'object-cover'} -z-20 opacity-55 saturate-[0.82]`}
            />
          ) : null}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,18,13,0.94)_0%,rgba(15,18,13,0.72)_48%,rgba(15,18,13,0.3)_100%),linear-gradient(180deg,rgba(15,18,13,0.28),rgba(15,18,13,0.76))]" />
          <div className="container flex min-h-[34rem] flex-col justify-between pt-8 md:pt-12">
            <Link href="/work" className="quiet-link-inverse w-fit">← {copy.back}</Link>
            <div className="max-w-5xl">
              <p className="academy-kicker text-paper-300/72">{copy.caseLabel} · {work.year}</p>
              <h1 className="mt-6 max-w-4xl font-serif text-[clamp(3rem,8vw,7.4rem)] leading-[0.95] tracking-[-0.04em]">
                {work.title}
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-9 text-paper-200/82">{work.summary}</p>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-6 md:py-24">
          <div className="container grid gap-12 lg:grid-cols-[0.34fr_0.66fr] lg:gap-20">
            <aside>
              <dl className="border-t border-ink-950/12">
                <div className="border-b border-ink-950/12 py-5">
                  <dt className="text-xs uppercase tracking-[0.12em] text-ink-700/80">{copy.role}</dt>
                  <dd className="mt-2 text-sm font-medium leading-7 text-ink-900">{work.role}</dd>
                </div>
                <div className="border-b border-ink-950/12 py-5">
                  <dt className="text-xs uppercase tracking-[0.12em] text-ink-700/80">{copy.result}</dt>
                  <dd className="mt-2 text-sm font-medium leading-7 text-ink-900">{work.result}</dd>
                </div>
                <div className="border-b border-ink-950/12 py-5">
                  <dt className="text-xs uppercase tracking-[0.12em] text-ink-700/80">{copy.place}</dt>
                  <dd className="mt-2 text-sm font-medium leading-7 text-ink-900">{work.year} · {work.location}</dd>
                </div>
              </dl>
            </aside>

            <div className="max-w-3xl">
              <section>
                <p className="academy-kicker">01 · {copy.context}</p>
                <p className="mt-5 font-serif text-2xl leading-relaxed text-ink-900 md:text-3xl">{work.caseStudy.context}</p>
              </section>

              <section className="mt-16 border-t border-ink-950/12 pt-10">
                <p className="academy-kicker">02 · {copy.responsibilities}</p>
                <ol className="mt-6 border-t border-ink-950/10">
                  {work.caseStudy.responsibilities.map((item, index) => (
                    <li key={item} className="grid gap-4 border-b border-ink-950/10 py-5 sm:grid-cols-[3rem_1fr]">
                      <span className="font-mono text-xs text-zen-gold-dim/90">{String(index + 1).padStart(2, '0')}</span>
                      <span className="text-base leading-8 text-ink-700">{item}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="mt-16 grid gap-10 border-t border-ink-950/12 pt-10 md:grid-cols-2">
                <div>
                  <p className="academy-kicker">03 · {copy.outcome}</p>
                  <p className="mt-5 text-base font-medium leading-8 text-ink-900">{work.caseStudy.outcome}</p>
                  {work.caseStudy.outcomeNote ? (
                    <p className="mt-4 border-l-2 border-zen-gold-dim/30 pl-4 text-sm leading-7 text-ink-600">{work.caseStudy.outcomeNote}</p>
                  ) : null}
                </div>
                <div>
                  <p className="academy-kicker">04 · {copy.reflection}</p>
                  <p className="mt-5 text-base leading-8 text-ink-600">{work.caseStudy.reflection}</p>
                </div>
              </section>

              {work.noteHref ? (
                <Link href={work.noteHref} className="quiet-link mt-12 inline-flex">
                  <span>{copy.note} →</span>
                </Link>
              ) : null}
            </div>
          </div>
        </section>

        <section className="site-page-cta relative overflow-hidden bg-ink-950 px-4 py-20 text-paper-100 md:px-6 md:py-24">
          <div className="container relative grid gap-8 lg:grid-cols-[1.08fr_0.72fr] lg:items-end lg:gap-20">
            <div>
              <p className="academy-kicker text-paper-300/72">{copy.contactEyebrow}</p>
              <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">{collaboration?.invitation ?? copy.contactTitle}</h2>
              {collaboration ? (
                <Link href={`/services#${collaboration.id}`} className="btn mt-7 bg-paper-100 text-ink-950 shadow-none hover:bg-paper-200">
                  {collaboration.linkLabel} <span aria-hidden="true">→</span>
                </Link>
              ) : null}
            </div>
            <div>
              <p className="max-w-xl text-base leading-8 text-paper-300/74">{collaboration ? copy.collaborationBody : copy.contactBody}</p>
              <ContactActions locale={locale} context={`work-case-${work.id}`} variant="dark" className="mt-7" />
            </div>
          </div>
        </section>

        <section className="border-y border-ink-950/10 bg-paper-200/58 px-4 py-14 md:px-6 md:py-20">
          <Link href={nextWork.href ?? '/work'} className="container group grid gap-5 md:grid-cols-[0.3fr_1fr_auto] md:items-end">
            <p className="academy-kicker">{copy.next}</p>
            <div>
              <h2 className="font-serif text-3xl leading-tight transition-colors group-hover:text-zen-gold-dim md:text-5xl">{nextWork.title}</h2>
              <p className="mt-3 text-sm text-ink-600">{nextWork.location} · {nextWork.year}</p>
            </div>
            <span className="text-2xl text-zen-gold-dim" aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
    </>
  );
}
