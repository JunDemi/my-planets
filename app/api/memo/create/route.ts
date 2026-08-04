import { createMemo } from '@/firebase/content';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return Response.json({ error: '잘못된 요청 본문' }, { status: 400 });
    }

    await createMemo(message as string);

    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: '서버 오류' }, { status: 500 });
  }
}
