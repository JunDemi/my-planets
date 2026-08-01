import { portfolio } from '@/config/portfolio-data';
import PanelHeading from './PanelHeading';
import Image from 'next/image';

const AboutPanel = () => {
  return (
    <>
      <PanelHeading
        index={0}
        title='나를 소개합니다.'
        description='개발자로서의 가치관과 만들어왔던 경험을 소개합니다.'
      />
      <div className='mt-8 flex items-stretch gap-[10px]'>
        <Image
          src='/profile/my.jpeg'
          alt=''
          width={94}
          height={94}
          className='rounded-[10px] border border-accent-soft object-cover'
        />
        <div className='flex flex-col gap-[5px]'>
          {portfolio.intro.map((item, i) => (
            <div
              key={i}
              className='rounded-full border border-border-subtle bg-white/[0.05] px-[12px] py-[4px] text-[12px] text-muted'
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className='mt-8 grid grid-cols-2 gap-3'>
        {portfolio.stats.map((stat) => (
          <article key={stat.label} className='rounded-[20px] border border-border-subtle bg-white/[0.035] p-5'>
            <p className='text-[32px] font-semibold tracking-[-0.04em] text-foreground'>{stat.value}</p>
            <p className='mt-2 text-[12px] leading-5 text-muted'>{stat.label}</p>
          </article>
        ))}
      </div>
    </>
  );
};

export default AboutPanel;
