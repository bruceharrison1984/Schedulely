import { EventLayoutProps, MonthLayout, WeekLayoutProps } from '@/layouts';
import { InternalCalendarEvent, InternalEventWeek } from '@/types';
import { ReactNode } from 'react';
import { RenderResult, render } from '@testing-library/react';

const mockCalendarWithEvents = [
  {
    weekStart: new Date(8, 25, 2022),
    weekEnd: new Date(9, 1, 2022),
    daysInWeek: [
      new Date(8, 25, 2022),
      new Date(8, 26, 2022),
      new Date(8, 27, 2022),
      new Date(8, 28, 2022),
      new Date(8, 29, 2022),
      new Date(8, 30, 2022),
      new Date(9, 1, 2022),
    ],
    events: [] as InternalCalendarEvent[],
    eventsOnDays: {},
  },
  {
    weekStart: new Date(9, 2, 2022),
    weekEnd: new Date(9, 8, 2022),
    daysInWeek: [
      new Date(9, 2, 2022),
      new Date(9, 3, 2022),
      new Date(9, 4, 2022),
      new Date(9, 5, 2022),
      new Date(9, 6, 2022),
      new Date(9, 7, 2022),
      new Date(9, 8, 2022),
    ],
    events: [] as InternalCalendarEvent[],
    eventsOnDays: {},
  },
  {
    weekStart: new Date(9, 9, 2022),
    weekEnd: new Date(9, 15, 2022),
    daysInWeek: [
      new Date(9, 9, 2022),
      new Date(9, 10, 2022),
      new Date(9, 11, 2022),
      new Date(9, 12, 2022),
      new Date(9, 13, 2022),
      new Date(9, 14, 2022),
      new Date(9, 15, 2022),
    ],
    events: [] as InternalCalendarEvent[],
    eventsOnDays: {},
  },
  {
    weekStart: new Date(9, 16, 2022),
    weekEnd: new Date(9, 22, 2022),
    daysInWeek: [
      new Date(9, 16, 2022),
      new Date(9, 17, 2022),
      new Date(9, 18, 2022),
      new Date(9, 19, 2022),
      new Date(9, 20, 2022),
      new Date(9, 21, 2022),
      new Date(9, 22, 2022),
    ],
    events: [] as InternalCalendarEvent[],
    eventsOnDays: {},
  },
  {
    weekStart: new Date(9, 23, 2022),
    weekEnd: new Date(9, 29, 2022),
    daysInWeek: [
      new Date(9, 23, 2022),
      new Date(9, 24, 2022),
      new Date(9, 25, 2022),
      new Date(9, 26, 2022),
      new Date(9, 27, 2022),
      new Date(9, 28, 2022),
      new Date(9, 29, 2022),
    ],
    events: [] as InternalCalendarEvent[],
    eventsOnDays: {},
  },
  {
    weekStart: new Date(9, 30, 2022),
    weekEnd: new Date(10, 5, 2022),
    daysInWeek: [
      new Date(9, 30, 2022),
      new Date(9, 31, 2022),
      new Date(1, 1, 2022),
      new Date(1, 2, 2022),
      new Date(1, 3, 2022),
      new Date(1, 4, 2022),
      new Date(1, 5, 2022),
    ],
    events: [] as InternalCalendarEvent[],
    eventsOnDays: {},
  },
] as InternalEventWeek[];

const mockUseKeyboardControls = jest.fn(() => null);

jest.mock('@/hooks', () => ({
  useCalendar: jest.fn(() => ({
    calendarWithEvents: mockCalendarWithEvents,
  })),
  useKeyboardControls: jest.fn(() => mockUseKeyboardControls()),
}));

jest.mock('@/providers', () => ({
  EventIntersectionProvider: jest.fn(
    ({ children }: { children: ReactNode }) => (
      <div data-testid="intersection-provider-mock">{children}</div>
    )
  ),
  HighlightProvider: jest.fn(({ children }: { children: ReactNode }) => (
    <div data-testid="highlight-provider-mock">{children}</div>
  )),
}));

const mockEventWeekPropsCheck = jest.fn();
jest.mock('@/layouts/eventWeekLayout', () => ({
  EventWeekLayout: jest.fn(({ events, daysInweek }: EventLayoutProps) => {
    mockEventWeekPropsCheck(events, daysInweek);
    return <div data-testid="event-week-layout-mock"></div>;
  }),
}));

const mockWeekLayoutPropsCheck = jest.fn();
jest.mock('@/layouts/weekLayout', () => ({
  WeekLayout: jest.fn(({ dates }: WeekLayoutProps) => {
    mockWeekLayoutPropsCheck(dates);
    return <div data-testid="week-layout-mock"></div>;
  }),
}));

describe('MonthLayout', () => {
  let testObject: RenderResult;

  beforeEach(() => {
    testObject = render(<MonthLayout />);
  });

  afterEach(() => {
    mockUseKeyboardControls.mockClear();
  });

  it('initializes keyboard controls', () =>
    expect(mockUseKeyboardControls).toHaveBeenCalledTimes(1));

  it('renders one highlight provider', () =>
    expect(testObject.getAllByTestId('highlight-provider-mock').length).toEqual(
      1
    ));

  it('renders the correct number of intersection providers', () =>
    expect(
      testObject.queryAllByTestId('intersection-provider-mock').length
    ).toEqual(mockCalendarWithEvents.length));

  it('renders the correct number of EventWeekLayout', () =>
    expect(
      testObject.queryAllByTestId('event-week-layout-mock').length
    ).toEqual(mockCalendarWithEvents.length));

  it('renders the correct number of WeekLayout', () =>
    expect(testObject.queryAllByTestId('week-layout-mock').length).toEqual(
      mockCalendarWithEvents.length
    ));
});
