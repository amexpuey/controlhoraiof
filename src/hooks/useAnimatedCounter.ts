import { useEffect, useState } from 'react';

export function useAnimatedCounter(
  targetValue: number,
  duration: number = 1000,
  startDelay: number = 300
) {
  const [currentValue, setCurrentValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const startAnimation = () => {
      setIsAnimating(true);
      const startTime = Date.now();
      const startValue = 0;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(startValue + (targetValue - startValue) * easeOutCubic);
        
        setCurrentValue(value);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };
      
      requestAnimationFrame(animate);
    };

    const timer = setTimeout(startAnimation, startDelay);
    return () => clearTimeout(timer);
  }, [targetValue, duration, startDelay]);

  return { currentValue, isAnimating };
}