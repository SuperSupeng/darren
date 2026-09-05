import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getAllPosts } from '@/lib/blog';
import ContactActions from '@/components/ContactActions';

export default function NotesContact({ locale }: { locale: string }) {
  const posts = getAllPosts(locale);
  const featured = posts.find((post) => post.slug === 'managing-31-ai-employees') ?? posts[0];
  const others = posts.filter((post) => post.slug !== featured?.slug).slice(0, 2);
  const isAgentEssay = featured?.slug === 'managing-31-ai-employees';
  const featuredNumber = isAgentEssay
    ? '31'
    : featured?.slug === 'superai-china-ecosystem-visit'
      ? '05'
      : '01';
  const copy =
    locale === 'zh'
      ? {
          eyebrow: '文章 / NOTES',
          title: '我通常会等一件事做\u2060完，再把它写下来。',
          featured: '这篇文章发布后，很多人来找我聊 Agent',
          read: '读这篇文章',
          more: '另外两篇文章',
          all: '查看全部文章',
          path: '2019 年，我在学习 AI 的时候加入 Datawhale，最初只是一个普通的学习者。后来，我开始参与开源项目，也开始组织社区和活动。MatchPoint 则来自这些工作里反复遇到的招人问题。',
          about: '看看这些经历是怎样连起来的',
          contactEyebrow: '联系我 / CONTACT',
          contactTitle: '如果你觉得我们可以一起做\u2060件\u2060事，欢迎来信。',
          contactDescription:
            '不用准备完整方案。简单说说你正在做什么、这次想解决什么，以及为什么想到找我，就够我们开始聊了。',
          services: '先看看常见的合作方式',
        }
      : {
          eyebrow: 'NOTES / WRITING',
          title: 'I usually wait until something is finished, then write down what happened and what I learned.',
          featured: isAgentEssay ? 'What working with 31 agents taught me about management' : 'Five observations from a week inside China’s AI ecosystem',
          read: isAgentEssay ? 'Read the essay' : 'Read the field note',
          more: 'More writing',
          all: 'View all writing',
          path: 'I joined Datawhale in 2019 as an AI learner. Later, I began contributing to open-source projects and organizing communities and events. MatchPoint grew out of a hiring problem I encountered repeatedly in that work.',
          about: 'See how these experiences connect',
          contactEyebrow: 'CONTACT',
          contactTitle: 'If you think we could work on something together, write to me.',
          contactDescription:
            'You do not need a complete proposal. A few lines about what you are working on, what you hope to solve, and why you thought of me are enough to begin.',
          services: 'See the usual ways we can work together',
        };

  return (
    <section id="writing" className="writing-contact-scene">
      <div className="container writing-scene-heading">
        <p className="directed-kicker">{copy.eyebrow}</p>
        <h2>{copy.title}</h2>
      </div>

      {featured ? (
        <Link href={`/blog/${featured.slug}`} className="container writing-feature">
          <span className="writing-feature-number" aria-hidden="true">{featuredNumber}</span>
          <div className="writing-feature-image">
            <Image
              src={featured.image.url}
              alt={featured.title}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
            <div />
          </div>
          <div className="writing-feature-copy">
            <span>{copy.featured}</span>
            <p>{featured.date} · {featured.readingTime} min</p>
            <h3>
              {locale === 'zh' ? (
                <>
                  <span>管了 31 个 AI 员工</span>
                  <span>之后，我重新理解了</span>
                  <span>管理学</span>
                </>
              ) : featured.title}
            </h3>
            <strong>{featured.description}</strong>
            <i>{copy.read} →</i>
          </div>
        </Link>
      ) : null}

      {others.length > 0 ? <div className="container writing-index">
        <div className="writing-index-label">
          <p>{copy.more}</p>
          <Link href="/blog">{copy.all} ↗</Link>
        </div>
        <div>
          {others.map((post, index) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <span>{String(index + 2).padStart(2, '0')}</span>
              <strong>{post.title}</strong>
              <small>{post.date}</small>
              <i aria-hidden="true">↗</i>
            </Link>
          ))}
        </div>
      </div> : null}

      <div className="container writing-path-note">
        <p>{copy.path}</p>
        <Link href="/about">{copy.about} →</Link>
      </div>

      <div id="contact" className="container quiet-contact">
        <p className="directed-kicker">{copy.contactEyebrow}</p>
        <h2>{copy.contactTitle}</h2>
        <div>
          <p>{copy.contactDescription}</p>
          <ContactActions locale={locale} context="home-contact" variant="quiet" />
          <Link href="/services">{copy.services} →</Link>
        </div>
        <Image
          src="/images/peng-seal-v1.png"
          alt=""
          width={220}
          height={220}
          className="quiet-contact-seal"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
