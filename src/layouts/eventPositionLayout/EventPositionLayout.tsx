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
      data-eventid={event.id}
      style={{
        gridColumnStart: startIndex,
        gridColumnEnd: endIndex,
        minWidth: 0, // this must be zero otherwise events can break out of grid on small displays
      }}
      onMouseOver={() => setHighlight(event.id)}
      onMouseLeave={clearHighlight}
    >
      {children}
    </div>
  );
};
