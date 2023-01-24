import { useState, useRef, useCallback } from 'react';

const useTimer = () => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const countdown = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTime(2);
    intervalRef.current = setInterval(() => {
      setTime(prev => prev - 1);
    }, 500);
  }, []);

  return { time, countdown };
};

export default useTimer;
