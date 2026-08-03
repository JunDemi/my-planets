'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { portfolio } from '@/config/portfolio-data';
import PanelHeading from './PanelHeading';

const ArchitecturePanel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedArchitecture = portfolio.architecture[selectedIndex];

  return (
    <>
      <PanelHeading
        index={4}
        title='시스템 아키텍처.'
        description='기능 뒤에 숨겨진 설계와 기술적인 고민을 공유합니다.'
      />

      <div className='mt-8 grid grid-cols-2 gap-2 sm:grid-cols-1'>
        {portfolio.architecture.map((architecture, index) => {
          const isSelected = selectedIndex === index;

          return (
            <button
              key={architecture.title}
              type='button'
              onClick={() => setSelectedIndex(index)}
              aria-pressed={isSelected}
              className={`rounded-[16px] border px-4 py-3 text-left transition-colors ${
                isSelected
                  ? 'border-accent/60 bg-accent/10'
                  : 'border-border-subtle bg-white/[0.025] hover:border-white/25 hover:bg-white/[0.04]'
              }`}
            >
              <span
                className={`block text-[13px] font-medium tracking-[0.14em] ${
                  isSelected ? 'text-accent' : 'text-muted'
                }`}
              >
                {architecture.category}
              </span>
              <span className='mt-1.5 block text-[13px] font-medium text-foreground'>{architecture.title}</span>
            </button>
          );
        })}
      </div>

      <motion.div
        key={selectedArchitecture.title}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className='mt-6 rounded-[22px] border border-border-subtle bg-white/[0.025] p-5'
      >
        <div className='border-b border-border-subtle pb-5'>
          <p className='text-[11px] font-medium uppercase tracking-[0.16em] text-accent-soft'>
            {selectedArchitecture.category}
          </p>
          <h3 className='mt-2 text-[20px] font-semibold tracking-[-0.02em] text-foreground'>
            {selectedArchitecture.title}
          </h3>
          <p className='mt-3 text-[13px] leading-6 text-muted'>{selectedArchitecture.description}</p>
        </div>

        <div className='mt-6 flex flex-col items-center'>
          {selectedArchitecture.flow.map((node, index) => (
            <div key={node} className='flex w-full flex-col items-center'>
              <div className='relative flex h-14 w-full max-w-sm items-center justify-center rounded-[16px] border border-border-subtle bg-white/[0.035] px-10 text-center text-[14px] text-foreground'>
                {node}
                <span className='absolute right-4 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_#8fd3ff]' />
              </div>
              {index < selectedArchitecture.flow.length - 1 && (
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
      </motion.div>
    </>
  );
};

export default ArchitecturePanel;
