import { CalendarProvider } from '@/providers';
import { ComponentSize, DateTimeAdapter } from '@/types';
import { ReactNode } from 'react';
import { createDefaultAdapter } from '@/dateAdapters/date';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useCalendar } from '@/hooks';

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

const mockConvertIsoDate = jest.fn((isoDate: string) => testDate);
const mockGetYear = jest.fn();
const mockGetCalendarView = jest.fn(() => testCalendarView);
jest.mock<{ createDefaultAdapter: (Date: Date) => DateTimeAdapter }>(
  '@/dateAdapters/date',
  () => ({
    createDefaultAdapter: jest.fn<DateTimeAdapter, any>(() => ({
      getCalendarView: mockGetCalendarView,
      getDaysOfWeek: jest.fn(),
      getMonthName: jest.fn(),
      getYear: mockGetYear,
      isSameMonth: jest.fn(),
      isDateToday: jest.fn(),
      addMonthsToDate: jest.fn(),
      isEventInWeek: jest.fn(),
      convertIsoToDate: mockConvertIsoDate,
      isCurrentMonth: jest.fn(),
      isDateBetween: jest.fn(),
    })),
  })
);

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
    renderHook(() => useCalendar(), { wrapper });
    expect(mockConvertIsoDate).toHaveBeenCalledWith(testDate.toISOString());
  });

  it('currentYear should return correct value', () => {
    renderHook(() => useCalendar(), { wrapper });
    expect(mockGetYear).toHaveBeenCalledWith(testDate);
  });

  // describe('currentMonth should return correct value', () => {
  //   it('for "small" size', () => {
  //     mockBreakpoint = 'small';
  //     const { result } = renderHook(() => useCalendar(), { wrapper });
  //     expect(result.current.currentMonth).toEqual('Feb');
  //   });

  //   it('for "medium" size', () => {
  //     mockBreakpoint = 'medium';
  //     const { result } = renderHook(() => useCalendar(), { wrapper });
  //     expect(result.current.currentMonth).toEqual('February');
  //   });

  //   it('for "large" size', () => {
  //     mockBreakpoint = 'large';
  //     const { result } = renderHook(() => useCalendar(), { wrapper });
  //     expect(result.current.currentMonth).toEqual('February');
  //   });
  // });

  // /* The expected result of this test changes depending on if the current month is the same as the test month */
  // it('isCurrentMonth should return correct value', () => {
  //   const { result } = renderHook(() => useCalendar(), { wrapper });
  //   expect(result.current.isCurrentMonth).toEqual(
  //     testDate.getMonth() === new Date().getMonth()
  //   );
  // });

  it('throws when called outside of provider', () => {
    const ExceptionWrapper = () => {
      expect(useCalendar).toThrowError(/must be used within/);
      return <></>;
    };
    render(<ExceptionWrapper />);
  });
});
