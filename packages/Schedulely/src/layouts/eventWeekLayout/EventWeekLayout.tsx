import { InternalCalendarEvent } from '@/types/InternalCalendarEvent';
import { useActions } from '@/hooks/useActions';
import { useCalendar } from '@/hooks/useCalendar';
import { useComponents } from '@/hooks/useComponents';
import { useEventHighlight } from '@/hooks/useEventHighlight';
import { useRef } from 'react';

interface EventLayoutProps {
  events: InternalCalendarEvent[];
  daysInweek: Date[];
}

/**
 * This component controls the layout of an individual events within a week
 * @returns EventLayout Component
 */
export const EventWeekLayout = ({ events, daysInweek }: EventLayoutProps) => {
  const {
    dateAdapter: { getGridStartIndex, getGridEndIndex },
  } = useCalendar();
  const { eventComponent: EventComponent } = useComponents();
  const { setHighlight, clearHighlight } = useEventHighlight();
  const { isHighlighted } = useEventHighlight();
  const { onEventClick } = useActions();
  const weekLayoutRef = useRef(null);

  /** Event week height needs to be constrained to week height and prevent overflow */

  return (
    <div className="event-week-layout">
      {/** This div creates space for the DayComponent header on the calendar layer */}
      <div
        style={{
          gridColumnStart: 1,
          gridColumnEnd: 8,
        }}
      />
      {events.map((event) => (
        <div
          className="event-position-layout"
          data-eventid={event.id}
          style={{
            gridColumnStart: getGridStartIndex(event.start, daysInweek[0]),
            gridColumnEnd: getGridEndIndex(event.end, daysInweek[6]),
          }}
          onMouseOver={() => setHighlight(event.id)}
          onMouseLeave={clearHighlight}
        >
          <EventComponent
            event={event}
            isHovered={isHighlighted(event.id)}
            onClick={onEventClick}
          />
        </div>
      ))}
    </div>
  );
};
