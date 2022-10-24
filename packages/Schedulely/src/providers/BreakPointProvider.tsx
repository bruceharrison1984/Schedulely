import { ComponentSize } from '..';
import { ReactNode, createContext, useEffect, useRef, useState } from 'react';

type BreakpointContextState = {
  containerRef?: React.MutableRefObject<null>;
  breakpoint: ComponentSize;
};

export const BreakpointContext = createContext<BreakpointContextState | null>(
  null
);
BreakpointContext.displayName = 'BreakpointContext';

/**
 * Determine the rough size of the component by measuring a container
 * @param {ReactNode} children Child nodes
 * @returns BreakPoint component
 */
export const BreakpointProvider = ({
  containerRef,
  children,
}: {
  containerRef: React.MutableRefObject<null>;
  children: ReactNode;
}) => {
  const breakpoints = { small: 500, large: 800 };
  const [breakpoint, setBreakpoint] = useState<ComponentSize>('small');

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      if (width <= breakpoints.small) setBreakpoint('small');
      if (width > breakpoints.small && width < breakpoints.large)
        setBreakpoint('medium');
      if (width >= breakpoints.large) setBreakpoint('large');
    });

    if (observer && containerRef?.current) {
      observer.observe(containerRef?.current);
    }

    return () => {
      if (observer && containerRef?.current) {
        observer.unobserve(containerRef?.current);
      }
      observer.disconnect();
    };
  }, [containerRef]);

  const value: BreakpointContextState = {
    containerRef,
    breakpoint,
  };

  return (
    <BreakpointContext.Provider value={value}>
      {children}
    </BreakpointContext.Provider>
  );
};
