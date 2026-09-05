'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { track } from '@vercel/analytics';

const socialLinks = [
  { name: 'Xiaohongshu', href: 'https://xhslink.cn/m/1JL3lV0NGmO' },
  { name: 'X', href: 'https://x.com/zenshipai' },
  { name: 'Instagram', href: 'https://www.instagram.com/0xdarren_su' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/darrenzenshipai' },
  { name: 'GitHub', href: 'https://github.com/SuperSupeng' },
];

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-950/10 bg-paper-100 px-4 py-10 text-ink-950 md:px-6 md:py-12">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Link href="/" className="font-serif text-2xl text-ink-950">
              {t('name')}
            </Link>
            <p className="mt-3 max-w-xl text-sm leading-7 text-ink-600">{t('bio')}</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-ink-700/90">
              {t('location')}
            </p>
          </div>

          <nav aria-label={t('contactTitle')} className="flex flex-wrap gap-x-5 gap-y-3 md:justify-end">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ink-600 transition-colors hover:text-ink-950"
              >
                {link.name}
              </a>
            ))}
            <a
              href="mailto:supeng842499467@gmail.com"
              onClick={() => track('Contact Email Opened', { location: 'footer', locale })}
              className="text-sm text-ink-600 transition-colors hover:text-ink-950"
            >
              Email
            </a>
          </nav>
        </div>

        <div className="mt-9 border-t border-ink-950/8 pt-5">
          <p className="font-mono text-xs text-ink-700/90">
            {t('copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
