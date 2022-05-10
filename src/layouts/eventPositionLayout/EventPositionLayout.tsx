import { InternalCalendarEvent } from '@/types/InternalCalendarEvent';
import { PropsWithChildren } from 'react';
import { useEventHighlight } from '@/hooks/useEventHighlight';

interface EventPositionLayoutProps {
  event: InternalCalendarEvent;
  startIndex: number;
  endIndex: number;
}

/**
 * This component controls the position of an individual event within an event week
 * @returns EventPositionLayout Component
 */
export const EventPositionLayout = ({
  event,
  startIndex,
  endIndex,
  children,
}: PropsWithChildren<EventPositionLayoutProps>) => {
  const { setHighlight, clearHighlight } = useEventHighlight();

  return (
    <div
      className="event-position-layout"
      data-eventid={event.id}
      style={{
        gridColumnStart: startIndex,
        gridColumnEnd: endIndex,
      }}
      onMouseOver={() => setHighlight(event.id)}
      onMouseLeave={clearHighlight}
    >
      {children}
    </div>
  );
};
