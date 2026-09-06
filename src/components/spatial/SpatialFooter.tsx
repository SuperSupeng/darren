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
      <div className="spatial-footer-intro"><p className="spatial-kicker">DARREN SU · HANGZHOU</p><h2>{zh ? '有空，再来坐坐。' : 'There’s always a seat.'}</h2><p>{zh ? '连接人，做产品，也留一点思考的余地。' : 'Bringing people together, making things, and leaving room to think.'}</p></div>
      <nav className="spatial-footer-map" aria-label={zh ? '工作室地图' : 'Studio map'}>{roomLinks.map(link => <Link key={link.href} href={`${link.href}${lighting === 'evening' ? '?light=evening' : ''}`}><span>{link.number}</span>{zh ? link.zh : link.en}</Link>)}</nav>
      <div className="spatial-footer-contact"><p className="spatial-kicker">{zh ? '保持联系' : 'KEEP IN TOUCH'}</p><ContactActions locale={locale} context="studio-footer" /><div className="spatial-socials">{socialLinks.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noopener noreferrer">{label} ↗</a>)}</div></div>
    </div>
    <div className="spatial-footer-bottom"><span>© {new Date().getFullYear()} Darren Su</span><p>{zh ? '杭州 · 中国 / 山边工作室' : 'HANGZHOU, CHINA / HILLSIDE STUDIO'}</p><button type="button" aria-pressed={still} onClick={() => setStill(!still)}>{still ? zh ? '◇ 开启 3D' : '◇ Enable 3D' : zh ? '◈ 静态浏览' : '◈ Still view'}</button></div>
  </footer>;
}
