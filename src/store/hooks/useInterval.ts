import { useEffect, useRef } from 'react';

const useInterval = (callback: () => void, delay: number | null): void => {
  const savedCallback = useRef<() => void>(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const id: NodeJS.Timeout = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;