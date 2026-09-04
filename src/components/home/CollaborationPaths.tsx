'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { Link } from '@/i18n/navigation';
import { getPortfolio } from '@/lib/portfolio';

export default function CollaborationPaths({ locale }: { locale: string }) {
  const { collaborations } = getPortfolio(locale);
  const [activeIndex, setActiveIndex] = useState(0);
  const tabListRef = useRef<HTMLDivElement>(null);
  const activePath = collaborations[activeIndex];
  const examples =
    locale === 'zh'
      ? ['AI+X 创造节、WAIC 官方夜场', 'Rumata 产品共创 Workshop', '31 个 Agent 实践分享']
      : ['AI+X Creation Festival and WAIC’s official evening event', 'Rumata product co-creation workshop', 'Talks on working with 31 agents'];
  const copy =
    locale === 'zh'
      ? {
          eyebrow: '合作 / COLLABORATE',
          title: '我组织开发者活动，也帮助 AI 产\u2060品接触第一批用户。',
          description:
            '过去一年，我参与的合作大多从这些具体问题开始。也有人邀请我做 AI 或 Agent 分享，或者请我帮忙联系合适的嘉宾和生态伙伴。在活动和产品 Workshop 里，我通常担任发起人或负责人，从前期策划一直负责到现场和后续整理。',
          example: '我做过的相关项目',
          bestFor: '适合谁',
          leaves: '合作通常包括',
          link: '查看合作方式与项目范围',
        }
      : {
          eyebrow: 'COLLABORATE / THREE PATHS',
          title: 'I organize developer events and help AI products reach their first users.',
          description:
            'Most of my collaborations over the past year began with needs like these. Some people also invited me to speak about AI and agents, or asked me to recommend speakers and ecosystem partners. For events and product workshops, I usually serve as the initiator or program lead and stay involved from planning through delivery and follow-up.',
          example: 'Related work I have done',
          bestFor: 'A good fit for',
          leaves: 'A collaboration usually includes',
          link: 'View the scope of each collaboration',
        };

  const moveTabFocus = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const lastIndex = collaborations.length - 1;
    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? lastIndex
        : event.key === 'ArrowDown' || event.key === 'ArrowRight'
          ? (index + 1) % collaborations.length
          : (index - 1 + collaborations.length) % collaborations.length;
    setActiveIndex(nextIndex);
    tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[nextIndex]?.focus();
  };

  return (
    <section id="collaborate" className="collab-selector">
      <svg className="collab-selector-current" viewBox="0 0 1600 900" aria-hidden="true">
        <path d="M-80 735c260-206 471 83 691-104s391-174 603-36 318 86 466-32" />
        <path d="M-96 782c297-142 462 68 711-63s376-123 591-6 321 83 480-4" />
      </svg>

      <div className="container collab-selector-heading">
        <div>
          <p className="directed-kicker">{copy.eyebrow}</p>
          <h2>{copy.title}</h2>
        </div>
        <p>{copy.description}</p>
      </div>

      <div className="container collab-selector-stage">
        <div ref={tabListRef} className="collab-selector-menu" role="tablist" aria-label={copy.eyebrow} aria-orientation="vertical">
          {collaborations.map((path, index) => (
            <button
              key={path.number}
              type="button"
              id={`collaboration-tab-${path.number}`}
              role="tab"
              aria-selected={activeIndex === index}
              aria-controls="collaboration-panel"
              tabIndex={activeIndex === index ? 0 : -1}
              className={activeIndex === index ? 'is-active' : undefined}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => moveTabFocus(event, index)}
            >
              <span>{path.number}</span>
              <span>
                <strong>{path.title}</strong>
                <small>{examples[index]}</small>
              </span>
              <i aria-hidden="true">↗</i>
            </button>
          ))}
        </div>

        <div
          id="collaboration-panel"
          key={activePath.number}
          className="collab-selector-panel"
          role="tabpanel"
          aria-labelledby={`collaboration-tab-${activePath.number}`}
        >
          <span className="collab-selector-panel-number" aria-hidden="true">{activePath.number}</span>
          <div className="collab-selector-example">
            <span>{copy.example}</span>
            <strong>{examples[activeIndex]}</strong>
          </div>
          <h3>{activePath.title}</h3>
          <p>{activePath.description}</p>
          <div className="collab-selector-best">
            <span>{copy.bestFor}</span>
            <strong>{activePath.bestFor}</strong>
          </div>
          <div className="collab-selector-outcomes">
            <span>{copy.leaves}</span>
            <ul>
              {activePath.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </div>
          <Link href="/services">{copy.link} →</Link>
        </div>
      </div>
    </section>
  );
}
