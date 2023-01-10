import { DayComponentProps, InternalCalendarEvent } from '@/types';
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

let mockOnMoreEventsClick = jest.fn((events: InternalCalendarEvent[]) => {});
let mockGetEventsOnDate = jest.fn(
  (date: Date) =>
    [
      {
        id: 'event-1',
        color: 'red',
        start: new Date(2022, 9, 2),
        end: new Date(2022, 9, 2),
        summary: 'event-1',
        visible: true,
      },
      {
        id: 'event-1',
        color: 'red',
        start: new Date(2022, 9, 2),
        end: new Date(2022, 9, 8),
        summary: 'event-1',
        visible: false,
      },
    ] as InternalCalendarEvent[]
);
let mockIsDateToday = jest.fn((date: Date) => true);
let mockIsSameMonth = jest.fn((date: Date, date2: Date) => true);
let mockCurrentDate = jest.fn(() => Date);

const mockDayComponentPropsCheck = jest.fn();
jest.mock('@/hooks', () => ({
  useComponents: jest.fn(() => ({
    dayComponent: jest.fn((props: DayComponentProps) => {
      mockDayComponentPropsCheck(props);
      return <div data-testid={props.date.getDate().toString()}></div>;
    }),
  })),
  useCalendar: jest.fn(() => ({
    dateAdapter: {
      isDateToday: mockIsDateToday,
      isSameMonth: mockIsSameMonth,
    },
    currentDate: mockCurrentDate,
  })),
  useActions: jest.fn(() => ({
    onMoreEventsClick: mockOnMoreEventsClick,
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
    mockGetEventsOnDate.mockClear();
    mockIsDateToday.mockClear();
    mockIsSameMonth.mockClear();
  });

  it('calls isDateToday', () =>
    expect(mockIsDateToday).toHaveBeenCalledTimes(dates.length));

  it('isDateToday is called with each date', () =>
    expect(
      mockIsDateToday.mock.calls
        .flat()
        .filter((x, i, a) => a.indexOf(x) == i)
        .sort()
    ).toEqual(dates.map((x) => x).sort()));

  it('calls isSameMonth', () =>
    expect(mockIsSameMonth).toHaveBeenCalledTimes(dates.length));

  it('isSameMonth is called with each date', () => {
    expect(
      mockIsSameMonth.mock.calls
        .map((x) => x[0])
        .filter((x, i, a) => a.indexOf(x) == i)
        .sort()
    ).toEqual(dates.map((x) => x).sort());
  });

  it('calls getEventsOnDate', () =>
    expect(mockGetEventsOnDate).toHaveBeenCalledTimes(dates.length));

  describe.each(dates.map((x, index) => ({ value: x, index })))(
    'date container for %s',
    ({ value, index }) => {
      it('is rendered', () =>
        expect(
          testObject.getByTestId(value.getDate().toString())
        ).toBeTruthy());

      it('passes OnMoreEventClickHandler', () => {
        expect(mockOnMoreEventsClick).toEqual(
          mockDayComponentPropsCheck.mock.calls[index][0].onMoreEventsClick
        );
      });
    }
  );
});
