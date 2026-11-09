import React, { useEffect, useState } from 'react';

interface AnimatedCountProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export const AnimatedCount: React.FC<AnimatedCountProps> = ({
  value,
  suffix = '',
  duration = 1200,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || value <= 0) {
      setCount(value);
      return;
    }

    let frameId = 0;
    let startTime: number | undefined;
    const animate = (timestamp: number) => {
      startTime ??= timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      setCount(Math.round(value * easedProgress));

      if (progress < 1) frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, [duration, value]);

  return <>{count.toLocaleString()}{suffix}</>;
};
