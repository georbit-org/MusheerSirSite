import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { ArrowUp } from 'lucide-react';
import 'lenis/dist/lenis.css';

export const SmoothScroll: React.FC = () => {
  const location = useLocation();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.8,
    });

    setLenisInstance(lenis);

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
      setShowScrollTop(window.scrollY > 380);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  // Smoothly reset scroll on route transition
  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, lenisInstance]);

  const scrollToTop = () => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Precision Top Reading Progress Bar */}
      <div
        className="reading-progress-bar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '2.5px',
          background: 'linear-gradient(90deg, var(--accent-sage) 0%, var(--accent-matcha) 100%)',
          zIndex: 9999,
          pointerEvents: 'none',
          transition: 'width 80ms ease-out',
          boxShadow: '0 0 8px rgba(155, 205, 128, 0.6)',
        }}
        aria-hidden="true"
      />

      {/* Floating Scroll to Top Pill */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="scroll-to-top-btn"
          aria-label="Scroll back to top of page"
          title="Back to Top"
        >
          <div className="scroll-progress-ring-wrap">
            <svg className="scroll-progress-ring" viewBox="0 0 36 36">
              <path
                className="scroll-progress-ring__bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="scroll-progress-ring__bar"
                strokeDasharray={`${scrollProgress}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <ArrowUp size={15} strokeWidth={2.5} className="scroll-progress-icon" />
          </div>
        </button>
      )}
    </>
  );
};

