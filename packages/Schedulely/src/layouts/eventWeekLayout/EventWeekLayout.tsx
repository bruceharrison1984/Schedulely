import { InternalCalendarEvent } from '@/types/InternalCalendarEvent';
import {
  useActions,
  useComponents,
  useEventHighlight,
  useEventIntersection,
} from '@/hooks';

export interface EventLayoutProps {
  eventsInWeek: InternalCalendarEvent[];
  daysInweek: Date[];
}

export const getGridStartIndex = (eventDate: Date, startOfWeek: Date) =>
  eventDate <= startOfWeek ? 1 : eventDate.getDay() + 1; //add one because css-grid isn't zero-index'd

export const getGridEndIndex = (eventEndDate: Date, endOfWeek: Date) => {
  if (eventEndDate > endOfWeek) return 8;
  const end = eventEndDate.getDay() + 2; // add two because css-grid isn't zero index'd, and day of week is zero-index'd
  return end;
};

const getEventPosition = (
  { start, end }: InternalCalendarEvent,
  daysInWeek: Date[]
) => {
  const days = daysInWeek
    .filter((x) => {
      return (
        (x.getDate() == start.getDate() &&
          x.getFullYear() === start.getFullYear()) ||
        (x.getDate() == end.getDate() && x.getFullYear() === end.getFullYear())
      );
    })
    .map((x) => daysInWeek.indexOf(x))
    .sort();

  let startIndex = days[0] + 1;
  if (isNaN(startIndex) || start < daysInWeek[0]) startIndex = 1;

  let endIndex = days.slice(-1)[0] + 2;
  if (isNaN(endIndex) || end > daysInWeek[6]) endIndex = 8;

  const gridColumnPosition = `${startIndex}/${endIndex}`;

  return gridColumnPosition;
};

/**
 * This component controls the layout of an individual events within a week  getEventPosition(event.start, event.end, daysInweek[0], daysInweek[6], firstDayOfWeek),
 * @returns EventLayout Component
 */
export const EventWeekLayout = ({
  eventsInWeek,
  daysInweek,
}: EventLayoutProps) => {
  const { eventComponent: EventComponent } = useComponents();
  const { setHighlight, clearHighlight, isHighlighted } = useEventHighlight();
  const { onEventClick } = useActions();
  const { setParentContainerRef } = useEventIntersection();

  return (
    <div className="event-week-layout" ref={setParentContainerRef}>
      <div className="event-week-layout-grid">
        <div className="event-week-layout-header-spacer" />
        {eventsInWeek.map((event) => (
          <div
            key={event.id}
            className="event-position-layout"
            data-eventid={event.id}
            style={{
              gridColumn: getEventPosition(event, daysInweek),
              visibility: 'hidden', // start hidden to avoid flashes of events that will be hidden
            }}
            onMouseOver={() => setHighlight(event.id)}
            onFocus={() => setHighlight(event.id)}
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
