import { portfolio } from '@/config/portfolio-data';
import PanelHeading from './PanelHeading';

const AboutPanel = () => {
  return (
    <>
      <PanelHeading
        index={0}
        title='복잡함을 느끼지 않게 하는 인터페이스.'
        description='사용자에게는 직관적인 흐름을, 팀에는 확장 가능한 구조를 제공하는 제품을 만듭니다.'
      />
      <div className='mt-8 grid grid-cols-3 gap-3 sm:grid-cols-1'>
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
