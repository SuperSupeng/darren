'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';

interface LogEntry {
  date: string;
  content: string;
}

// 日志类型配置
const logTypes = [
  { prefix: 'INFO', color: 'text-geek-cyan' },
  { prefix: 'BUILD', color: 'text-geek-green' },
  { prefix: 'SHIP', color: 'text-zen-gold' },
  { prefix: 'DEBUG', color: 'text-paper-500' },
];

export default function BuildLog() {
  const t = useTranslations('build');
  const logs = t.raw('log.entries') as LogEntry[];
  const [visibleLogs, setVisibleLogs] = useState<number>(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // 逐条显示日志效果
  useEffect(() => {
    if (visibleLogs < logs.length) {
      const timer = setTimeout(() => {
        setVisibleLogs(prev => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [visibleLogs, logs.length]);

  // 自动滚动到底部
  useEffect(() => {
    if (isAutoScrolling && terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleLogs, isAutoScrolling]);

  // 获取随机日志类型
  const getLogType = (index: number) => {
    return logTypes[index % logTypes.length];
  };

  // 格式化时间戳
  const formatTimestamp = (date: string) => {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
  };

  return (
    <section className="section relative">
      <div className="container max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-zen-gold/50" />
            <span className="text-zen-gold text-xl">⟡</span>
            <h2 className="text-2xl md:text-3xl font-medium">
              {t('log.title')}
            </h2>
            <span className="text-zen-gold text-xl">⟡</span>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-zen-gold/50" />
          </div>
          <p className="text-paper-400 text-sm">
            {t('log.description')}
          </p>
        </div>

        {/* Log Terminal */}
        <div className="relative">
          <div className="rounded-2xl border border-ink-700/50 bg-ink-900/90 backdrop-blur-sm overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-ink-700/50 bg-ink-800/70">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" />
                </div>
                <span className="text-xs text-paper-500 font-mono">~/darren/build.log — zsh</span>
              </div>
              
              {/* Terminal Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                  className={`text-xs font-mono px-2 py-1 rounded transition-colors ${
                    isAutoScrolling ? 'text-geek-green bg-geek-green/10' : 'text-paper-500 hover:text-paper-300'
                  }`}
                >
                  {isAutoScrolling ? '● LIVE' : '○ PAUSED'}
                </button>
              </div>
            </div>

            {/* Terminal Content */}
            <div 
              ref={terminalRef}
              className="p-6 font-mono text-sm max-h-[500px] overflow-y-auto custom-scrollbar bg-gradient-to-b from-ink-900/50 to-ink-900"
            >
              {/* Initial command */}
              <div className="text-paper-500 mb-4 flex items-center gap-2">
                <span className="text-geek-purple">darren@macbook</span>
                <span className="text-paper-600">:</span>
                <span className="text-geek-blue">~/projects</span>
                <span className="text-paper-600">$</span>
                <span className="text-paper-200 ml-1">tail -f build.log</span>
              </div>
              
              {/* Separator */}
              <div className="border-b border-ink-700/30 mb-4 pb-2">
                <span className="text-paper-600 text-xs">--- Build Log Started ---</span>
              </div>
              
              {/* Log entries with animation */}
              <div className="space-y-3">
                {logs.slice(0, visibleLogs).map((entry, index) => {
                  const logType = getLogType(index);
                  const isLatest = index === visibleLogs - 1;
                  
                  return (
                    <div 
                      key={index}
                      className={`group flex items-start gap-3 hover:bg-ink-800/30 -mx-2 px-2 py-2 rounded-lg transition-all duration-300 ${
                        isLatest ? 'animate-fade-in-up bg-ink-800/20' : ''
                      }`}
                    >
                      {/* Timestamp */}
                      <span className="shrink-0 text-paper-600 text-xs w-16 pt-0.5">
                        {formatTimestamp(entry.date)}
                      </span>
                      
                      {/* Log Type */}
                      <span className={`shrink-0 text-xs font-bold w-14 pt-0.5 ${logType.color}`}>
                        [{logType.prefix}]
                      </span>
                      
                      {/* Date Badge */}
                      <span className="shrink-0 px-2 py-0.5 rounded bg-ink-800/60 text-geek-green/80 text-xs">
                        {entry.date}
                      </span>
                      
                      {/* Content */}
                      <span className="text-paper-300 group-hover:text-paper-100 transition-colors leading-relaxed">
                        {entry.content}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Loading indicator while streaming */}
              {visibleLogs < logs.length && (
                <div className="mt-4 flex items-center gap-2 text-paper-500">
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 bg-geek-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-geek-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-geek-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                  <span className="text-xs">Loading more logs...</span>
                </div>
              )}

              {/* Cursor - only show when all logs loaded */}
              {visibleLogs >= logs.length && (
                <div className="mt-6 flex items-center gap-2">
                  <span className="text-geek-purple">darren@macbook</span>
                  <span className="text-paper-600">:</span>
                  <span className="text-geek-blue">~/projects</span>
                  <span className="text-paper-600">$</span>
                  <span className="w-2.5 h-5 bg-geek-cyan/80 animate-pulse ml-1" />
                </div>
              )}
            </div>

            {/* Terminal Footer Stats */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-ink-700/30 bg-ink-800/30 text-xs font-mono text-paper-500">
              <span>{visibleLogs} / {logs.length} entries</span>
              <span>Last update: just now</span>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -inset-4 bg-gradient-to-r from-zen-gold/5 via-transparent to-geek-cyan/5 rounded-3xl blur-xl -z-10" />
          
          {/* Reflection effect */}
          <div className="absolute -bottom-8 left-4 right-4 h-8 bg-gradient-to-t from-transparent to-ink-900/20 rounded-b-2xl blur-sm -z-10" />
        </div>
      </div>
    </section>
  );
}
