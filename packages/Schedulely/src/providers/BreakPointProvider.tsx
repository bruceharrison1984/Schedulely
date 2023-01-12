import { BreakpointContextState, ComponentSize } from '@/types';
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

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
  const [breakpoint, setBreakpoint] = useState<ComponentSize | undefined>();
  const resizeObserver = useRef<ResizeObserver | undefined>();

  const onResize: ResizeObserverCallback = useCallback((entries) => {
    const breakpoints = { small: 500, large: 800 };
    const { width } = entries[0].contentRect;

    if (width <= breakpoints.small) setBreakpoint('small');
    if (width > breakpoints.small && width < breakpoints.large)
      setBreakpoint('medium');
    if (width >= breakpoints.large) setBreakpoint('large');
  }, []);

  useEffect(() => {
    resizeObserver.current = new ResizeObserver(onResize);
  }, [onResize]);

  useEffect(() => {
    if (containerRef?.current) {
      resizeObserver.current!.observe(containerRef?.current);
    }

    return () => {
      resizeObserver.current!.disconnect();
    };
  }, [containerRef]);

  const value: BreakpointContextState = {
    breakpoint,
  };

  return (
    <BreakpointContext.Provider value={value}>
      {children}
    </BreakpointContext.Provider>
  );
};
