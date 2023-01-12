import { DefaultEvent } from '@/components';
import { EventWeekLayout, getGridEndIndex, getGridStartIndex } from '@/layouts';
import { InternalCalendarEvent } from '@/types';
import { RenderResult, fireEvent, render } from '@testing-library/react';

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
  {
    id: 'event-2',
    color: 'red',
    start: new Date(2022, 9, 2),
    end: new Date(2022, 9, 2),
    summary: 'event-2',
    visible: true,
  },
  {
    id: 'event-3',
    color: 'red',
    start: new Date(2022, 9, 2),
    end: new Date(2022, 9, 2),
    summary: 'event-3',
    visible: true,
  },
];

let mockSetHighlight = jest.fn((eventId: string) => {});
let mockClearHighlight = jest.fn(() => {});
let mockIsHighlighted = jest.fn((eventId: string) => false);

let mockEventOnClickHandler = jest.fn(() => {});

let mockSetParentContainerRef = jest.fn((eventId: string) => {});

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
  })),
}));

describe('EventWeekLayout', () => {
  let testObject: RenderResult;

  beforeEach(() => {
    mockSetParentContainerRef.mockClear();
    testObject = render(
      <EventWeekLayout events={events} daysInweek={daysInWeek} />
    );
  });

  describe.each(events.map((x) => x.summary))('event %s', (value) => {
    let eventDomObject: HTMLElement;

    beforeEach(() => {
      eventDomObject = testObject.getByText(value);
    });

    afterEach(() => {
      mockSetHighlight.mockClear();
      mockClearHighlight.mockClear();
      mockEventOnClickHandler.mockClear();
    });

    it('is in document', () => expect(eventDomObject).toBeTruthy());

    it('calls setHighlight onMouseOver', () => {
      fireEvent.mouseOver(eventDomObject);
      expect(mockSetHighlight).toHaveBeenCalledTimes(1);
    });

    it('passes eventID to set highlight onMouseOver', () => {
      fireEvent.mouseOver(eventDomObject);
      expect(mockSetHighlight).toHaveBeenLastCalledWith(value);
    });

    it('is cleared onMouseLeave', () => {
      fireEvent.mouseLeave(eventDomObject);
      expect(mockClearHighlight).toHaveBeenCalledTimes(1);
    });

    it('event onClick handler is called when clicked', () => {
      fireEvent.click(eventDomObject.parentElement!);
      expect(mockEventOnClickHandler).toHaveBeenCalledTimes(1);
    });
  });

  // we can't really test this well in jest without a massive setup. Maybe later.
  describe('useEventIntersection', () => {
    it('setParentContainerRef is called on the parent', () =>
      expect(mockSetParentContainerRef).toHaveBeenCalledTimes(1));
  });

  describe('getGridEndIndex', () => {
    it.each<{ eventEnd: Date; endOfWeek: Date; expected: number }>([
      {
        eventEnd: new Date(2022, 1, 11),
        endOfWeek: new Date(2022, 1, 12),
        expected: 7,
      },
      {
        // event ends after end of week
        eventEnd: new Date(2022, 1, 13),
        endOfWeek: new Date(2022, 1, 12),
        expected: 8,
      },
      {
        eventEnd: new Date(2022, 1, 9),
        endOfWeek: new Date(2022, 1, 12),
        expected: 5,
      },
      {
        // event ends on Sunday
        eventEnd: new Date(2021, 8, 26),
        endOfWeek: new Date(2021, 9, 2),
        expected: 2,
      },
      {
        // event that starts and ends on Sunday
        eventEnd: new Date(2022, 0, 2),
        endOfWeek: new Date(2022, 0, 8),
        expected: 2,
      },
    ])(
      '$eventEnd with $endOfWeek returns $expected',
      ({ eventEnd, endOfWeek, expected }) => {
        const result = getGridEndIndex(eventEnd, endOfWeek);
        expect(result).toBe(expected);
      }
    );
  });

  describe('getGridStartIndex', () => {
    it.each<{ eventStart: Date; startOfWeek: Date; expected: number }>([
      {
        eventStart: new Date(2022, 1, 7),
        startOfWeek: new Date(2022, 1, 6),
        expected: 2,
      },
      {
        eventStart: new Date(2022, 1, 9),
        startOfWeek: new Date(2022, 1, 6),
        expected: 4,
      },
      {
        eventStart: new Date(2022, 3, 10),
        startOfWeek: new Date(2022, 3, 10),
        expected: 1,
      },
      {
        // event that starts and ends on Sunday
        eventStart: new Date(2022, 0, 2),
        startOfWeek: new Date(2022, 0, 2),
        expected: 1,
      },
    ])(
      '$eventStart with $startOfWeek returns $expected',
      ({ eventStart, startOfWeek, expected }) => {
        const result = getGridStartIndex(eventStart, startOfWeek);
        expect(result).toBe(expected);
      }
    );
  });
});
