import { HighlightProvider } from '@/providers';
import { ReactNode } from 'react';
import { act } from 'react-test-renderer';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useEventHighlight } from '@/hooks';
import Chance from 'chance';

const wrapper = ({ children }: { children: ReactNode }) => (
  <HighlightProvider>{children}</HighlightProvider>
);

describe('useEventHighlight', () => {
  it('highlighted event should be set correctly', () => {
    const { result } = renderHook(() => useEventHighlight(), { wrapper });

    const eventId = Chance().string({ length: 32 });
    act(() => result.current.setHighlight(eventId));

    expect(result.current.isHighlighted(eventId)).toBeTruthy();
  });

  it('clearing highlight should remove highlight', () => {
    const { result } = renderHook(() => useEventHighlight(), { wrapper });

    const eventId = Chance().string({ length: 32 });
    act(() => result.current.setHighlight(eventId));
    expect(result.current.isHighlighted(eventId)).toBeTruthy();
    act(() => result.current.clearHighlight());
    expect(result.current.isHighlighted(eventId)).toBeFalsy();
  });

  it('changing highlight should alter stored highlight', () => {
    const { result } = renderHook(() => useEventHighlight(), { wrapper });
    const eventId = Chance().string({ length: 32 });

    act(() => result.current.setHighlight(eventId));
    expect(result.current.isHighlighted(eventId)).toBeTruthy();
    act(() => result.current.setHighlight('new-value'));
    expect(result.current.isHighlighted('new-value')).toBeTruthy();
  });

  it('throws when called outside of provider', () => {
    const ExceptionWrapper = () => {
      expect(useEventHighlight).toThrowError(/must be used within/);
      return <></>;
    };
    render(<ExceptionWrapper />);
  });
});
