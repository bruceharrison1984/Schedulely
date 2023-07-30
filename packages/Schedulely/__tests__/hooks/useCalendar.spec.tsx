import { CalendarProvider } from '@/providers';
import { Chance } from 'chance';
import { ComponentSize } from '@/types';
import { EventPriority } from '@/types/EventPriority';
import { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react';
import { createDefaultAdapter } from '@/dateAdapters/date';
import { render } from '@testing-library/react';
import { useCalendar } from '@/hooks';
import { vi } from 'vitest';

/**
 * Many of the tests here are simply pass-through tests. We just make sure the DateAdapter is called with the correct args,
 * since the DateAdapter is tested separately.
 */

const testDate = Chance().date();

/** useEffect call requires calendar to be available */
const testCalendarView = [
  [
    new Date(2020, 11, 27),
    new Date(2020, 11, 28),
    new Date(2020, 11, 29),
    new Date(2020, 11, 30),
    new Date(2020, 11, 31),
    new Date(2021, 0, 1),
    new Date(2021, 0, 2),
  ],
  [
    new Date(2021, 0, 3),
    new Date(2021, 0, 4),
    new Date(2021, 0, 5),
    new Date(2021, 0, 6),
    new Date(2021, 0, 7),
    new Date(2021, 0, 8),
    new Date(2021, 0, 9),
  ],
  [
    new Date(2021, 0, 10),
    new Date(2021, 0, 11),
    new Date(2021, 0, 12),
    new Date(2021, 0, 13),
    new Date(2021, 0, 14),
    new Date(2021, 0, 15),
    new Date(2021, 0, 16),
  ],
  [
    new Date(2021, 0, 17),
    new Date(2021, 0, 18),
    new Date(2021, 0, 19),
    new Date(2021, 0, 20),
    new Date(2021, 0, 21),
    new Date(2021, 0, 22),
    new Date(2021, 0, 23),
  ],
  [
    new Date(2021, 0, 24),
    new Date(2021, 0, 25),
    new Date(2021, 0, 26),
    new Date(2021, 0, 27),
    new Date(2021, 0, 28),
    new Date(2021, 0, 29),
    new Date(2021, 0, 30),
  ],
  [
    new Date(2021, 0, 31),
    new Date(2021, 1, 1),
    new Date(2021, 1, 2),
    new Date(2021, 1, 3),
    new Date(2021, 1, 4),
    new Date(2021, 1, 5),
    new Date(2021, 1, 6),
  ],
];

const mockOnMonthChangeClick = vi.fn();
vi.mock('@/hooks/useActions', () => ({
  useActions: vi.fn(() => ({
    onMonthChangeClick: mockOnMonthChangeClick,
  })),
}));

let mockBreakpoint: ComponentSize = 'large';
vi.mock('@/hooks/useBreakpoint', () => ({
  useBreakpoint: vi.fn(() => ({
    breakpoint: mockBreakpoint,
  })),
}));

const convertIsoToDate = vi.fn((isoDate: string) => testDate);
const getYear = vi.fn();
const getMonthName = vi.fn();
const isCurrentMonth = vi.fn();
const getDaysOfWeek = vi.fn();
const addMonthsToDate = vi.fn();
const getCalendarView = vi.fn(() => testCalendarView);
vi.mock('@/dateAdapters/date', () => ({
  createDefaultAdapter: vi.fn(() => ({
    getCalendarView,
    getDaysOfWeek,
    getMonthName,
    getYear,
    isSameMonth: vi.fn(),
    isDateToday: vi.fn(),
    addMonthsToDate,
    isEventInWeek: vi.fn(),
    convertIsoToDate,
    isCurrentMonth,
    isDateBetween: vi.fn(),
  })),
}));

const testDateAdapter = createDefaultAdapter();

const wrapper = ({ children }: { children: ReactNode }) => (
  <CalendarProvider
    dateAdapter={testDateAdapter}
    initialDate={testDate.toISOString()}
    calendarEvents={[]}
    eventPriority={EventPriority.long}
  >
    {children}
  </CalendarProvider>
);

const fireHook = () => renderHook(() => useCalendar(), { wrapper });

describe('useCalendar', () => {
  let hook;
  beforeEach(() => {
    hook = fireHook();
  });

  it('currentDate should be called with correct arguments', () =>
    expect(convertIsoToDate).toHaveBeenCalledWith(testDate.toISOString()));

  it('currentYear should be called with correct arguments', () =>
    expect(getYear).toHaveBeenCalledWith(testDate));

  describe('currentMonth should be called with correct arguments', () => {
    it('for "small" size', () => {
      mockBreakpoint = 'small';
      fireHook();
      expect(getMonthName).toHaveBeenCalledWith(testDate, 'short');
    });

    it('for "medium" size', () => {
      mockBreakpoint = 'medium';
      fireHook();
      expect(getMonthName).toHaveBeenCalledWith(testDate, 'long');
    });

    it('for "large" size', () => {
      mockBreakpoint = 'large';
      fireHook();
      expect(getMonthName).toHaveBeenCalledWith(testDate, 'long');
    });
  });

  it('isCurrentMonth should return correct value', () =>
    expect(isCurrentMonth).toHaveBeenCalledWith(testDate));

  it('dateAdapter should return correct value', () => {
    const { result } = fireHook();
    act(() => {
      expect(result.current.dateAdapter).toEqual(testDateAdapter);
    });
  });

  describe('daysOfWeek should be called with correct arguments', () => {
    it('for "small" size', () => {
      mockBreakpoint = 'small';
      fireHook();
      expect(getDaysOfWeek).toHaveBeenCalledWith('narrow');
    });

    it('for "medium" size', () => {
      mockBreakpoint = 'medium';
      fireHook();
      expect(getDaysOfWeek).toHaveBeenCalledWith('short');
    });

    it('for "large" size', () => {
      mockBreakpoint = 'large';
      fireHook();
      expect(getDaysOfWeek).toHaveBeenCalledWith('long');
    });
  });

  it('onNextMonth should be called with correct arguments', () => {
    const { result } = fireHook();
    act(() => result.current.onNextMonth());
    expect(addMonthsToDate).toHaveBeenCalledWith(testDate, 1);
  });

  it('onNextYear should be called with correct arguments', () => {
    const { result } = fireHook();
    act(() => result.current.onNextYear());
    expect(addMonthsToDate).toHaveBeenCalledWith(testDate, 12);
  });

  it('onPrevMonth should be called with correct arguments', () => {
    const { result } = fireHook();
    act(() => result.current.onPrevMonth());
    expect(addMonthsToDate).toHaveBeenCalledWith(testDate, -1);
  });

  it('onPrevYear should be called with correct arguments', () => {
    const { result } = fireHook();
    act(() => result.current.onPrevYear());
    expect(addMonthsToDate).toHaveBeenCalledWith(testDate, -12);
  });

  it.todo('calendarWithEvents should return correct value');

  it('throws when called outside of provider', () => {
    const ExceptionWrapper = () => {
      expect(useCalendar).toThrowError(/must be used within/);
      return <></>;
    };
    render(<ExceptionWrapper />);
  });
});
