import { InternalCalendarEvent, useCalendar, useComponents } from 'src';
import { useEventHighlight } from '@/hooks/useEventHighlight';

interface EventLayoutProps {
  events: InternalCalendarEvent[];
  startOfWeek: Date;
  endOfWeek: Date;
}

/**
 * This component controls the layout of an individual events within a week
 * @returns EventLayout Component
 */
export const EventWeekLayout = ({
  events,
  startOfWeek,
  endOfWeek,
}: EventLayoutProps) => {
  const {
    dateAdapter: {
      getGridStartIndex: getStartIndex,
      getGridEndIndex: getEndIndex,
    },
  } = useCalendar();
  const { isHighlighted, setHighlight, clearHighlight } = useEventHighlight();
  const { eventComponent: EventComponent } = useComponents();

  return (
    <div className="calendo--event-week-layout">
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
            onMouseOver={() => setHighlight(event.id)}
            onMouseLeave={clearHighlight}
          >
            <EventComponent event={event} isHovered={isHighlighted(event.id)} />
          </div>
        );
      })}
    </div>
  );
};
