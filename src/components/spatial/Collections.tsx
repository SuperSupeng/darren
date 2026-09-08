import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import RoomPortal from '@/components/spatial/RoomPortal';
import './collections.css';

type CollectionZone = 'work' | 'build' | 'notes';

export function CollectionHero({ locale, zone, title, lead, description, children }: {
  locale: string;
  zone: CollectionZone;
  title: string;
  lead: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <header className={`collection-hero collection-hero-${zone}`}>
      <div className="collection-hero-copy">
        <h1>{title}</h1>
        <p className="collection-hero-lead">{lead}</p>
        {description ? <p className="collection-description">{description}</p> : null}
        {children}
      </div>
      <div className="collection-room">
        <RoomPortal zone={zone} locale={locale} contentHref={zone === 'work' ? '#work-archive' : zone === 'build' ? '#product-workbench' : '#notes-index'} />
      </div>
    </header>
  );
}

export function CollectionHeading({ id, title, description }: { id?: string; title: string; description?: string }) {
  return (
    <div className="collection-section-heading">
      <div>
        <h2 id={id}>{title}</h2>
        {description ? <p className="collection-description">{description}</p> : null}
      </div>
    </div>
  );
}

export function CollectionNext({ href, title, description }: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <section className="collection-next">
      <div>
        <h2><Link href={href}>{title} <span aria-hidden="true">↗</span></Link></h2>
        <p className="collection-description">{description}</p>
      </div>
      <Link href={href} className="collection-round-link" aria-label={title}><span aria-hidden="true">↗</span></Link>
    </section>
  );
}
