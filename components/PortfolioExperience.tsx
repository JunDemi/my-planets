'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useSyncExternalStore } from 'react';
import BasicThreeScene from './BasicThreeScene';
import AboutPanel from './panel/AboutPanel';
import CareerPanel from './panel/CareerPanel';
import SkillsPanel from './panel/SkillsPanel';
import ProjectsPanel from './panel/ProjectsPanel';
import ArchitecturePanel from './panel/ArchitecturePanel';
import GalleryPanel from './panel/GalleryPanel';
import ContactPanel from './panel/ContactPanel';
import PlanetNavigation from './PlanetNavigation';
import { getHashSnapshot, getServerHashSnapshot, subscribeToHash } from '@/config/utils';
import { destinations } from '@/config/portfolio-data';

const panels = [
  <AboutPanel key='about' />,
  <CareerPanel key='career' />,
  <SkillsPanel key='skills' />,
  <ProjectsPanel key='projects' />,
  <ArchitecturePanel key='architecture' />,
  <GalleryPanel key='gallery' />,
  <ContactPanel key='contact' />,
];

const PortfolioExperience = () => {
  const reducedMotion = useReducedMotion();
  const activeHash = useSyncExternalStore(subscribeToHash, getHashSnapshot, getServerHashSnapshot);
  const destinationIndex = destinations.findIndex((destination) => destination.id === activeHash);
  const activeIndex = destinationIndex >= 0 ? destinationIndex : null;

  const selectDestination = useCallback((index: number) => {
    window.history.replaceState(null, '', `#${destinations[index].id}`);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }, []);

  const showMap = useCallback(() => {
    window.history.replaceState(null, '', window.location.pathname);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') showMap();
      if (event.key === 'ArrowRight')
        selectDestination(activeIndex === null ? 0 : (activeIndex + 1) % destinations.length);
      if (event.key === 'ArrowLeft')
        selectDestination(
          activeIndex === null
            ? destinations.length - 1
            : (activeIndex - 1 + destinations.length) % destinations.length,
        );
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, selectDestination, showMap]);

  return (
    <main className='relative h-screen overflow-hidden bg-surface-scene text-foreground'>
      <BasicThreeScene activeIndex={activeIndex} onSelect={selectDestination} />

      <header className='pointer-events-none fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between px-7 sm:px-5'>
        <button
          type='button'
          onClick={showMap}
          className='pointer-events-auto text-14m uppercase tracking-widest text-foreground'
        >
          JP<span className='text-accent'>.</span>
        </button>
        <button
          type='button'
          onClick={showMap}
          className={`bg-surface-scene/65 pointer-events-auto rounded-full border border-border-subtle px-4 py-2 text-[11px] uppercase tracking-[0.16em] backdrop-blur-md transition-colors hover:border-accent/50 ${
            activeIndex === null ? 'text-accent' : 'text-muted'
          }`}
        >
          Universe map
        </button>
      </header>

      <AnimatePresence mode='wait'>
        {activeIndex === null ? (
          <motion.section
            key='map'
            className='pointer-events-none fixed inset-0 z-10 flex items-center px-7 sm:items-start sm:pt-28'
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className='max-w-xl'>
              <p className='text-14m uppercase text-accent-soft'>Interactive portfolio · 2026</p>
              <h1 className='mt-5 text-[clamp(52px,7vw,96px)] font-semibold leading-[0.9] tracking-[-0.06em] text-foreground'>
                Frontend
                <br />
                <span className='text-accent'>Universe.</span>
              </h1>
              <p className='mt-7 max-w-md text-16r text-muted'>
                행성을 선택해 Jungwok Park의 경험, 기술과 프로젝트를 탐험해 보세요.
              </p>
              <p className='mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted'>
                <span className='h-px w-8 bg-accent-soft' />
                Click any planet to travel
              </p>
            </div>
          </motion.section>
        ) : (
          <motion.section
            key={destinations[activeIndex].id}
            className='bg-surface-scene/82 pointer-events-auto fixed bottom-24 right-6 top-24 z-30 w-[min(610px,calc(100vw-48px))] overflow-y-auto rounded-[28px] border border-border-subtle p-8 shadow-2xl backdrop-blur-2xl scrollbar-hide sm:bottom-20 sm:right-4 sm:top-[38%] sm:w-[calc(100vw-32px)] sm:p-6'
            initial={reducedMotion ? false : { opacity: 0, x: 48, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type='button'
              onClick={showMap}
              className='absolute right-6 top-6 z-10 rounded-full border border-border-subtle px-3 py-1.5 text-[11px] text-muted transition-colors hover:text-foreground'
              aria-label='Close section and return to universe map'
            >
              ESC
            </button>
            {panels[activeIndex]}
          </motion.section>
        )}
      </AnimatePresence>

      <PlanetNavigation activeIndex={activeIndex} onSelect={selectDestination} />
      <p className='pointer-events-none fixed bottom-7 right-7 z-40 text-[10px] uppercase tracking-[0.16em] text-white/30 md:hidden'>
        ← → Navigate · ESC Map
      </p>
    </main>
  );
};

export default PortfolioExperience;
