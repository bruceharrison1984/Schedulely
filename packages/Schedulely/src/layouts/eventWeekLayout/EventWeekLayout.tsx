import { InternalCalendarEvent } from '@/types/InternalCalendarEvent';
import { useActions } from '@/hooks/useActions';
import { useCalendar } from '@/hooks/useCalendar';
import { useComponents } from '@/hooks/useComponents';
import { useEventHighlight } from '@/hooks/useEventHighlight';
import { useEventIntersection } from '@/hooks';

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

  const { parentContainerRef, eventContainerRefs, setRefFromKey } =
    useEventIntersection();

  const isEventVisible = (eventId: string) =>
    eventContainerRefs[eventId]?.isVisible ? 'inline-block' : 'none';

  return (
    <div ref={parentContainerRef} className="event-week-layout">
      {/** This div creates space for the DayComponent header on the calendar layer */}
      <div
        style={{
          gridColumnStart: 1,
          gridColumnEnd: 8,
        }}
      />
      {parentContainerRef &&
        events.map((event) => (
          <div
            key={event.id}
            className="event-position-layout"
            data-eventid={event.id}
            style={{
              gridColumnStart: getGridStartIndex(event.start, daysInweek[0]),
              gridColumnEnd: getGridEndIndex(event.end, daysInweek[6]),
              // display: isEventVisible(event.id),
            }}
            onMouseOver={() => setHighlight(event.id)}
            onMouseLeave={clearHighlight}
            ref={setRefFromKey(event.id)}
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
