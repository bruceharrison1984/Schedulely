import { InternalCalendarEvent } from '@/types/InternalCalendarEvent';
import { WeekDay } from '@/types';
import {
  useActions,
  useComponents,
  useEventHighlight,
  useEventIntersection,
} from '@/hooks';

export interface EventLayoutProps {
  eventsInWeek: InternalCalendarEvent[];
  daysInweek: Date[];
  firstDayOfWeek: WeekDay;
}

export const getGridStartIndex = (eventDate: Date, startOfWeek: Date) =>
  eventDate <= startOfWeek ? 1 : eventDate.getDay() + 1; //add one because css-grid isn't zero-index'd

export const getGridEndIndex = (eventEndDate: Date, endOfWeek: Date) => {
  if (eventEndDate > endOfWeek) return 8;
  const end = eventEndDate.getDay() + 2; // add two because css-grid isn't zero index'd, and day of week is zero-index'd
  return end;
};

export const getEventPosition = (
  { start, end }: InternalCalendarEvent,
  daysInWeek: Date[],
  firstDayOfWeek: WeekDay
) => {
  start.setHours(0, 0, 0, 0); // zero time to avoid slight mismatches, bug potential high
  end.setHours(0, 0, 0, 0); // zero time to avoid slight mismatches, bug potential high

  let startIndex = 1; // default to first column
  if (start >= daysInWeek[0])
    startIndex = Math.abs(start.getDay() + 1 - firstDayOfWeek); //add one because css-grid isn't zero-index'd

  let endIndex = 8; // default to full length
  if (end < daysInWeek[6]) endIndex = end.getDay() + 2 - firstDayOfWeek; // add two because css-grid isn't zero index'd, and day of week is zero-index'd

  const gridColumnPosition = `${startIndex}/${endIndex}`;
  // console.log({ gridColumnPosition, start, end });
  return gridColumnPosition;
};

/**
 * This component controls the layout of an individual events within a week  getEventPosition(event.start, event.end, daysInweek[0], daysInweek[6], firstDayOfWeek),
 * @returns EventLayout Component
 */
export const EventWeekLayout = ({
  eventsInWeek,
  daysInweek,
  firstDayOfWeek,
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
              gridColumn: getEventPosition(event, daysInweek, firstDayOfWeek),
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
