'use client';

import { usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export default function AiAvatarChat() {
  const pathname = usePathname();
  const t = useTranslations('chat');
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    });
  }, []);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    scrollToBottom();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data?.error ?? t('errorGeneric') },
        ]);
        return;
      }
      if (data.message?.content) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.message.content }]);
        scrollToBottom();
      }
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: t('errorGeneric') }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, t, scrollToBottom]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // 仅首页显示
  if (pathname !== '/') return null;

  return (
    <>
      {/* 右下角浮动小形象 */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-ink-600 bg-ink-800/90 shadow-xl shadow-black/30 backdrop-blur-md animate-float transition-all duration-300 hover:scale-105 hover:border-zen-gold/50 hover:shadow-[0_0_24px_var(--glow-gold)] focus:outline-none focus:ring-2 focus:ring-zen-gold/50 focus:ring-offset-2 focus:ring-offset-ink-950 md:bottom-8 md:right-8 md:h-16 md:w-16"
        aria-label={t('openLabel')}
      >
        <span className="relative block h-10 w-10 overflow-hidden rounded-full md:h-12 md:w-12">
          <Image
            src="/photo.jpg"
            alt=""
            fill
            sizes="48px"
            className="object-cover"
            priority
          />
        </span>
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink-800 bg-geek-green" title={t('online')} />
      </button>

      {/* 对话抽屉 */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <aside
            className="fixed bottom-0 right-0 z-50 flex h-[85vh] w-full flex-col rounded-t-2xl border border-ink-700 bg-ink-900 shadow-2xl md:bottom-8 md:right-8 md:h-[520px] md:w-[400px] md:rounded-2xl"
            role="dialog"
            aria-label={t('drawerLabel')}
          >
            {/* 头部 */}
            <div className="flex shrink-0 items-center justify-between border-b border-ink-700 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="relative h-9 w-9 overflow-hidden rounded-full">
                  <Image src="/photo.jpg" alt="" width={36} height={36} className="object-cover" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink-900 bg-geek-green" />
                </span>
                <div>
                  <p className="font-medium text-paper-100">{t('title')}</p>
                  <p className="text-xs text-paper-400">{t('subtitle')}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-paper-400 transition-colors hover:bg-ink-700 hover:text-paper-100"
                aria-label={t('closeLabel')}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 消息列表 */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              {messages.length === 0 && (
                <p className="text-center text-sm text-paper-400 py-8">{t('placeholder')}</p>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === 'user'
                        ? 'bg-zen-gold/20 text-paper-100 border border-zen-gold/30'
                        : 'bg-ink-700 text-paper-200 border border-ink-600'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-ink-700 border border-ink-600 px-4 py-2.5 text-sm text-paper-400">
                    <span className="cursor-blink">{t('thinking')}</span>
                  </div>
                </div>
              )}
            </div>

            {/* 输入区 */}
            <div className="shrink-0 border-t border-ink-700 p-3">
              <div className="flex gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('inputPlaceholder')}
                  rows={1}
                  className="input min-h-[44px] flex-1 resize-none py-3"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="btn btn-primary self-end px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={t('sendLabel')}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
