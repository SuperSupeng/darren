'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import ContactActions from '@/components/ContactActions';
import { navigationLinks as roomLinks, socialLinks } from '@/lib/site-config';
import { useStudioSettings } from './StudioSettings';

export default function SpatialFooter() {
  const locale = useLocale();
  const zh = locale === 'zh';
  const { lighting, still, setStill } = useStudioSettings();
  return <footer className="spatial-footer">
    <div className="spatial-footer-top">
      <div className="spatial-footer-intro"><h2><Link href="/about">Darren Su</Link></h2></div>
      <nav className="spatial-footer-map" aria-label={zh ? '网站导航' : 'Site navigation'}>{roomLinks.map(link => <Link key={link.href} href={`${link.href}${lighting === 'evening' ? '?light=evening' : ''}`}>{zh ? link.zh : link.en}</Link>)}</nav>
      <div className="spatial-footer-contact"><ContactActions locale={locale} context="studio-footer" /><div className="spatial-socials">{socialLinks.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noopener noreferrer">{label} ↗</a>)}</div></div>
    </div>
    <div className="spatial-footer-bottom"><span>© {new Date().getFullYear()} Darren Su</span><p>{zh ? '杭州 · 中国' : 'HANGZHOU, CHINA'}</p><a className="spatial-footer-feed" href="/rss.xml">{zh ? '订阅文章' : 'Subscribe to articles'}</a><button type="button" aria-pressed={still} onClick={() => setStill(!still)}>{still ? zh ? '◇ 开启动效' : '◇ Enable motion' : zh ? '◈ 静态浏览' : '◈ Still view'}</button></div>
  </footer>;
}
