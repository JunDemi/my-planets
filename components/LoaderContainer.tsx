import { Html, useProgress } from '@react-three/drei';

const LoaderContainer = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className='flex flex-col items-center justify-center gap-[5px] bg-black/70 px-6 py-4 text-white'>
        <span>Loading...</span>
        <span>{progress.toFixed(0)}%</span>
      </div>
    </Html>
  );
};

export default LoaderContainer;
