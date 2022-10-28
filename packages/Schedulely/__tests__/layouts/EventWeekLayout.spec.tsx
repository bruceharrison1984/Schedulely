import { DefaultEvent } from '@/components';
import { EventWeekLayout } from '@/layouts';
import { InternalCalendarEvent } from '@/types';
import { RenderResult, render } from '@testing-library/react';

// Oct 2-8 2022 is the test week
const daysInWeek = [
  new Date(2022, 9, 2),
  new Date(2022, 9, 3),
  new Date(2022, 9, 4),
  new Date(2022, 9, 5),
  new Date(2022, 9, 6),
  new Date(2022, 9, 7),
  new Date(2022, 9, 8),
];

let events: InternalCalendarEvent[] = [
  {
    id: 'event-1',
    color: 'red',
    start: new Date(2022, 9, 2),
    end: new Date(2022, 9, 2),
    summary: 'event-1',
    visible: true,
  },
];

let mockSetHighlight: (eventId: string) => void = jest.fn(
  (eventId: string) => {}
);
let mockClearHighlight: () => void = jest.fn(() => {});
let mockIsHighlighted: (eventId: string) => boolean = jest.fn(
  (eventId: string) => false
);

let mockEventOnClickHandler: () => void = jest.fn(() => {});

let mockSetParentContainerRef: (eventId: string) => void = jest.fn(
  (eventId: string) => {}
);
let mockSetRefFromKey: () => void = jest.fn(() => {});
let mockIsEventVisible: (eventId: string) => boolean = jest.fn(
  (eventId: string) => true
);

jest.mock('@/hooks', () => ({
  useComponents: jest.fn(() => ({
    eventComponent: DefaultEvent,
  })),
  useEventHighlight: jest.fn(() => ({
    setHighlight: mockSetHighlight,
    clearHighlight: mockClearHighlight,
    isHighlighted: mockIsHighlighted,
  })),
  useActions: jest.fn(() => ({
    onEventClick: mockEventOnClickHandler,
  })),
  useEventIntersection: jest.fn(() => ({
    setParentContainerRef: mockSetParentContainerRef,
    setRefFromKey: mockSetRefFromKey,
    isEventVisible: mockIsEventVisible,
  })),
}));

describe('EventWeekLayout', () => {
  let testObject: RenderResult;

  beforeEach(() => {
    testObject = render(
      <EventWeekLayout events={events} daysInweek={daysInWeek} />
    );
  });

  it('displays correct number of events', () => {
    expect(testObject.getByText('event-1')).toBeTruthy();
  });
  // describe('getGridEndIndex', () => {
  //   it.each<{ eventEnd: Date; endOfWeek: Date; expected: number }>([
  //     {
  //       eventEnd: new Date(2022, 1, 11),
  //       endOfWeek: new Date(2022, 1, 12),
  //       expected: 7,
  //     },
  //     {
  //       // event ends after end of week
  //       eventEnd: new Date(2022, 1, 13),
  //       endOfWeek: new Date(2022, 1, 12),
  //       expected: 8,
  //     },
  //     {
  //       eventEnd: new Date(2022, 1, 9),
  //       endOfWeek: new Date(2022, 1, 12),
  //       expected: 5,
  //     },
  //     {
  //       // event ends on Sunday
  //       eventEnd: new Date(2021, 8, 26),
  //       endOfWeek: new Date(2021, 9, 2),
  //       expected: 2,
  //     },
  //     {
  //       // event that starts and ends on Sunday
  //       eventEnd: new Date(2022, 0, 2),
  //       endOfWeek: new Date(2022, 0, 8),
  //       expected: 2,
  //     },
  //   ])(
  //     '$eventEnd with $endOfWeek returns $expected',
  //     ({ eventEnd, endOfWeek, expected }) => {
  //       const result = adapter.getGridEndIndex(eventEnd, endOfWeek);
  //       expect(result).toBe(expected);
  //     }
  //   );
  // });
  // describe('getGridStartIndex', () => {
  //   it.each<{ eventStart: Date; startOfWeek: Date; expected: number }>([
  //     {
  //       eventStart: new Date(2022, 1, 7),
  //       startOfWeek: new Date(2022, 1, 6),
  //       expected: 2,
  //     },
  //     {
  //       eventStart: new Date(2022, 1, 9),
  //       startOfWeek: new Date(2022, 1, 6),
  //       expected: 4,
  //     },
  //     {
  //       eventStart: new Date(2022, 3, 10),
  //       startOfWeek: new Date(2022, 3, 10),
  //       expected: 1,
  //     },
  //     {
  //       // event that starts and ends on Sunday
  //       eventStart: new Date(2022, 0, 2),
  //       startOfWeek: new Date(2022, 0, 2),
  //       expected: 1,
  //     },
  //   ])(
  //     '$eventStart with $startOfWeek returns $expected',
  //     ({ eventStart, startOfWeek, expected }) => {
  //       const result = adapter.getGridStartIndex(eventStart, startOfWeek);
  //       expect(result).toBe(expected);
  //     }
  //   );
  // });
});
