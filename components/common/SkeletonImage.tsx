'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

interface SkeletonImageProps extends Omit<ImageProps, 'onLoad' | 'onLoadingComplete'> {
  onImageLoad?: () => void;
  skeletonClassName?: string;
  wrapperClassName?: string;
}

const SkeletonImage = ({
  className = '',
  skeletonClassName = '',
  wrapperClassName = '',
  alt,
  src,
  onImageLoad,
  ...props
}: SkeletonImageProps) => {
  const [loadedSrc, setLoadedSrc] = useState<ImageProps['src'] | null>(null);
  const loaded = loadedSrc === src;

  return (
    <div className={`relative h-full w-full overflow-hidden ${wrapperClassName}`}>
      {!loaded && <Skeleton className={`absolute inset-0 z-[1] ${skeletonClassName}`} />}
      <Image
        {...props}
        src={src}
        alt={alt}
        onLoad={() => {
          setLoadedSrc(src);
          onImageLoad?.();
        }}
        className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

export default SkeletonImage;

interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className = '' }: SkeletonProps) => {
  return (
    <div
      aria-hidden='true'
      className={`flex items-center justify-center animate-pulse bg-gradient-to-r from-white/[0.04] via-white/[0.08] to-white/[0.04] ${className}`}
    >
      <span className='text-[10px] text-white'>이미지를 불러오는 중입니다...</span>
    </div>
  );
};
