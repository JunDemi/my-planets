import { portfolio } from '@/config/portfolio-data';
import PanelHeading from './PanelHeading';

const EducationPanel = () => {
  return (
    <>
      <PanelHeading
        index={6}
        title='함께 다음 궤적을 만들어 볼까요?'
        description='새로운 제품, 흥미로운 문제, 프론트엔드에 관한 대화를 언제든 환영합니다.'
      />
      <div className='mt-10 grid grid-cols-2 gap-3'>
        {portfolio.contact.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
            className='rounded-[18px] border border-border-subtle bg-white/[0.035] px-5 py-4 text-[14px] text-foreground transition-all hover:border-accent/60 hover:text-accent'
          >
            {item.label} <span className='float-right'>↗</span>
          </a>
        ))}
      </div>
      <p className='mt-12 text-[11px] uppercase tracking-[0.18em] text-muted'>{portfolio.profile.availability}</p>
    </>
  );
};

export default EducationPanel;
