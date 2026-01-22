'use client';

import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterForm() {
  const t = useTranslations('subscribe');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        // 3秒后重置状态
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="text-sm font-medium text-paper-200 mb-2">
        {t('title')}
      </h3>
      <p className="text-xs text-paper-400 mb-3">
        {t('description')}
      </p>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('placeholder')}
          disabled={status === 'loading' || status === 'success'}
          className="flex-1 px-3 py-2 text-sm bg-ink-800/50 border border-ink-700/50 rounded-lg 
                     text-paper-200 placeholder:text-paper-500
                     focus:outline-none focus:border-zen-gold/50 focus:ring-1 focus:ring-zen-gold/20
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200"
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success' || !email}
          className="px-4 py-2 text-sm font-medium bg-zen-gold/10 border border-zen-gold/30 rounded-lg
                     text-zen-gold hover:bg-zen-gold/20 hover:border-zen-gold/50
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200"
        >
          {status === 'loading' ? (
            <span className="inline-flex items-center gap-1">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </span>
          ) : status === 'success' ? (
            <span className="inline-flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>
          ) : (
            t('button')
          )}
        </button>
      </form>

      {/* 状态提示 */}
      {status === 'success' && (
        <p className="mt-2 text-xs text-green-400">{t('success')}</p>
      )}
      {status === 'error' && (
        <p className="mt-2 text-xs text-red-400">订阅失败，请稍后再试</p>
      )}
    </div>
  );
}
