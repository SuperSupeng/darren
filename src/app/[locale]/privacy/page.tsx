import type { Metadata } from 'next';
import '@/components/spatial/interiors.css';

const title = 'Privacy Policy — Darren YouTube Data';

const paragraphs = [
  "Darren YouTube Data is a private app used only by Darren Su (Su Peng). It accesses Darren's own YouTube channel statistics and analytics data in read-only mode, for his own use.",
  "The app does not store this data beyond what is needed to display it to Darren, and does not share, sell or transfer it to any third party. It does not access any other user's data.",
] as const;

export const metadata: Metadata = {
  title: { absolute: title },
  description: paragraphs[0],
  robots: { index: false, follow: false },
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" tabIndex={-1} lang="en" className="interior-page reading-page">
      <div className="interior-wrap">
        <article className="reading-sheet">
          <header className="reading-header">
            <h1>{title}</h1>
          </header>
          <div className="reading-prose">
            {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <p>Contact: <a href="mailto:supeng842499467@gmail.com">supeng842499467@gmail.com</a></p>
            <p>Last updated: 2026-10-08</p>
          </div>
        </article>
      </div>
    </main>
  );
}
