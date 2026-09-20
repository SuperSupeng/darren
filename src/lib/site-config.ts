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
export const matchpointUrl = 'https://matchpoint.careers';
export const wechatSelectedUrl = 'https://mp.weixin.qq.com/s/ydALVwE_H_yCp1lywr9Yhw';
export const rssPath = '/rss.xml';

export const personAffiliations = ['MatchPoint', 'AGI Villa', 'Datawhale', 'n8n'] as const;

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

export function getPersonJobTitle(locale: string) {
  return locale === 'zh'
    ? 'MatchPoint 联合创始人、AGI Villa 联合创始人、Datawhale 城市生态负责人、n8n Ambassador、《重新组织》主持人'
    : 'MatchPoint Co-founder, AGI Villa Co-founder, Head of City Ecosystem at Datawhale, n8n Ambassador, Host of Re:Organize';
}

export function getPersonOccupations(locale: string) {
  return locale === 'zh'
    ? [
        'MatchPoint 联合创始人',
        'AGI Villa 联合创始人',
        'Datawhale 城市生态负责人',
        'n8n Ambassador',
        '《重新组织》主持人',
      ]
    : [
        'MatchPoint Co-founder',
        'AGI Villa Co-founder',
        'Head of City Ecosystem at Datawhale',
        'n8n Ambassador',
        'Host of Re:Organize',
      ];
}

export const socialLinks = [
  ['GitHub', githubProfileUrl],
  ['LinkedIn', linkedinProfileUrl],
  ['X', xProfileUrl],
  ['Instagram', instagramProfileUrl],
  ['小红书', 'https://xhslink.cn/m/1JL3lV0NGmO'],
  ['n8n Ambassador', n8nAmbassadorProfileUrl],
] as const;

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
