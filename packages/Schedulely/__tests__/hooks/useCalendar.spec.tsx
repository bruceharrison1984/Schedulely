import { CalendarProvider } from '@/providers';
import { ComponentSize } from '@/types';
import { ReactNode } from 'react';
import { createDefaultAdapter } from '@/dateAdapters';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useCalendar } from '@/hooks';

/* These tests are expected to be ran against the default date adapter in the US locale */

const mockOnMonthChangeClick = jest.fn();
jest.mock('@/hooks/useActions', () => ({
  useActions: jest.fn(() => ({
    onMonthChangeClick: mockOnMonthChangeClick,
  })),
}));

let mockBreakpoint: ComponentSize = 'large';
jest.mock('@/hooks/useBreakpoint', () => ({
  useBreakpoint: jest.fn(() => ({
    breakpoint: mockBreakpoint,
  })),
}));

const testDate = new Date(2023, 1, 14);

const wrapper = ({ children }: { children: ReactNode }) => (
  <CalendarProvider
    dateAdapter={createDefaultAdapter()}
    initialDate={testDate.toISOString()}
    calendarEvents={[]}
  >
    {children}
  </CalendarProvider>
);

describe('useCalendar', () => {
  it('currentDate should return correct date', () => {
    const { result } = renderHook(() => useCalendar(), { wrapper });
    expect(result.current.currentDate).toEqual(testDate);
  });

  it('currentYear should return correct value', () => {
    const { result } = renderHook(() => useCalendar(), { wrapper });
    expect(result.current.currentYear).toEqual(testDate.getFullYear());
  });

  describe('currentMonth should return correct value', () => {
    it('for "small" size', () => {
      mockBreakpoint = 'small';
      const { result } = renderHook(() => useCalendar(), { wrapper });
      expect(result.current.currentMonth).toEqual('Feb');
    });

    it('for "medium" size', () => {
      mockBreakpoint = 'medium';
      const { result } = renderHook(() => useCalendar(), { wrapper });
      expect(result.current.currentMonth).toEqual('February');
    });

    it('for "large" size', () => {
      mockBreakpoint = 'large';
      const { result } = renderHook(() => useCalendar(), { wrapper });
      expect(result.current.currentMonth).toEqual('February');
    });
  });

  /* The expected result of this test changes depending on if the current month is the same as the test month */
  it('isCurrentMonth should return correct value', () => {
    const { result } = renderHook(() => useCalendar(), { wrapper });
    expect(result.current.isCurrentMonth).toEqual(
      testDate.getMonth() === new Date().getMonth()
    );
  });

  it('throws when called outside of provider', () => {
    const ExceptionWrapper = () => {
      expect(useCalendar).toThrowError(/must be used within/);
      return <></>;
    };
    render(<ExceptionWrapper />);
  });
});
