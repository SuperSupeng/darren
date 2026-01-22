import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Resend Audience ID - 在 Resend 控制台创建 Audience 后获取
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

// Resend 欢迎邮件模板 ID - 在 Resend 控制台创建 Template 后获取
const WELCOME_TEMPLATE_ID = process.env.RESEND_WELCOME_TEMPLATE_ID;

// 发件人地址 - 需要先在 Resend 验证你的域名
// 如果还没验证域名，可以用 'onboarding@resend.dev' 测试
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // 验证邮箱格式
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // 1. 添加到订阅列表
    if (AUDIENCE_ID) {
      await resend.contacts.create({
        email,
        audienceId: AUDIENCE_ID,
      });
    }

    // 2. 发送欢迎邮件
    if (WELCOME_TEMPLATE_ID) {
      // 使用 Resend Dashboard 创建的模板
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Welcome to Darren\'s Newsletter! 🎉',
        react: undefined, // 使用模板时不需要 react/html
        // @ts-expect-error - Resend 支持 templateId 但类型定义可能不完整
        templateId: WELCOME_TEMPLATE_ID,
        // 可以传递变量给模板（如果模板中使用了变量）
        // data: { name: 'Subscriber' },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
