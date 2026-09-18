import { useState, useEffect, useRef, useCallback } from 'react';

export function useCountdown(initialSeconds) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 0) return initialSeconds;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [initialSeconds]);

  const format = useCallback(() => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  }, [seconds]);

  return format();
}
