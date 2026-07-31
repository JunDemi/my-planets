import { portfolio } from '@/config/portfolio-data';
import PanelHeading from './PanelHeading';

const ContactPanel = () => {
  return (
    <>
      <PanelHeading
        index={6}
        title='함께 다음 궤적을 만들어 볼까요?'
        description='새로운 제품, 흥미로운 문제, 프론트엔드에 관한 대화를 언제든 환영합니다.'
      />
      <div className='mt-10 grid grid-cols-2 gap-3'>
        {portfolio.contact.map((item, i) => (
          <p
            key={item.label}
            className='flex flex-col justify-center rounded-[18px] border border-border-subtle bg-white/[0.035] px-5 py-4 text-foreground transition-all hover:border-accent/60 hover:text-accent'
          >
            <span className='text-[12px] font-semibold'>{item.label}</span>
            <span
              className={`text-[12px] font-bold text-white ${i === 3 ? 'cursor-pointer underline' : 'cursor-default'}`}
              onClick={() => i === 3 && window.open(item.value, '_blank')}
            >
              {item.value}
            </span>
          </p>
        ))}
      </div>
    </>
  );
};

export default ContactPanel;
