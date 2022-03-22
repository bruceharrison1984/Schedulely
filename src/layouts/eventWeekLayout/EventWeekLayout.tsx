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
  const { isHighlighted } = useEventHighlight();

  return (
    <div className="schedulely--event-week-layout">
      {events.map((event) => (
        <EventPositionLayout
          key={event.id}
          event={event}
          startIndex={getGridStartIndex(event.start, daysInweek[0])}
          endIndex={getGridEndIndex(event.end, daysInweek[6])}
        >
          <EventComponent event={event} isHovered={isHighlighted(event.id)} />
        </EventPositionLayout>
      ))}
    </div>
  );
};
