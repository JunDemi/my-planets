import { motion } from 'framer-motion';
import { portfolio } from '@/config/portfolio-data';
import PanelHeading from './PanelHeading';

const ArchitecturePanel = () => {
  return (
    <>
      <PanelHeading
        index={4}
        title='보이지 않는 흐름까지 설계합니다.'
        description='사용자의 요청이 안전하게 콘텐츠에 도달하는 과정을 단순한 구조로 표현했습니다.'
      />
      <div className='mt-9 flex flex-col items-center'>
        {portfolio.architecture.map((node, index) => (
          <div key={node} className='flex w-full flex-col items-center'>
            <div className='relative flex h-14 w-full max-w-sm items-center justify-center rounded-[16px] border border-border-subtle bg-white/[0.035] text-[14px] text-foreground'>
              {node}
              <span className='absolute right-4 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_#8fd3ff]' />
            </div>
            {index < portfolio.architecture.length - 1 && (
              <div className='relative h-7 w-px overflow-hidden bg-white/10'>
                <motion.span
                  className='absolute left-0 top-0 h-1/2 w-px bg-accent'
                  animate={{ y: ['-100%', '250%'] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'linear', delay: index * 0.15 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ArchitecturePanel;
