import { portfolio } from '@/config/portfolio-data';
import PanelHeading from './PanelHeading';

const GalleryPanel = () => {
  return (
    <>
      <PanelHeading
        index={5}
        title='제품의 순간을 전시.'
        description='프로젝트 화면과 디자인, 개발 과정의 다양한 기록입니다.'
      />
      <div className='mt-8 grid grid-cols-2 gap-3 sm:grid-cols-1'>
        {portfolio.projects.map((project, index) => (
          <article
            key={project.name}
            className={`${
              index === 2 ? 'col-span-2 sm:col-span-1' : ''
            } group relative flex h-48 overflow-hidden rounded-[20px] border border-border-subtle bg-scene-panel p-5`}
          >
            <div
              className='absolute inset-0 opacity-40 transition-transform duration-700 group-hover:scale-110'
              style={{
                background: `radial-gradient(circle at ${25 + index * 25}% 35%, ${
                  portfolio.skills[index].color
                }66, transparent 42%)`,
              }}
            />
            <div className='relative mt-auto'>
              <p className='text-[11px] uppercase tracking-[0.18em] text-accent-soft'>Case study</p>
              <h3 className='mt-1 text-[20px] font-semibold text-foreground'>{project.name}</h3>
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default GalleryPanel;
