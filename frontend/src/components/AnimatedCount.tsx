import React, { useEffect, useState } from 'react';

interface AnimatedCountProps {
  value: number;
  suffix?: string;
}

export const AnimatedCount: React.FC<AnimatedCountProps> = ({ value, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(value);
      return;
    }

    let frameId = 0;
    let startTime: number | undefined;
    const duration = 1200;

    const animate = (time: number) => {
      startTime ??= time;
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.round(value * progress));

      if (progress < 1) frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, [value]);

  return <span aria-label={`${value.toLocaleString()}${suffix}`}>{count.toLocaleString()}{suffix}</span>;
};
