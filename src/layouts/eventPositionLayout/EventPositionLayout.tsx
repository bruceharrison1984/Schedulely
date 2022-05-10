import { InternalCalendarEvent } from '@/types/InternalCalendarEvent';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useEventHighlight } from '@/hooks/useEventHighlight';
import { useRect } from '@/hooks/useRect';

interface EventPositionLayoutProps {
  event: InternalCalendarEvent;
  startIndex: number;
  endIndex: number;
  parentBoundingBox: DOMRect | undefined;
}

/**
 * This component controls the position of an individual event within an event week
 * @returns EventPositionLayout Component
 */
export const EventPositionLayout = ({
  event,
  startIndex,
  endIndex,
  parentBoundingBox,
  children,
}: PropsWithChildren<EventPositionLayoutProps>) => {
  const { setHighlight, clearHighlight } = useEventHighlight();
  const [bounds, ref] = useRect<HTMLDivElement>();
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    console.log({ name: event.summary, parentBoundingBox, bounds });
    if (parentBoundingBox && bounds) {
      if (parentBoundingBox?.bottom < bounds.bottom + 5) {
        console.log(`${event.summary} breaks bounds!`);
        setIsHidden(true);
      }
    }
  }, [parentBoundingBox, bounds, event]);

  return (
    <div
      ref={ref}
      className="event-position-layout"
      data-eventid={event.id}
      style={{
        gridColumnStart: startIndex,
        gridColumnEnd: endIndex,
      }}
      onMouseOver={() => setHighlight(event.id)}
      onMouseLeave={clearHighlight}
      hidden={isHidden}
    >
      {children}
    </div>
  );
};
