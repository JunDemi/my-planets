import { Suspense, useEffect, useState } from 'react';
import LoaderContainer from './LoaderContainer';
import { useProgress } from '@react-three/drei';

const SuspenceContainer = ({ children }: { children: React.ReactNode }) => {
  const { progress, active } = useProgress();
  const isLoading = active || progress < 100;

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const id = setTimeout(() => {
        setReady(true);
      }, 300);

      return () => clearTimeout(id);
    }
  }, [isLoading]);

  return ready ? <Suspense fallback={null}>{children}</Suspense> : <LoaderContainer progress={progress} />;
};

export default SuspenceContainer;
