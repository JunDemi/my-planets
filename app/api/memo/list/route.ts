import { readMemo } from '@/firebase/content';

export async function GET() {
  try {
    const memoList = await readMemo();
    const formattedMemoList = memoList.map(({ id, date, message }) => ({
      id,
      date,
      message,
    }));
    return Response.json({
      status: 'ok',
      result: formattedMemoList,
    });
  } catch (err) {
    console.error('[api/memo] readMemo error:', err);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
