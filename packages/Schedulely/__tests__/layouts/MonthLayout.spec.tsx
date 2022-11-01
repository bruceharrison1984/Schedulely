import { EventLayoutProps, MonthLayout, WeekLayoutProps } from '@/layouts';
import { InternalCalendarEvent, InternalEventWeek } from '@/types';
import { ReactNode } from 'react';
import { RenderResult, render } from '@testing-library/react';

const mockCalendarWithEvents = [
  {
    weekStart: new Date(2022, 8, 25),
    weekEnd: new Date(2022, 9, 1),
    daysInWeek: [
      new Date(2022, 8, 25),
      new Date(2022, 8, 26),
      new Date(2022, 8, 27),
      new Date(2022, 8, 28),
      new Date(2022, 8, 29),
      new Date(2022, 8, 30),
      new Date(2022, 9, 1),
    ],
    events: [] as InternalCalendarEvent[],
    eventsOnDays: {},
  },
  {
    weekStart: new Date(2022, 9, 2),
    weekEnd: new Date(2022, 9, 8),
    daysInWeek: [
      new Date(2022, 9, 2),
      new Date(2022, 9, 3),
      new Date(2022, 9, 4),
      new Date(2022, 9, 5),
      new Date(2022, 9, 6),
      new Date(2022, 9, 7),
      new Date(2022, 9, 8),
    ],
    events: [] as InternalCalendarEvent[],
    eventsOnDays: {},
  },
  {
    weekStart: new Date(2022, 9, 9),
    weekEnd: new Date(2022, 9, 15),
    daysInWeek: [
      new Date(2022, 9, 9),
      new Date(2022, 9, 10),
      new Date(2022, 9, 11),
      new Date(2022, 9, 12),
      new Date(2022, 9, 13),
      new Date(2022, 9, 14),
      new Date(2022, 9, 15),
    ],
    events: [] as InternalCalendarEvent[],
    eventsOnDays: {},
  },
  {
    weekStart: new Date(2022, 9, 16),
    weekEnd: new Date(2022, 9, 22),
    daysInWeek: [
      new Date(2022, 9, 16),
      new Date(2022, 9, 17),
      new Date(2022, 9, 18),
      new Date(2022, 9, 19),
      new Date(2022, 9, 20),
      new Date(2022, 9, 21),
      new Date(2022, 9, 22),
    ],
    events: [] as InternalCalendarEvent[],
    eventsOnDays: {},
  },
  {
    weekStart: new Date(2022, 9, 23),
    weekEnd: new Date(2022, 9, 29),
    daysInWeek: [
      new Date(2022, 9, 23),
      new Date(2022, 9, 24),
      new Date(2022, 9, 25),
      new Date(2022, 9, 26),
      new Date(2022, 9, 27),
      new Date(2022, 9, 28),
      new Date(2022, 9, 29),
    ],
    events: [] as InternalCalendarEvent[],
    eventsOnDays: {},
  },
  {
    weekStart: new Date(2022, 9, 30),
    weekEnd: new Date(2022, 10, 5),
    daysInWeek: [
      new Date(2022, 9, 30),
      new Date(2022, 9, 31),
      new Date(2022, 1, 1),
      new Date(2022, 1, 2),
      new Date(2022, 1, 3),
      new Date(2022, 1, 4),
      new Date(2022, 1, 5),
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

const mockEventIntersectionProviderPropsCheck = jest.fn();
jest.mock('@/providers', () => ({
  EventIntersectionProvider: jest.fn(
    ({
      children,
      events,
    }: {
      children: ReactNode;
      events: InternalCalendarEvent[];
    }) => {
      mockEventIntersectionProviderPropsCheck(events);
      return <div data-testid="intersection-provider-mock">{children}</div>;
    }
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

  describe.each(mockCalendarWithEvents.map((row, i) => ({ ...row, index: i })))(
    'Week $index',
    (week) => {
      describe('EventWeekLayout', () => {
        it('receives array of days', () => {
          expect(mockEventWeekPropsCheck.mock.calls[week.index][1]).toEqual(
            mockCalendarWithEvents[week.index].daysInWeek
          );
        });

        it('receives array of events', () => {
          expect(mockEventWeekPropsCheck.mock.calls[week.index][0]).toEqual(
            mockCalendarWithEvents[week.index].events
          );
        });
      });

      describe('WeekLayout', () => {
        it('receives array of days', () => {
          expect(mockWeekLayoutPropsCheck.mock.calls[week.index][0]).toEqual(
            mockCalendarWithEvents[week.index].daysInWeek
          );
        });
      });

      describe('EventIntersectionProvider', () => {
        it('receives array of days', () => {
          expect(
            mockEventIntersectionProviderPropsCheck.mock.calls[week.index][0]
          ).toEqual(mockCalendarWithEvents[week.index].events);
        });
      });
    }
  );

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
