'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import ContactActions from '@/components/ContactActions';
import { footerLinks, socialLinks, type FooterPlatform } from '@/lib/site-config';
import { useStudioSettings } from './StudioSettings';

function platformName(item: FooterPlatform) {
  return item.detail ? `${item.label} · ${item.detail}` : item.label;
}

const primaryPlatformNames = new Set(['GitHub', 'LinkedIn', 'X', '公众号 / WeChat']);
const primaryPlatforms = socialLinks.filter(item => primaryPlatformNames.has(item.label));
const morePlatforms = socialLinks.filter(item => !primaryPlatformNames.has(item.label));

function SocialPlatforms({ items }: { items: readonly FooterPlatform[] }) {
  return (
    <ul className="spatial-socials">
      {items.map((item) => {
        const name = platformName(item);
        return (
          <li key={item.label}>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                <span className="spatial-socials-name">{name}</span>
                <span className="spatial-socials-arrow" aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className="spatial-socials-static">
                <span className="spatial-socials-name">{name}</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function SpatialFooter() {
  const locale = useLocale();
  const zh = locale === 'zh';
  const { lighting, setLighting, still, setStill } = useStudioSettings();
  return <footer className="spatial-footer">
    <div className="spatial-footer-top">
      <div className="spatial-footer-intro"><h2><Link href="/about">Darren Su</Link></h2></div>
      <nav className="spatial-footer-map" aria-label={zh ? '网站导航' : 'Site navigation'}>{footerLinks.map(link => <Link key={link.href} href={`${link.href}${lighting === 'evening' ? '?light=evening' : ''}`}>{zh ? link.zh : link.en}</Link>)}<Link href={`/privacy${lighting === 'evening' ? '?light=evening' : ''}`}>{zh ? '隐私' : 'Privacy'}</Link></nav>
      <div className="spatial-footer-contact"><ContactActions locale={locale} context="studio-footer" /></div>
    </div>
    <div className="spatial-footer-socials">
      <SocialPlatforms items={primaryPlatforms} />
      <details className="spatial-footer-more">
        <summary>{zh ? '更多平台' : 'More platforms'}</summary>
        <SocialPlatforms items={morePlatforms} />
      </details>
    </div>
    <div className="spatial-footer-bottom"><span>© {new Date().getFullYear()} Darren Su</span><p>{zh ? '杭州 · 中国' : 'HANGZHOU, CHINA'}</p><a className="spatial-footer-feed" href="/rss.xml">{zh ? '订阅文章' : 'Subscribe to articles'}</a><button type="button" onClick={() => setLighting(lighting === 'day' ? 'evening' : 'day')}>{zh ? lighting === 'day' ? '切换暮色' : '切换日光' : lighting === 'day' ? 'Use dusk theme' : 'Use daylight theme'}</button><button type="button" aria-pressed={still} onClick={() => setStill(!still)}>{still ? zh ? '◇ 开启动效' : '◇ Enable motion' : zh ? '◈ 静态浏览' : '◈ Still view'}</button></div>
  </footer>;
}
