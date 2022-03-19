import {
  EventPositionLayout,
  InternalCalendarEvent,
  useCalendar,
  useComponents,
} from 'src';
import { useEventHighlight } from '@/hooks/useEventHighlight';

interface EventLayoutProps {
  events: InternalCalendarEvent[];
  daysInweek: Date[];
  // startOfWeek: Date;
  // endOfWeek: Date;
}

/**
 * This component controls the layout of an individual events within a week
 * @returns EventLayout Component
 */
export const EventWeekLayout = ({
  events,
  daysInweek,
}: // startOfWeek,
// endOfWeek,
EventLayoutProps) => {
  const {
    dateAdapter: {
      getGridStartIndex: getStartIndex,
      getGridEndIndex: getEndIndex,
    },
  } = useCalendar();
  const { eventComponent: EventComponent } = useComponents();
  const { isHighlighted } = useEventHighlight();

  const eventsOnDayMap = () => {
    const eventsDayMap = new Map<number, InternalCalendarEvent[]>([]);
    for (let index = 0; index < 6; index++) {
      eventsDayMap.set(
        daysInweek[index].getDate(),
        events.filter(
          (event) =>
            event.start <= daysInweek[index] && event.end >= daysInweek[index]
        )
      );
    }
    return eventsDayMap;
  };

  return (
    <div className="calendo--event-week-layout">
      {events.map((event) => (
        <EventPositionLayout
          key={event.id}
          event={event}
          startIndex={getStartIndex(event.start, daysInweek[0])}
          endIndex={getEndIndex(event.end, daysInweek[6])}
        >
          <EventComponent event={event} isHovered={isHighlighted(event.id)} />
        </EventPositionLayout>
      ))}
      {console.log(eventsOnDayMap())}
    </div>
  );
};
