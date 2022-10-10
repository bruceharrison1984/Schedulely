import { ComponentSize } from '@/types/ComponentSize';
import { useLayoutEffect, useRef, useState } from 'react';

export default function useResizeObserver() {
  const observedRef = useRef(null);
  const breakpoints = { small: 500, large: 800 };
  const [breakSize, setBreakSize] = useState<ComponentSize>('small');

  useLayoutEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      if (width <= breakpoints.small) setBreakSize('small');
      if (width > breakpoints.small && width < breakpoints.large)
        setBreakSize('medium');
      if (width >= breakpoints.large) setBreakSize('large');
    });

    if (observer && observedRef.current) {
      observer.observe(observedRef.current);
    }

    return () => {
      if (observer && observedRef.current) {
        observer.unobserve(observedRef.current);
      }
      observer.disconnect();
    };
  }, [observedRef]);

  return { observedRef, breakSize };
}
