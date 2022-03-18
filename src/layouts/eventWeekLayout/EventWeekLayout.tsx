import {
  EventPositionLayout,
  InternalCalendarEvent,
  useCalendar,
  useComponents,
} from 'src';
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
  const { eventComponent: EventComponent } = useComponents();
  const { isHighlighted } = useEventHighlight();

  return (
    <div className="calendo--event-week-layout">
      {events.map((event) => (
        <EventPositionLayout
          key={event.id}
          event={event}
          startIndex={getStartIndex(event.start, startOfWeek)}
          endIndex={getEndIndex(event.end, endOfWeek)}
        >
          <EventComponent event={event} isHovered={isHighlighted(event.id)} />
        </EventPositionLayout>
      ))}
    </div>
  );
};
