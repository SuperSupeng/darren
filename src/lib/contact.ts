import { contactEmail } from './site-config';

export function createEmailHref(subject?: string, body?: string) {
  const query = [
    subject ? `subject=${encodeURIComponent(subject)}` : '',
    body ? `body=${encodeURIComponent(body)}` : '',
  ].filter(Boolean).join('&');
  return `mailto:${contactEmail}${query ? `?${query}` : ''}`;
}

export function getConsultingInquiry(locale: string, topic?: string) {
  const zh = locale === 'zh';
  const emailSubject = zh ? `咨询：${topic ?? '想和你讨论一个问题'}` : `Consulting: ${topic ?? 'A question for my team'}`;
  const emailBody = zh
    ? `Darren，你好：\n\n${topic ? `我想咨询：${topic}。\n\n` : ''}我的团队或产品：\n\n目前想解决的问题：\n\n已经做过的尝试：\n\n`
    : `Hi Darren,\n\n${topic ? `I’d like to discuss ${topic}.\n\n` : ''}My team or product:\n\nThe problem I’d like to discuss:\n\nWhat we have tried:\n\n`;
  return { emailSubject, emailBody, href: createEmailHref(emailSubject, emailBody) };
}
