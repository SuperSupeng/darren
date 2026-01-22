'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import NewsletterForm from './NewsletterForm';
import Logo from './Logo';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'X',
      href: 'https://x.com/supeng842499467',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com/SuperSupeng',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Email',
      href: 'mailto:supeng842499467@gmail.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative bg-ink-950 border-t border-ink-800/50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="container relative z-10 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo & Info */}
          <div className="flex flex-col items-center md:items-start gap-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group">
              <Logo size={24} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium text-lg">Darren<span className="text-zen-gold">.</span>Su</span>
            </Link>
            <p className="text-xs text-paper-500 leading-relaxed max-w-[280px] text-center md:text-left">
              {t('bio')}
            </p>
          </div>

          {/* Social Links - Center */}
          <div className="flex items-center justify-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.name === 'Email' ? undefined : '_blank'}
                rel={link.name === 'Email' ? undefined : 'noopener noreferrer'}
                className="group relative w-11 h-11 flex items-center justify-center rounded-xl bg-ink-800/50 border border-ink-700/50 text-paper-400 hover:text-zen-gold hover:border-zen-gold/30 transition-all duration-300 hover:-translate-y-1"
                aria-label={link.name}
              >
                {link.icon}
                {/* Tooltip */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-ink-800 text-xs text-paper-300 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {link.name}
                </span>
              </a>
            ))}
          </div>

          {/* Newsletter Subscription */}
          <div className="flex justify-center md:justify-end">
            <NewsletterForm />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-ink-800/30 text-center">
          <p className="text-xs text-paper-500/60 font-mono">
            {t('copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
