import { EventPositionLayout } from '@/layouts/eventPositionLayout';
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
  const { isHighlighted } = useEventHighlight();
  const { onEventClick } = useActions();
  const weekLayoutRef = useRef(null);

  return (
    <div ref={weekLayoutRef} className="event-week-layout">
      {weekLayoutRef &&
        events.map((event) => (
          <EventPositionLayout
            key={event.id}
            event={event}
            startIndex={getGridStartIndex(event.start, daysInweek[0])}
            endIndex={getGridEndIndex(event.end, daysInweek[6])}
            parentContainerRef={weekLayoutRef}
          >
            <EventComponent
              event={event}
              isHovered={isHighlighted(event.id)}
              onClick={onEventClick}
            />
          </EventPositionLayout>
        ))}
    </div>
  );
};
