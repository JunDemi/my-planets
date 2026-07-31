import { Html } from '@react-three/drei';

const LoaderContainer = ({ progress }: { progress: number }) => {

  return (
    <Html center>
      <div className='flex flex-col items-center justify-center gap-[5px] bg-black/70 px-6 py-4 text-white'>
        <span className='text-[16px]'>Loading...</span>
        <div className='flex items-center gap-[10px]'>
          <div className='relative h-[2px] w-[200px] bg-accent-soft/20'>
            <div
              style={{ width: `${progress}%` }}
              className='absolute h-full bg-accent-soft transition-all duration-300'
            />
          </div>
          <span className='text-[12px]'>{progress.toFixed(0)}%</span>
        </div>
      </div>
    </Html>
  );
};

export default LoaderContainer;
