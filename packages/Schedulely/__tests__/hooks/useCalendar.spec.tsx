import { CalendarProvider } from '@/providers';
import { ComponentSize } from '@/types';
import { ReactNode } from 'react';
import { createDefaultAdapter } from '@/dateAdapters';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useCalendar } from '@/hooks';

const mockOnMonthChangeClick = jest.fn();
jest.mock('@/hooks/useActions', () => ({
  useActions: jest.fn(() => ({
    onMonthChangeClick: mockOnMonthChangeClick,
  })),
}));

const mockBreakpoint: ComponentSize = 'large';
jest.mock('@/hooks/useBreakpoint', () => ({
  useBreakpoint: jest.fn(() => ({
    breakpoint: mockBreakpoint,
  })),
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <CalendarProvider
    dateAdapter={createDefaultAdapter()}
    initialDate={new Date(2023, 1, 14).toISOString()}
    calendarEvents={[]}
  >
    {children}
  </CalendarProvider>
);

describe('useCalendar', () => {
  it('currentDate should return correct date', () => {
    const { result } = renderHook(() => useCalendar(), { wrapper });

    expect(result.current.currentDate).toEqual(new Date(2023, 1, 14));
  });

  it('throws when called outside of provider', () => {
    const ExceptionWrapper = () => {
      expect(useCalendar).toThrowError(/must be used within/);
      return <></>;
    };
    render(<ExceptionWrapper />);
  });
});
