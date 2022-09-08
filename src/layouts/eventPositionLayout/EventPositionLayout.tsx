import { InternalCalendarEvent } from '@/types/InternalCalendarEvent';
import { MutableRefObject, PropsWithChildren } from 'react';
import { useEventHighlight } from '@/hooks/useEventHighlight';
import { useEventIntersection } from '@/hooks/useEventIntersection';

interface EventPositionLayoutProps {
  event: InternalCalendarEvent;
  startIndex: number;
  endIndex: number;
  parentContainerRef: MutableRefObject<null>;
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
  parentContainerRef,
}: PropsWithChildren<EventPositionLayoutProps>) => {
  const { setHighlight, clearHighlight } = useEventHighlight();
  const { eventContainerRef, isOverlapping } = useEventIntersection({
    root: parentContainerRef,
    threshold: 1,
  });

  return (
    <div
      className="event-position-layout"
      data-eventid={event.id}
      style={{
        gridColumnStart: startIndex,
        gridColumnEnd: endIndex,
        border: isOverlapping ? 'solid 1px red' : undefined,
      }}
      onMouseOver={() => setHighlight(event.id)}
      onMouseLeave={clearHighlight}
      ref={eventContainerRef}
    >
      {children}
    </div>
  );
};
