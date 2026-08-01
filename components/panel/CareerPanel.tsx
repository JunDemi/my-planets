import { portfolio } from '@/config/portfolio-data';
import PanelHeading from './PanelHeading';

const CareerPanel = () => {
  return (
    <>
      <PanelHeading index={1} title='경력.' description='프론트엔드 개발자로써 몸 담았던 여정을 소개합니다.' />
      <div className='mt-8 border-l border-border-subtle pl-6'>
        {portfolio.career.map((item) => (
          <div key={item.company} className='relative pb-7 last:pb-0'>
            <span className='absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_16px_#8fd3ff]' />
            <p className='text-[11px] uppercase tracking-[0.18em] text-accent-soft'>{item.period}</p>
            <div className='mt-1.5 text-foreground'>
              <span className='text-[18px] font-semibold'>{item.company} </span>
              <span className='text-[13px] font-normal text-muted'>· {item.role}</span>
            </div>
            <div className='mt-2'>
              {item.summary.map((sum, i) => (
                <p key={i} className='text-[14px] leading-6 text-muted'>
                  {sum}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CareerPanel;
