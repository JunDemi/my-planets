import { Suspense } from 'react';
import { useProgress } from '@react-three/drei';
import LoaderContainer from './LoaderContainer';

const LoaderFallback = () => {
  const { progress } = useProgress();
  return <LoaderContainer progress={progress} />;
};

const SuspenceContainer = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<LoaderFallback />}>{children}</Suspense>;
};

export default SuspenceContainer;
