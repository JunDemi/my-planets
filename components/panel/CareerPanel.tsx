import { portfolio } from '@/config/portfolio-data';
import PanelHeading from './PanelHeading';

const CareerPanel = () => {
  return (
    <>
      <PanelHeading
        index={1}
        title='경험을 하나의 궤적으로.'
        description='각 역할에서 얻은 배움을 다음 제품의 더 나은 의사결정으로 연결해 왔습니다.'
      />
      <div className='mt-8 border-l border-border-subtle pl-6'>
        {portfolio.career.map((item) => (
          <article key={item.company} className='relative pb-7 last:pb-0'>
            <span className='absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_16px_#8fd3ff]' />
            <p className='text-[11px] uppercase tracking-[0.18em] text-accent-soft'>{item.period}</p>
            <h3 className='mt-1.5 text-[18px] font-semibold text-foreground'>
              {item.company} <span className='font-normal text-muted'>· {item.role}</span>
            </h3>
            <p className='mt-2 text-[14px] leading-6 text-muted'>{item.summary}</p>
          </article>
        ))}
      </div>
    </>
  );
};

export default CareerPanel;
