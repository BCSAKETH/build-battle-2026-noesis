import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal — Extraordinary Bidirectional (Front & Reverse) Scroll Animation
 * Animates elements smoothly when scrolling down AND gracefully responds when scrolling up (reverse).
 * Pure CSS transitions with IntersectionObserver and scroll velocity direction.
 */
export function ScrollReveal({
  children,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'scale'
  distance = 36, // pixel translation
  duration = 0.7, // seconds
  delay = 0, // seconds
  threshold = 0.15,
  blur = true,
  className = '',
  style = {}
}) {
  const domRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDir, setScrollDir] = useState('down'); // 'down' | 'up'

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY + 4) {
        setScrollDir('down');
      } else if (currentScrollY < lastScrollY - 4) {
        setScrollDir('up');
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            // Re-trigger when scrolling past or reversing back
            if (entry.boundingClientRect.top > 0) {
              setIsVisible(false);
            }
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const el = domRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold]);

  // Directional translation offset calculation
  const getInitialTransform = () => {
    const d = scrollDir === 'up' ? -distance * 0.7 : distance;
    switch (direction) {
      case 'up':
        return `translate3d(0, ${d}px, 0)`;
      case 'down':
        return `translate3d(0, ${-d}px, 0)`;
      case 'left':
        return `translate3d(${d}px, 0, 0)`;
      case 'right':
        return `translate3d(${-d}px, 0, 0)`;
      case 'scale':
        return `translate3d(0, ${d * 0.5}px, 0) scale(0.95)`;
      default:
        return `translate3d(0, ${d}px, 0)`;
    }
  };

  return (
    <div
      ref={domRef}
      className={`scroll-reveal-item ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : getInitialTransform(),
        filter: blur ? (isVisible ? 'blur(0px)' : 'blur(4px)') : 'none',
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, filter ${duration}s ease-out ${delay}s`,
        willChange: 'opacity, transform, filter',
        ...style
      }}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;
