import { InternalCalendarEvent, useEventHighlight } from 'src';
import { ReactNode } from 'react';

interface EventPositionLayoutProps {
  event: InternalCalendarEvent;
  startIndex: number;
  endIndex: number;
  children: ReactNode;
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
}: EventPositionLayoutProps) => {
  const { setHighlight, clearHighlight } = useEventHighlight();

  return (
    <div
      className="schedulely--event-position-layout"
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
