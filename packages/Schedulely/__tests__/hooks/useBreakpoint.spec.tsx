import { BreakpointProvider } from '@/providers/BreakPointProvider';
import { ReactNode, useRef } from 'react';
import { act } from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks';
import { useBreakpoint } from '@/hooks';

const wrapper = ({ children }: { children: ReactNode }) => {
  const containerRef = useRef(null);
  return (
    <div
      data-testid="parentContainer"
      ref={containerRef}
      style={{ width: 900 }}
    >
      <BreakpointProvider containerRef={containerRef}>
        {children}
      </BreakpointProvider>
    </div>
  );
};

xdescribe('useBreakpoint', () => {
  it('show large breakpoint', () => {
    const { result } = renderHook(() => useBreakpoint(), {
      wrapper,
    });
    act(() => {
      console.log(document.querySelector('*'));

      expect(result.current.breakpoint).toEqual('large');
    });
  });
});
