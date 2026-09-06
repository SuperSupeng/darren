'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import ContactActions from '@/components/ContactActions';
import { roomLinks } from './SpatialHeader';
import { useStudioSettings } from './StudioSettings';

const socialLinks = [
  ['GitHub', 'https://github.com/SuperSupeng'],
  ['LinkedIn', 'https://www.linkedin.com/in/darrenzenshipai'],
  ['X', 'https://x.com/zenshipai'],
  ['Instagram', 'https://www.instagram.com/0xdarren_su'],
  ['小红书', 'https://xhslink.cn/m/1JL3lV0NGmO'],
];

export default function SpatialFooter() {
  const locale = useLocale();
  const zh = locale === 'zh';
  const { lighting, still, setStill } = useStudioSettings();
  return <footer className="spatial-footer">
    <div className="spatial-footer-top">
      <div className="spatial-footer-intro"><p className="spatial-kicker">DARREN SU · HANGZHOU</p><h2>{zh ? '保持联系' : 'Let’s keep in touch'}</h2><p>{zh ? '告诉我你在做什么，以及希望我参与的部分。' : 'Tell me what you’re working on and how you’d like me to help.'}</p></div>
      <nav className="spatial-footer-map" aria-label={zh ? '网站导航' : 'Site navigation'}>{roomLinks.map(link => <Link key={link.href} href={`${link.href}${lighting === 'evening' ? '?light=evening' : ''}`}><span>{link.number}</span>{zh ? link.zh : link.en}</Link>)}</nav>
      <div className="spatial-footer-contact"><p className="spatial-kicker">{zh ? '联系我' : 'CONTACT'}</p><ContactActions locale={locale} context="studio-footer" /><div className="spatial-socials">{socialLinks.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noopener noreferrer">{label} ↗</a>)}</div></div>
    </div>
    <div className="spatial-footer-bottom"><span>© {new Date().getFullYear()} Darren Su</span><p>{zh ? '杭州 · 中国' : 'HANGZHOU, CHINA'}</p><a className="spatial-footer-feed" href="/rss.xml">{zh ? '订阅文章 · RSS' : 'Subscribe · RSS'}</a><button type="button" aria-pressed={still} onClick={() => setStill(!still)}>{still ? zh ? '◇ 开启 3D' : '◇ Enable 3D' : zh ? '◈ 静态浏览' : '◈ Still view'}</button></div>
  </footer>;
}
