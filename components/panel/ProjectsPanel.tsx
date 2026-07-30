import { portfolio } from '@/config/portfolio-data';
import PanelHeading from './PanelHeading';

const ProjectsPanel = () => {
  return (
    <>
      <PanelHeading
        index={3}
        title='문제를 해결하고 결과를 남긴 프로젝트.'
        description='제품 목표, 사용자 경험, 기술적 선택을 하나의 이야기로 연결합니다.'
      />
      <div className='mt-8 space-y-3'>
        {portfolio.projects.map((project) => (
          <article
            key={project.name}
            className='group rounded-[20px] border border-border-subtle bg-white/[0.03] p-5 transition-colors hover:border-accent/40'
          >
            <div className='flex items-start justify-between gap-4'>
              <div>
                <p className='text-[11px] uppercase tracking-[0.18em] text-accent-soft'>{project.type}</p>
                <h3 className='mt-1 text-[20px] font-semibold text-foreground'>{project.name}</h3>
              </div>
              <span className='text-white/15 text-[24px]'>{project.index}</span>
            </div>
            <p className='mt-3 text-[14px] leading-6 text-muted'>{project.description}</p>
            <div className='mt-4 flex flex-wrap gap-1.5'>
              {project.stack.map((technology) => (
                <span key={technology} className='rounded-full bg-white/[0.05] px-2.5 py-1 text-[11px] text-muted'>
                  {technology}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default ProjectsPanel;
