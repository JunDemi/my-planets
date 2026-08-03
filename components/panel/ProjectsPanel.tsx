import { portfolio } from '@/config/portfolio-data';
import PanelHeading from './PanelHeading';
import { useCallback } from 'react';

const ProjectsPanel = () => {
  
  const moveGallery = useCallback(() => {
    window.history.replaceState(null, '', `#gallery`);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }, []);

  return (
    <>
      <PanelHeading index={3} title='프로젝트.' description='팀원들과 함께 아이디어를 서비스로 구현한 결과물입니다.' />
      <div className='mt-8 space-y-5'>
        {portfolio.projects.map((project) => (
          <div
            key={project.name}
            onClick={moveGallery}
            className='group cursor-pointer overflow-hidden rounded-[24px] border border-border-subtle bg-white/[0.025] transition-colors hover:border-accent/40'
          >
            <div className='relative border-b border-border-subtle p-6'>
              <span className='absolute right-5 top-4 text-[42px] font-semibold leading-none tracking-[-0.06em] text-white/[0.06] transition-colors group-hover:text-accent/10'>
                {project.index}
              </span>
              <div className='pr-14'>
                <p className='text-[13px] font-medium uppercase tracking-[0.18em] text-accent-soft'>{project.type}</p>
                <div className='mt-2 flex items-center gap-[6px]'>
                  <span className='text-[13px] tracking-tighter text-white/70'>{project.period}</span>
                  <span className='text-[13px] tracking-tighter text-accent'>[ {project.member}명 ]</span>
                </div>
                <div className='flex items-center gap-[10px]'>
                  <h3 className='text-[24px] font-semibold tracking-[-0.03em] text-foreground'>{project.name}</h3>
                  <div className='flex w-fit items-center justify-between gap-4 rounded-[16px] border border-border-subtle bg-white/[0.025] px-4 py-1'>
                    <p className='text-[13px] font-medium text-foreground'>{project.role}</p>
                  </div>
                </div>
                <p className='mt-2 max-w-lg text-[14px] leading-6 text-muted'>{project.description}</p>
              </div>
            </div>

            <div className='p-6'>
              <div className='flex items-stretch gap-[30px]'>
                <div className='w-[120px]'>
                  <h4 className='text-[12px] font-medium uppercase tracking-[0.16em] text-accent-soft'>핵심 기능</h4>
                  <ul className='mt-3 flex flex-col gap-[4px]'>
                    {project.keyFeatures.map((feature) => (
                      <li key={feature} className='flex gap-2.5 text-[13px] leading-5 text-muted'>
                        <span className='mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='flex-1'>
                  <h4 className='text-[12px] font-medium uppercase tracking-[0.16em] text-accent-soft'>기여 내용</h4>
                  <ul className='mt-3 flex flex-col gap-[4px]'>
                    {project.contributions.map((con, i) => (
                      <li key={i} className='flex gap-2.5 text-[13px] leading-5 text-muted'>
                        <span className='mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent' />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className='mt-6 border-t border-border-subtle pt-5'>
                <p className='mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-muted'>Stack</p>
                <div className='flex flex-wrap gap-2'>
                  {project.stack.map((technology) => (
                    <span
                      key={technology}
                      className='rounded-full border border-border-subtle bg-white/[0.035] px-3 py-1.5 text-[11px] text-foreground'
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProjectsPanel;
