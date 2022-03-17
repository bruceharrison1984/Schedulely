import { Dispatch, SetStateAction } from 'react';
import { InternalCalendarEvent, useCalendar, useComponents } from 'src';

interface EventLayoutProps {
  events: InternalCalendarEvent[];
  startOfWeek: Date;
  endOfWeek: Date;
  setHighlightedEvent: Dispatch<SetStateAction<string | undefined>>;
  highlightedEvent: string | undefined;
}

/**
 * This component controls the layout of an individual events within a week
 * @returns EventLayout Component
 */
export const EventLayout = ({
  events,
  startOfWeek,
  endOfWeek,
  setHighlightedEvent,
  highlightedEvent,
}: EventLayoutProps) => {
  const {
    dateAdapter: {
      getGridStartIndex: getStartIndex,
      getGridEndIndex: getEndIndex,
    },
  } = useCalendar();
  const { eventComponent: EventComponent } = useComponents();

  return (
    <div className="calendo--event-layout">
      {events.map((event) => {
        return (
          <div
            data-eventid={event.id}
            key={event.id}
            style={{
              gridColumnStart: getStartIndex(event.start, startOfWeek),
              gridColumnEnd: getEndIndex(event.end, endOfWeek),
              minWidth: 0,
            }}
            onMouseOver={() => setHighlightedEvent(event.id)}
            onMouseLeave={() => setHighlightedEvent(undefined)}
          >
            <EventComponent
              event={event}
              isHovered={highlightedEvent === event.id}
            />
          </div>
        );
      })}
    </div>
  );
};
