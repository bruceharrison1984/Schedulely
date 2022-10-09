import { ComponentSize } from '@/types/ComponentSize';
import { useLayoutEffect, useRef, useState } from 'react';

export default function useResizeObserver() {
  const observedRef = useRef(null);
  const breakpoints = { small: 500, large: 800 };
  const [breakSize, setBreakSize] = useState<ComponentSize>('small');

  const observer = useRef(
    new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      if (width <= breakpoints.small) setBreakSize('small');
      if (width > breakpoints.small && width < breakpoints.large)
        setBreakSize('medium');
      if (width >= breakpoints.large) setBreakSize('large');
    })
  );

  useLayoutEffect(() => {
    if (observedRef.current) {
      observer.current.observe(observedRef.current);
    }

    return () => {
      if (observedRef.current) {
        observer.current.unobserve(observedRef.current);
      }
    };
  }, [observedRef, observer]);

  return { observedRef, breakSize };
}
