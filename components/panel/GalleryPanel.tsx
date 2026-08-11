'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { portfolio, storageUrl } from '@/config/portfolio-data';
import SkeletonImage from '../common/SkeletonImage';
import PanelHeading from './PanelHeading';

const GalleryPanel = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [loadedImageIndex, setLoadedImageIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const selectedGallery = selectedIndex === null ? null : portfolio.gallery[selectedIndex];

  const selectedImageLoaded = selectedImageIndex === loadedImageIndex;
  const adjacentImageIndexes =
    selectedGallery !== null && selectedImageIndex !== null && selectedImageLoaded && selectedGallery.images.length > 1
      ? Array.from(
          new Set([
            (selectedImageIndex - 1 + selectedGallery.images.length) % selectedGallery.images.length,
            (selectedImageIndex + 1) % selectedGallery.images.length,
          ]),
        )
      : [];

  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopImmediatePropagation();
        setSelectedImageIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [selectedImageIndex]);

  const showPreviousImage = () => {
    if (selectedGallery === null || selectedImageIndex === null) return;
    setLoadedImageIndex(null);
    setSelectedImageIndex((selectedImageIndex - 1 + selectedGallery.images.length) % selectedGallery.images.length);
  };

  const showNextImage = () => {
    if (selectedGallery === null || selectedImageIndex === null) return;
    setLoadedImageIndex(null);
    setSelectedImageIndex((selectedImageIndex + 1) % selectedGallery.images.length);
  };

  return (
    <>
      <AnimatePresence mode='wait' initial={false}>
        {selectedGallery === null ? (
          <motion.div
            key='gallery-list'
            initial={reducedMotion ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, x: -12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <PanelHeading
              index={5}
              title='프로젝트 사진첩.'
              description='프로젝트 개발 과정 및 결과물들을 전시합니다.'
            />

            <div className='mt-8 grid grid-cols-2 gap-3'>
              {portfolio.gallery.map((gallery, index) => (
                <button
                  key={gallery.name}
                  type='button'
                  onClick={() => setSelectedIndex(index)}
                  className='group overflow-hidden rounded-[20px] border border-border-subtle bg-white/[0.025] text-left transition-colors hover:border-accent/40'
                >
                  <div className='relative aspect-[4/3] overflow-hidden bg-scene-panel'>
                    <SkeletonImage
                      src={`${storageUrl}/gallery${gallery.images[0]}`}
                      alt=''
                      fill
                      sizes='270px'
                      unoptimized
                      className='object-cover transition-transform duration-700 group-hover:scale-105'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-surface-deep/80 via-transparent to-transparent' />
                    <span className='absolute bottom-3 right-3 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[10px] text-white backdrop-blur-md'>
                      {gallery.images.length} images
                    </span>
                  </div>

                  <div className='flex items-end justify-between gap-3 p-4'>
                    <div>
                      <p className='text-[12px] font-medium uppercase tracking-[0.16em] text-accent-soft'>
                        {gallery.case}
                      </p>
                      <h3 className='mt-1.5 text-[16px] font-semibold text-foreground'>{gallery.name}</h3>
                    </div>
                    <span className='text-[18px] text-muted transition-transform group-hover:translate-x-1'>→</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={selectedGallery.name}
            initial={reducedMotion ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, x: 16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <button
              type='button'
              onClick={() => setSelectedIndex(null)}
              className='flex items-center gap-2 text-[12px] font-medium text-muted transition-colors hover:text-foreground'
            >
              <span aria-hidden='true'>←</span>
              프로젝트 목록
            </button>

            <div className='mt-7 border-b border-border-subtle pb-6'>
              <p className='text-[11px] font-medium uppercase tracking-[0.16em] text-accent-soft'>
                {selectedGallery.case}
              </p>
              <div className='mt-2 flex items-end justify-between gap-4'>
                <h2 className='text-[28px] font-semibold tracking-[-0.04em] text-foreground'>{selectedGallery.name}</h2>
                <span className='shrink-0 text-[11px] text-muted'>{selectedGallery.images.length} images</span>
              </div>
            </div>

            <div className='mt-6 grid grid-cols-1 gap-4'>
              {selectedGallery.images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type='button'
                  onClick={() => {
                    setLoadedImageIndex(null);
                    setSelectedImageIndex(index);
                  }}
                  className='group overflow-hidden rounded-[18px] border border-border-subtle bg-white/[0.025] text-left transition-colors hover:border-accent/40'
                  aria-label={`${selectedGallery.name} 프로젝트 이미지 ${index + 1} 크게 보기`}
                >
                  <div className='relative aspect-[16/10] bg-scene-panel'>
                    <SkeletonImage
                      src={`${storageUrl}/gallery${image}`}
                      alt={`${selectedGallery.name} 프로젝트 이미지 ${index + 1}`}
                      fill
                      sizes='540px'
                      unoptimized
                      className='object-contain transition-transform duration-500 group-hover:scale-[1.02]'
                    />
                    <span className='absolute bottom-3 right-3 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[10px] text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100'>
                      크게 보기
                    </span>
                  </div>
                  <span className='block px-4 py-3 text-[11px] text-muted'>
                    {String(index + 1).padStart(2, '0')} / {String(selectedGallery.images.length).padStart(2, '0')}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedGallery !== null &&
        selectedImageIndex !== null &&
        createPortal(
          <motion.div
            className='fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 backdrop-blur-md'
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageIndex(null)}
            role='dialog'
            aria-modal='true'
            aria-label={`${selectedGallery.name} 이미지 크게 보기`}
          >
            <button
              type='button'
              onClick={() => setSelectedImageIndex(null)}
              className='border-white/15 absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-black/40 text-[20px] text-white transition-colors hover:border-white/40'
              aria-label='이미지 닫기'
            >
              ×
            </button>

            {selectedGallery.images.length > 1 && (
              <>
                <button
                  type='button'
                  onClick={(event) => {
                    event.stopPropagation();
                    showPreviousImage();
                  }}
                  className='border-white/15 absolute left-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border bg-black/40 text-[22px] text-white transition-colors hover:border-white/40'
                  aria-label='이전 이미지'
                >
                  ←
                </button>
                <button
                  type='button'
                  onClick={(event) => {
                    event.stopPropagation();
                    showNextImage();
                  }}
                  className='border-white/15 absolute right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border bg-black/40 text-[22px] text-white transition-colors hover:border-white/40'
                  aria-label='다음 이미지'
                >
                  →
                </button>
              </>
            )}

            <motion.div
              key={selectedImageIndex}
              className='relative h-[min(82vh,900px)] w-[min(88vw,1400px)]'
              initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
            >
              <SkeletonImage
                src={`${storageUrl}/gallery${selectedGallery.images[selectedImageIndex]}`}
                alt={`${selectedGallery.name} 프로젝트 이미지 ${selectedImageIndex + 1}`}
                fill
                sizes='88vw'
                unoptimized
                className='object-contain'
                onImageLoad={() => setLoadedImageIndex(selectedImageIndex)}
              />
              <div className='absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent px-4 pb-2 pt-12 text-[12px] text-white'>
                <span>{selectedGallery.name}</span>
                <span>
                  {String(selectedImageIndex + 1).padStart(2, '0')} /{' '}
                  {String(selectedGallery.images.length).padStart(2, '0')}
                </span>
              </div>
            </motion.div>
            {adjacentImageIndexes.map((index) => (
              <div
                key={selectedGallery.images[index]}
                aria-hidden='true'
                className='pointer-events-none fixed h-px w-px opacity-0'
              >
                <Image
                  src={`${storageUrl}/gallery${selectedGallery.images[index]}`}
                  alt=''
                  fill
                  sizes='88vw'
                  unoptimized
                />
              </div>
            ))}
          </motion.div>,
          document.body,
        )}
    </>
  );
};

export default GalleryPanel;
