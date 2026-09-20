// Public identity shared by rendered pages, contact actions, and discovery formats.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.darren-su.com';
export const contactEmail = 'supeng842499467@gmail.com';
export const n8nAmbassadorProfileUrl = 'https://n8n.notion.site/Darren-Su-3d55b6e0c94f8004bd61c80f16eecd46';
export const substackUrl = 'https://darrensu101.substack.com';
export const agiVillaUrl = 'https://agivilla.com';
export const githubProfileUrl = 'https://github.com/SuperSupeng';
export const matchpointUrl = 'https://matchpoint.careers';
export const wechatSelectedUrl = 'https://mp.weixin.qq.com/s/ydALVwE_H_yCp1lywr9Yhw';
export const rssPath = '/rss.xml';

export const socialLinks = [
  ['GitHub', githubProfileUrl],
  ['LinkedIn', 'https://www.linkedin.com/in/darrenzenshipai'],
  ['X', 'https://x.com/zenshipai'],
  ['Instagram', 'https://www.instagram.com/0xdarren_su'],
  ['小红书', 'https://xhslink.cn/m/1JL3lV0NGmO'],
  ['n8n Ambassador', n8nAmbassadorProfileUrl],
] as const;

export const navigationLinks = [
  { href: '/', zh: '首页', en: 'Home' },
  { href: '/blog', zh: '文章', en: 'Writing' },
  { href: '/podcast', zh: '播客', en: 'Podcast' },
  { href: '/projects', zh: '项目', en: 'Projects' },
  { href: '/elsewhere', zh: '别处', en: 'Elsewhere' },
] as const;

export const aboutLink = { href: '/about', zh: '关于我', en: 'About' } as const;
export const collaborateHref = '/services';

export const footerLinks = [...navigationLinks, aboutLink] as const;

export const studioZoneHrefs = {
  work: '/projects',
  build: '/projects',
  notes: '/blog',
} as const;
