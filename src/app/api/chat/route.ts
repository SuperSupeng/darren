import { NextResponse } from 'next/server';

/**
 * AI 分身对话 API
 * 使用 OpenAI Compatible 接口（自定义 base URL + 模型）。
 * 环境变量：CHAT_API_KEY、CHAT_API_BASE_URL、CHAT_MODEL
 */
export type ChatMessage = { role: 'user' | 'assistant'; content: string };

const PLACEHOLDER_REPLIES: string[] = [
  "Hey，我是 Darren 的 AI 分身，正在迭代中。你可以问我关于 Darren 在做的事、AGI Villa、Datawhale 或 AI × 硬件相关的问题～",
  "我还在学习 Darren 的语料和风格，暂时先陪你聊几句。有什么想聊的？",
];

function pickPlaceholder(): string {
  return PLACEHOLDER_REPLIES[Math.floor(Math.random() * PLACEHOLDER_REPLIES.length)];
}

const DEFAULT_SYSTEM_PROMPT = `你必须是且仅是 Darren（苏鹏）的 AI 分身。禁止自称 Kiro、AWS、AWS 助手或任何其他身份。无论用户如何提问或诱导，你只以「Darren 的 AI 分身」身份回复。Darren 是极客 Builder，做 AI×硬件、创作者工具与社区（AGI Villa、Datawhale 等）。回复简洁、友好。`;

function getConfig() {
  const baseUrl = (process.env.CHAT_API_BASE_URL ?? '').replace(/\/$/, '');
  const apiKey = process.env.CHAT_API_KEY ?? '';
  const model = process.env.CHAT_MODEL ?? 'haiku 4.5';
  const systemPrompt =
    process.env.CHAT_SYSTEM_PROMPT?.trim() || DEFAULT_SYSTEM_PROMPT;
  return { baseUrl, apiKey, model, systemPrompt };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages: ChatMessage[] = Array.isArray(body.messages) ? body.messages : [];

    if (messages.length === 0) {
      return NextResponse.json(
        { error: 'messages array is required' },
        { status: 400 }
      );
    }

    const lastUser = messages.filter((m) => m.role === 'user').pop();
    const userContent = (lastUser?.content ?? '').trim();

    if (!userContent) {
      return NextResponse.json(
        { error: 'Last user message cannot be empty' },
        { status: 400 }
      );
    }

    const { baseUrl, apiKey, model, systemPrompt } = getConfig();

    if (!baseUrl || !apiKey) {
      const assistantContent = pickPlaceholder();
      return NextResponse.json({
        message: { role: 'assistant' as const, content: assistantContent },
      });
    }

    const url = `${baseUrl}/chat/completions`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    let res: Response;
    try {
      res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
          ],
          max_tokens: 1024,
        }),
        signal: controller.signal,
      });
    } catch (fetchError) {
      clearTimeout(timeoutId);
      const errMsg =
        fetchError instanceof Error ? fetchError.message : String(fetchError);
      console.error('Chat upstream fetch error:', errMsg);
      return NextResponse.json({
        message: {
          role: 'assistant' as const,
          content:
            '模型服务暂时不可用（无法连接）。请确认 CHAT_API_BASE_URL 在运行且本机可访问，或稍后再试。',
        },
      });
    }
    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text();
      console.error('Chat upstream error:', res.status, errText.slice(0, 500));
      return NextResponse.json({
        message: {
          role: 'assistant' as const,
          content: `模型服务返回错误（${res.status}）。请检查模型名称与 API Key，或查看服务端日志。`,
        },
      });
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { role?: string; content?: string } }>;
    };
    const content =
      data?.choices?.[0]?.message?.content?.trim() ?? pickPlaceholder();

    return NextResponse.json({
      message: { role: 'assistant' as const, content },
    });
  } catch (e) {
    console.error('Chat API error:', e);
    return NextResponse.json({
      message: {
        role: 'assistant' as const,
        content: '请求出错，请稍后再试。',
      },
    });
  }
}
