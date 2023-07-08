import { DefaultEvent } from '@/components';
import { EventWeekLayout, getEventPosition } from '@/layouts';
import { InternalCalendarEvent } from '@/types';
import { RenderResult, fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';

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

let mockSetHighlight = vi.fn((eventId: string) => {});
let mockClearHighlight = vi.fn(() => {});
let mockIsHighlighted = vi.fn((eventId: string) => false);

let mockEventOnClickHandler = vi.fn(() => {});

let mockSetParentContainerRef = vi.fn((eventId: string) => {});

vi.mock('@/hooks', () => ({
  useComponents: vi.fn(() => ({
    eventComponent: DefaultEvent,
  })),
  useEventHighlight: vi.fn(() => ({
    setHighlight: mockSetHighlight,
    clearHighlight: mockClearHighlight,
    isHighlighted: mockIsHighlighted,
  })),
  useActions: vi.fn(() => ({
    onEventClick: mockEventOnClickHandler,
  })),
  useEventIntersection: vi.fn(() => ({
    setParentContainerRef: mockSetParentContainerRef,
  })),
}));

describe('EventWeekLayout', () => {
  let testObject: RenderResult;

  beforeEach(() => {
    mockSetParentContainerRef.mockClear();
    testObject = render(
      <EventWeekLayout eventsInWeek={events} daysInweek={daysInWeek} />
    );
  });

  describe.each(events.map((x) => x.summary))('event %s', (value) => {
    let eventDomObject: HTMLElement;

    beforeEach(() => {
      eventDomObject = testObject.getByText(value);

      return async () => {
        mockSetHighlight.mockClear();
        mockClearHighlight.mockClear();
        mockEventOnClickHandler.mockClear();
      };
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

  // we can't really test this well in vi without a massive setup. Maybe later.
  describe('useEventIntersection', () => {
    it('setParentContainerRef is called on the parent', () =>
      expect(mockSetParentContainerRef).toHaveBeenCalledTimes(1));
  });

  describe('getEventPosition', () => {
    const daysInWeek = [
      new Date('2023-07-02T05:00:00.000Z'),
      new Date('2023-07-03T05:00:00.000Z'),
      new Date('2023-07-04T05:00:00.000Z'),
      new Date('2023-07-05T05:00:00.000Z'),
      new Date('2023-07-06T05:00:00.000Z'),
      new Date('2023-07-07T05:00:00.000Z'),
      new Date('2023-07-08T05:00:00.000Z'),
    ];

    it.each<{
      description: string;
      event: InternalCalendarEvent;
      daysInWeek: Date[];
      expected?: string | Error;
    }>([
      {
        description: 'starts in previous week, ends outside of week',
        event: {
          start: new Date('2023-07-01T05:00:00.000Z'),
          end: new Date('2023-07-09T05:00:00.000Z'),
        } as InternalCalendarEvent,
        daysInWeek,
        expected: '1/8',
      },
      {
        description: 'starts in current week, ends outside of week',
        event: {
          start: new Date('2023-07-06T05:00:00.000Z'),
          end: new Date('2023-07-09T05:00:00.000Z'),
        } as InternalCalendarEvent,
        daysInWeek,
        expected: '5/8',
      },
      {
        description: 'starts in previous week, ends in current week',
        event: {
          start: new Date('2023-07-01T05:00:00.000Z'),
          end: new Date('2023-07-05T05:00:00.000Z'),
        } as InternalCalendarEvent,
        daysInWeek,
        expected: '1/5',
      },
      {
        description: 'starts on first of week, ends on last of week',
        event: {
          start: new Date('2023-07-02T05:00:00.000Z'),
          end: new Date('2023-07-08T05:00:00.000Z'),
        } as InternalCalendarEvent,
        daysInWeek,
        expected: '1/8',
      },
      {
        description: 'starts in current week, ends in current week',
        event: {
          start: new Date('2023-07-03T05:00:00.000Z'),
          end: new Date('2023-07-07T05:00:00.000Z'),
        } as InternalCalendarEvent,
        daysInWeek,
        expected: '2/7',
      },
      {
        description:
          'event occurs outside of week (this shouldnt occur due to event filtering)',
        event: {
          start: new Date('2023-07-12T05:00:00.000Z'),
          end: new Date('2023-07-13T05:00:00.000Z'),
        } as InternalCalendarEvent,
        daysInWeek,
        expected: new Error(),
      },
    ])('$description returns $expected', ({ event, daysInWeek, expected }) => {
      if (expected instanceof Error) {
        expect(() => getEventPosition(event, daysInWeek)).toThrowError();
      } else {
        const result = getEventPosition(event, daysInWeek);
        expect(result).toBe(expected);
      }
    });
  });
});
