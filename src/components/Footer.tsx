'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Logo from './Logo';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'X',
      href: 'https://x.com/zenshipai',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      label: 'Ins',
      href: 'https://www.instagram.com/0xdarren_su',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect width="16" height="16" x="4" y="4" rx="4" strokeWidth={1.7} />
          <circle cx="12" cy="12" r="3.2" strokeWidth={1.7} />
          <path strokeLinecap="round" strokeWidth={1.7} d="M17.2 6.8h.01" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/darrenzenshipai',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.942v5.664H9.351V9h3.414v1.561h.047c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.371 4.267 5.455v6.286zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM7.114 20.452H3.558V9h3.556v11.452z" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/8618846436143',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.868-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.224-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
          <path d="M12.051 2C6.477 2 1.949 6.528 1.949 12.102c0 1.781.465 3.522 1.348 5.056L2 22l4.967-1.303a10.064 10.064 0 0 0 5.084 1.374h.004c5.573 0 10.102-4.528 10.102-10.101C22.157 6.397 17.628 2 12.051 2zm.004 18.369h-.004a8.372 8.372 0 0 1-4.267-1.168l-.306-.181-2.947.773.787-2.873-.199-.295a8.367 8.367 0 0 1-1.462-4.523c0-4.638 3.774-8.412 8.414-8.412 2.247 0 4.359.875 5.948 2.464a8.358 8.358 0 0 1 2.464 5.95c-.002 4.638-3.776 8.265-8.428 8.265z" />
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
    <footer className="relative overflow-hidden bg-paper-100 px-4 py-12 text-ink-950 md:px-6 md:py-14">
      <div className="absolute inset-x-0 top-0 h-px bg-ink-950/10" />
      <div className="container relative z-10">
        <div className="grid gap-10 md:grid-cols-[0.82fr_1.18fr] md:items-start">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Link href="/" className="flex items-center gap-2.5 group">
              <Logo size={24} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium text-lg">Darren<span className="text-zen-gold">.</span>Su</span>
            </Link>
            <p className="max-w-[280px] text-center text-xs leading-relaxed text-ink-600/70 md:text-left">
              {t('bio')}
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 md:items-end">
            <p className="academy-kicker text-ink-600/58">{t('contactTitle')}</p>
            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end lg:flex-nowrap">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.name === 'Email' ? undefined : '_blank'}
                  rel={link.name === 'Email' ? undefined : 'noopener noreferrer'}
                  className="group relative flex h-11 min-w-11 items-center gap-2 rounded-[6px] border border-ink-700/10 bg-paper-200/42 px-2.5 text-sm text-ink-600 transition-colors duration-200 hover:border-zen-gold/30 hover:bg-paper-200/64 hover:text-zen-gold-dim"
                  aria-label={link.name}
                >
                  {link.icon}
                  <span>{link.label ?? link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-ink-700/10 pt-6 text-center md:mt-14">
          <p className="font-mono text-xs text-ink-600/55">
            {t('copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
