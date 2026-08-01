import { useMutation, useQuery } from '@tanstack/react-query';
import PanelHeading from './PanelHeading';
import { NSMemo } from '@/types/memo';
import { FormEvent, useState } from 'react';
import { compareTimeFormat } from '@/config/utils';

const GuestbookPanel = () => {
  const [newMemo, setNewMemo] = useState<string>('');

  const { data, isFetching, refetch } = useQuery<NSMemo.Response>({
    queryKey: ['/api/memo/list'],
    queryFn: () => fetch('/api/memo/list').then((res) => res.json()),
  });
  const memoList = data?.result || [];

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      fetch('/api/memo/create', {
        method: 'POST',
        body: JSON.stringify({ message: newMemo }),
      }),
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <div className='absolute inset-8 flex flex-col'>
      <div className='shrink-0 pr-16'>
        <PanelHeading index={7} title='방명록.' description='방문해 주신 흔적을 남겨주세요. 한마디도 큰 힘이 됩니다.' />
      </div>

      <div className='mt-8 min-h-0 flex-1 space-y-3 overflow-y-auto pr-1'>
        {memoList.map((item) => (
          <p
            key={item.id}
            className='flex items-center justify-between gap-4 rounded-[18px] border border-border-subtle bg-white/[0.035] px-5 py-4 text-foreground transition-all hover:border-accent/60 hover:text-accent'
          >
            <span className='text-[12px] font-semibold'>{item.message}</span>
            <span className='shrink-0 text-[12px] font-bold text-white'>{compareTimeFormat(item.date)}</span>
          </p>
        ))}
      </div>

      <form
        className='mt-4 flex w-full shrink-0 items-center gap-[10px] rounded-[18px] border border-border-subtle bg-white/[0.035] px-5 transition-colors'
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
      >
        <input
          type='text'
          value={newMemo}
          onChange={(e) => setNewMemo(e.target.value)}
          placeholder='방명록을 남겨주세요'
          className='flex-1 bg-transparent py-4 text-[13px] text-foreground !outline-none placeholder:text-muted/50 focus:border-accent'
        />
        <button type='submit' className='rounded-full bg-white/[0.05] px-[12px] py-1 text-[12px] text-muted'>
          전송
        </button>
      </form>
    </div>
  );
};

export default GuestbookPanel;
