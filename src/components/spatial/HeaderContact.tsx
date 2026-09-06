'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from '@/i18n/navigation';
import ContactActions from '@/components/ContactActions';
import './header-contact.css';

export default function HeaderContact({ locale, menuOpen, onOpen }: { locale: string; menuOpen: boolean; onOpen: () => void }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const zh = locale === 'zh';

  useEffect(() => {
    detailsRef.current?.removeAttribute('open');
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) detailsRef.current?.removeAttribute('open');
  }, [menuOpen]);

  useEffect(() => {
    const dismissOutside = (event: PointerEvent) => {
      const details = detailsRef.current;
      if (details?.open && event.target instanceof Node && !details.contains(event.target)) details.open = false;
    };
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && detailsRef.current?.open) {
        event.stopPropagation();
        detailsRef.current.open = false;
        summaryRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', dismissOutside);
    document.addEventListener('keydown', dismissOnEscape);
    return () => {
      document.removeEventListener('pointerdown', dismissOutside);
      document.removeEventListener('keydown', dismissOnEscape);
    };
  }, []);

  return <details ref={detailsRef} className="spatial-header-contact" onToggle={event => { if (event.currentTarget.open) onOpen(); }}>
    <summary ref={summaryRef} className="spatial-contact-trigger" aria-label={zh ? '联系 Darren' : 'Contact Darren'}>
      <svg viewBox="0 0 20 20" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" aria-hidden="true"><rect x="2.5" y="4.5" width="15" height="11" rx="1.5" /><path d="m3 5 7 6 7-6" /></svg>
      <span>{zh ? '联系我' : 'Contact'}</span>
    </summary>
    <div className="spatial-contact-panel">
      <h2>{zh ? '联系 Darren' : 'Contact Darren'}</h2>
      <p>{zh ? '欢迎介绍你的团队和想做的事。点击邮箱写信，或复制地址。' : 'Tell me about your team and what you have in mind. Click the email address to write, or copy it.'}</p>
      <ContactActions locale={locale} context="header-contact" variant="quiet" className="spatial-contact-options" />
    </div>
  </details>;
}
