import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import RoomPortal from '@/components/spatial/RoomPortal';
import './collections.css';

type CollectionZone = 'work' | 'build' | 'notes';

export function CollectionHero({ locale, zone, number, eyebrow, title, lead, description, children }: {
  locale: string;
  zone: CollectionZone;
  number: string;
  eyebrow: string;
  title: string;
  lead: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <header className={`collection-hero collection-hero-${zone}`}>
      <div className="collection-hero-copy">
        <p className="collection-kicker"><span>{number}</span> {eyebrow}</p>
        <h1>{title}</h1>
        <p className="collection-hero-lead">{lead}</p>
        {description ? <p className="collection-description">{description}</p> : null}
        {children}
      </div>
      <div className="collection-room">
        <RoomPortal zone={zone} locale={locale} />
      </div>
    </header>
  );
}

export function CollectionHeading({ id, eyebrow, title, description }: { id?: string; eyebrow: string; title: string; description?: string }) {
  return (
    <div className="collection-section-heading">
      <p className="collection-kicker">{eyebrow}</p>
      <div>
        <h2 id={id}>{title}</h2>
        {description ? <p className="collection-description">{description}</p> : null}
      </div>
    </div>
  );
}

export function CollectionNext({ locale, zone, href, title, description }: {
  locale: string;
  zone: CollectionZone;
  href: string;
  title: string;
  description: string;
}) {
  return (
    <section className="collection-next">
      <div className="collection-next-room"><RoomPortal zone={zone} locale={locale} compact /></div>
      <div>
        <p className="collection-kicker">{locale === 'zh' ? '继续逛逛 / NEXT SPACE' : 'NEXT SPACE'}</p>
        <h2><Link href={href}>{title} <span aria-hidden="true">↗</span></Link></h2>
        <p className="collection-description">{description}</p>
      </div>
      <Link href={href} className="collection-round-link" aria-label={title}><span aria-hidden="true">↗</span></Link>
    </section>
  );
}
