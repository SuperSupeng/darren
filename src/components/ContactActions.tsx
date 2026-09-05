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
  const manualEmailRef = useRef<HTMLInputElement>(null);
  const copy = locale === 'zh'
    ? { email: '给我写邮件', copy: '复制邮箱', copied: '邮箱已复制', failed: '请复制下方邮箱地址', address: '邮箱地址，可手动复制' }
    : { email: 'Email me', copy: 'Copy email', copied: 'Email copied', failed: 'Please copy the address below', address: 'Email address for manual copying' };
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
    resetTimerRef.current = didCopy
      ? window.setTimeout(() => setCopyStatus('idle'), 2400)
      : null;
  };

  useEffect(() => {
    if (copyStatus === 'failed') {
      manualEmailRef.current?.focus();
      manualEmailRef.current?.select();
    }
  }, [copyStatus]);

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
      {copyStatus === 'failed' ? (
        <input
          ref={manualEmailRef}
          type="text"
          readOnly
          value={email}
          aria-label={copy.address}
          onFocus={(event) => event.currentTarget.select()}
          className={`w-full min-w-0 basis-full rounded border bg-transparent px-3 py-3 text-base ${variant === 'dark' || variant === 'quiet' ? 'border-paper-100/35 text-paper-100' : 'border-ink-700/30 text-ink-950'}`}
        />
      ) : null}
      <span className="sr-only" role="status" aria-live="polite">
        {copyStatus === 'copied' ? copy.copied : copyStatus === 'failed' ? copy.failed : ''}
      </span>
    </div>
  );
}
