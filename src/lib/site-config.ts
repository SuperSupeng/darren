// Public identity shared by rendered pages, contact actions, and discovery formats.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.darren-su.com';
export const contactEmail = 'supeng842499467@gmail.com';
export const personName = 'Darren Su';
export const personAlternateNames = ['苏鹏', 'Darren'] as const;
export const personDisplayName = 'Darren Su / 苏鹏';
export const n8nAmbassadorProfileUrl = 'https://n8n.notion.site/Darren-Su-3d55b6e0c94f8004bd61c80f16eecd46';
export const substackUrl = 'https://darrensu101.substack.com';
export const agiVillaUrl = 'https://agivilla.com';
export const githubProfileUrl = 'https://github.com/SuperSupeng';
export const linkedinProfileUrl = 'https://www.linkedin.com/in/darrenzenshipai';
export const xProfileUrl = 'https://x.com/zenshipai';
export const instagramProfileUrl = 'https://www.instagram.com/0xdarren_su';
export const threadsProfileUrl = 'https://www.threads.net/@0xdarren_su';
export const zhihuProfileUrl = 'https://www.zhihu.com/people/superssssss';
export const wechatSelectedUrl = 'https://mp.weixin.qq.com/s/ydALVwE_H_yCp1lywr9Yhw';
export const youtubeUrl = 'https://www.youtube.com/@darren_su';
export const bilibiliUrl = 'https://space.bilibili.com/358177309';
export const rssPath = '/rss.xml';

export const personAffiliations = ['AGI Villa', 'MatchPoint', 'Datawhale', 'n8n'] as const;

export const personTitles = {
  zh: ['AGI Villa & MatchPoint 联合创始人', 'Datawhale 城市生态负责人', 'n8n Ambassador'],
  en: ['Co-founder, AGI Villa & MatchPoint', 'Head of City Ecosystem, Datawhale', 'n8n Ambassador'],
} as const;

export const personSameAs = [
  siteUrl,
  githubProfileUrl,
  xProfileUrl,
  threadsProfileUrl,
  substackUrl,
  zhihuProfileUrl,
  `${instagramProfileUrl}/`,
  linkedinProfileUrl,
] as const;

export const personProfileLinks = [
  ['Website', siteUrl],
  ['GitHub', githubProfileUrl],
  ['X', xProfileUrl],
  ['Threads', threadsProfileUrl],
  ['Substack', substackUrl],
  ['知乎', zhihuProfileUrl],
  ['Instagram', `${instagramProfileUrl}/`],
  ['LinkedIn', linkedinProfileUrl],
  ['n8n Ambassador', n8nAmbassadorProfileUrl],
] as const;

export function getPersonOccupations(locale: string) {
  return locale === 'zh' ? [...personTitles.zh] : [...personTitles.en];
}

export function getAboutRoles(locale: string) {
  return locale === 'zh'
    ? [...personTitles.zh, '《重新组织》主持人']
    : [...personTitles.en, 'Host of Re:Organize'];
}

export function getPersonJobTitle(locale: string) {
  return getPersonOccupations(locale).join(' · ');
}

export type FooterPlatform = {
  label: string;
  href?: string;
  detail?: string;
};

// One shared list for both locales. Entries without href render as text.
export const socialLinks: readonly FooterPlatform[] = [
  { label: 'GitHub', href: githubProfileUrl },
  { label: 'LinkedIn', href: linkedinProfileUrl },
  { label: 'X', href: xProfileUrl },
  { label: 'Instagram', href: instagramProfileUrl },
  { label: '小红书', href: 'https://xhslink.cn/m/1JL3lV0NGmO' },
  { label: 'n8n Ambassador', href: n8nAmbassadorProfileUrl },
  { label: 'Substack', href: substackUrl },
  { label: '公众号 / WeChat', href: wechatSelectedUrl },
  { label: '抖音', href: 'https://www.douyin.com/user/MS4wLjABAAAA0d1aGLhG9NnpnfnNkfV4RUKpAHWyLiQrDf2S6W0Pqj4' },
  { label: '即刻', href: 'https://web.okjike.com/u/03212cf6-2692-420e-be04-b512a0108dad' },
  { label: 'Threads', href: threadsProfileUrl },
  { label: '知乎', href: zhihuProfileUrl },
  { label: 'YouTube', href: youtubeUrl },
  { label: 'Bilibili', href: bilibiliUrl, detail: 'Darren的创业田野' },
  { label: '视频号', detail: 'Darren 的创业田野' },
];

export const navigationLinks = [
  { href: '/', zh: '首页', en: 'Home' },
  { href: '/blog', zh: '文章', en: 'Writing' },
  { href: '/podcast', zh: '播客', en: 'Podcast' },
  { href: '/projects', zh: '项目', en: 'Projects' },
] as const;

export const aboutLink = { href: '/about', zh: '关于我', en: 'About' } as const;
export const collaborateHref = '/services';

export const footerLinks = [...navigationLinks, aboutLink] as const;

export const studioZoneHrefs = {
  work: '/projects',
  build: '/projects',
  notes: '/blog',
} as const;
