import { DefaultDay } from '@/components';
import { InternalCalendarEvent } from '@/types';
import { RenderResult, render } from '@testing-library/react';
import { WeekLayout } from '@/layouts';

// Oct 2-8 2022 is the test week
const dates = [
  new Date(2022, 9, 2),
  new Date(2022, 9, 3),
  new Date(2022, 9, 4),
  new Date(2022, 9, 5),
  new Date(2022, 9, 6),
  new Date(2022, 9, 7),
  new Date(2022, 9, 8),
];

let mockOnMoreEventClick = jest.fn((events: InternalCalendarEvent[]) => {});
let mockGetEventsOnDate = jest.fn(
  (date: Date) => [] as InternalCalendarEvent[]
);
let mockIsDateToday = jest.fn((date: Date) => true);
let mockIsSameMonth = jest.fn((date: Date, date2: Date) => true);
let mockGetDayNumber = jest.fn((date: Date) => 1);
let mockCurrentDate = jest.fn(() => Date);

jest.mock('@/hooks', () => ({
  useComponents: jest.fn(() => ({
    dayComponent: DefaultDay,
  })),
  useCalendar: jest.fn(() => ({
    dateAdapter: {
      isDateToday: mockIsDateToday,
      isSameMonth: mockIsSameMonth,
      getDayNumber: mockGetDayNumber,
    },
    currentDate: mockCurrentDate,
  })),
  useActions: jest.fn(() => ({
    onMoreEventClick: mockOnMoreEventClick,
  })),
  useEventIntersection: jest.fn(() => ({
    getEventsOnDate: mockGetEventsOnDate,
  })),
}));

describe('WeekLayout', () => {
  let testObject: RenderResult;

  beforeEach(() => {
    testObject = render(<WeekLayout dates={dates} />);
  });

  afterEach(() => {
    mockOnMoreEventClick.mockClear();
    mockGetEventsOnDate.mockClear();
    mockIsDateToday.mockClear();
    mockGetDayNumber.mockClear();
    mockIsSameMonth.mockClear();
  });

  // This is called twice, once for the day component and again for the container data attribute
  it('calls isDateToday', () =>
    expect(mockIsDateToday).toHaveBeenCalledTimes(dates.length * 2));

  it('isDateToday is called with each date', () =>
    expect(
      mockIsDateToday.mock.calls
        .flat()
        .filter((x, i, a) => a.indexOf(x) == i)
        .sort()
    ).toEqual(dates.map((x) => x).sort()));

  it('calls getDayNumber', () =>
    expect(mockGetDayNumber).toHaveBeenCalledTimes(dates.length));

  it('getDayNumber is called with each date', () =>
    expect(
      mockGetDayNumber.mock.calls
        .flat()
        .filter((x, i, a) => a.indexOf(x) == i)
        .sort()
    ).toEqual(dates.map((x) => x).sort()));

  it('calls isSameMonth', () =>
    expect(mockIsSameMonth).toHaveBeenCalledTimes(dates.length));

  // it('isSameMonth is called with each date', () =>
  //   expect(
  //     mockIsSameMonth.mock.calls
  //       .flat()
  //       .filter((x, i, a) => a.indexOf(x) == i)
  //       .sort()
  //   ).toEqual(dates.map((x) => x).sort()));

  // This is called twice, once for the overflow indicator, and again for the indicator itself
  it('calls getEventsOnDate', () =>
    expect(mockGetEventsOnDate).toHaveBeenCalledTimes(dates.length * 2));
});
