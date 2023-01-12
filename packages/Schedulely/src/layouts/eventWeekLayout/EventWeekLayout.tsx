import { InternalCalendarEvent } from '@/types/InternalCalendarEvent';
import {
  useActions,
  useComponents,
  useEventHighlight,
  useEventIntersection,
} from '@/hooks';

export interface EventLayoutProps {
  events: InternalCalendarEvent[];
  daysInweek: Date[];
}

export const getGridStartIndex = (eventDate: Date, startOfWeek: Date) =>
  eventDate <= startOfWeek ? 1 : eventDate.getDay() + 1; //add one because css-grid isn't zero-index'd

export const getGridEndIndex = (eventEndDate: Date, endOfWeek: Date) => {
  if (eventEndDate > endOfWeek) return 8;
  const end = eventEndDate.getDay() + 2; // add two because css-grid isn't zero index'd, and day of week is zero-index'd
  return end;
};

/**
 * This component controls the layout of an individual events within a week
 * @returns EventLayout Component
 */
export const EventWeekLayout = ({ events, daysInweek }: EventLayoutProps) => {
  const { eventComponent: EventComponent } = useComponents();
  const { setHighlight, clearHighlight, isHighlighted } = useEventHighlight();
  const { onEventClick } = useActions();
  const { setParentContainerRef } = useEventIntersection();

  return (
    <div className="event-week-layout" ref={setParentContainerRef}>
      <div className="event-week-layout-grid">
        <div className="event-week-layout-header-spacer" />
        {events.map((event) => (
          <div
            key={event.id}
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
    </div>
  );
};
