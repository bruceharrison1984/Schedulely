import { EventPriority } from '@/types/EventPriority';
import { InternalCalendarEvent } from '@/types/InternalCalendarEvent';
import {
  useActions,
  useCalendar,
  useComponents,
  useEventHighlight,
  useEventIntersection,
} from '@/hooks';

export interface EventLayoutProps {
  eventsInWeek: InternalCalendarEvent[];
  daysInweek: Date[];
}

/**
 * Calculate the CSS grid position for a given date within a week
 * @param event The calendar event to position
 * @param daysInWeek The week to position the event within
 * @returns CSS grid-column value
 */
export const getEventPosition = (
  { start, end }: InternalCalendarEvent,
  daysInWeek: Date[]
) => {
  if (
    (start > daysInWeek[6] && end > daysInWeek[6]) ||
    (start < daysInWeek[0] && end < daysInWeek[0])
  )
    throw new Error('Event doesnt cross over this week!');

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

  return `${startIndex}/${endIndex}`;
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
  const { setParentContainerRef, getEvent } = useEventIntersection();
  const { eventPriority } = useCalendar();

  const calculateOrder = (event: InternalCalendarEvent) => {
    let priority =
      -(event.end.getTime() - event.start.getTime()) / (1000 * 3600 * 24);
    if (eventPriority === EventPriority.short) priority = -priority;
    return priority;
  };

  return (
    <div className="event-week-layout" ref={setParentContainerRef}>
      <div className="event-week-layout-grid">
        <div className="event-week-layout-header-spacer" />
        {eventsInWeek.map((event) => (
          <div
            key={event.id}
            className="event-position-layout"
            data-eventid={[event.id, event.weekNumber].join('-')}
            style={{
              gridColumn: getEventPosition(event, daysInweek),
              visibility: getEvent([event.id, event.weekNumber].join('-'))
                ?.visible
                ? undefined
                : 'hidden', // start hidden to avoid flashes of events that will be hidden
              order: calculateOrder(event),
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
