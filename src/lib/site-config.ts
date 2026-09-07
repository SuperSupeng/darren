// Public identity shared by rendered pages, contact actions, and discovery formats.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.darren-su.com';
export const contactEmail = 'supeng842499467@gmail.com';

export const socialLinks = [
  ['GitHub', 'https://github.com/SuperSupeng'],
  ['LinkedIn', 'https://www.linkedin.com/in/darrenzenshipai'],
  ['X', 'https://x.com/zenshipai'],
  ['Instagram', 'https://www.instagram.com/0xdarren_su'],
  ['小红书', 'https://xhslink.cn/m/1JL3lV0NGmO'],
] as const;

export const navigationLinks = [
  { href: '/', zh: '首页', en: 'Home' },
  { href: '/work', zh: '工作案例', en: 'Work' },
  { href: '/build', zh: '产品', en: 'Products' },
  { href: '/blog', zh: '文章', en: 'Writing' },
  { href: '/services', zh: '合作', en: 'Collaborate' },
  { href: '/about', zh: '关于我', en: 'About' },
] as const;
