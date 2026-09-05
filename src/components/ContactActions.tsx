'use client';

import { track } from '@vercel/analytics';
import { useEffect, useRef, useState } from 'react';

const email = 'supeng842499467@gmail.com';

type ContactActionsProps = {
  locale: string;
  context: string;
  variant?: 'dark' | 'light' | 'quiet';
  className?: string;
  emailSubject?: string;
  emailBody?: string;
};

export default function ContactActions({
  locale,
  context,
  variant = 'light',
  className = '',
  emailSubject,
  emailBody,
}: ContactActionsProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const resetTimerRef = useRef<number | null>(null);
  const copy = locale === 'zh'
    ? { email: '给我写邮件', copy: '复制邮箱', copied: '邮箱已复制', failed: '复制失败，请手动复制' }
    : { email: 'Email me', copy: 'Copy email', copied: 'Email copied', failed: 'Copy failed—please copy manually' };
  const emailQuery = [
    emailSubject ? `subject=${encodeURIComponent(emailSubject)}` : '',
    emailBody ? `body=${encodeURIComponent(emailBody)}` : '',
  ].filter(Boolean).join('&');

  const copyEmail = async () => {
    let didCopy = false;

    try {
      await navigator.clipboard.writeText(email);
      didCopy = true;
    } catch {
      const input = document.createElement('textarea');
      input.value = email;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.opacity = '0';
      try {
        document.body.appendChild(input);
        input.select();
        didCopy = document.execCommand('copy');
      } catch {
        didCopy = false;
      } finally {
        input.remove();
      }
    }

    setCopyStatus(didCopy ? 'copied' : 'failed');
    if (didCopy) track('Contact Email Copied', { location: context, locale });
    if (resetTimerRef.current !== null) window.clearTimeout(resetTimerRef.current);
    resetTimerRef.current = window.setTimeout(() => setCopyStatus('idle'), 2400);
  };

  useEffect(() => () => {
    if (resetTimerRef.current !== null) window.clearTimeout(resetTimerRef.current);
  }, []);

  const emailClass = variant === 'dark'
    ? 'btn bg-paper-100 text-ink-950 shadow-none hover:bg-paper-200'
    : variant === 'quiet'
      ? 'quiet-contact-email'
      : 'btn bg-ink-950 text-paper-100 shadow-none hover:bg-ink-800';
  const copyClass = variant === 'dark'
    ? 'quiet-link-inverse'
    : variant === 'quiet'
      ? 'quiet-contact-copy'
      : 'quiet-link';

  return (
    <div className={`contact-actions ${className}`.trim()}>
      <a
        href={`mailto:${email}${emailQuery ? `?${emailQuery}` : ''}`}
        className={emailClass}
        onClick={() => track('Contact Email Opened', { location: context, locale })}
      >
        {variant === 'quiet' ? email : copy.email}
        {variant === 'quiet' ? ' ↗' : ''}
      </a>
      <button type="button" className={copyClass} onClick={copyEmail}>
        {copyStatus === 'copied' ? copy.copied : copyStatus === 'failed' ? copy.failed : copy.copy}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copyStatus === 'copied' ? copy.copied : copyStatus === 'failed' ? copy.failed : ''}
      </span>
    </div>
  );
}
