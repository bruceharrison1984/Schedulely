import { InternalCalendarEvent } from '@/types/InternalCalendarEvent';
import { useActions } from '@/hooks/useActions';
import { useCalendar } from '@/hooks/useCalendar';
import { useComponents } from '@/hooks/useComponents';
import { useEventHighlight } from '@/hooks/useEventHighlight';
import { useLayoutEffect, useRef } from 'react';

interface EventLayoutProps {
  events: InternalCalendarEvent[];
  daysInweek: Date[];
}

const useRefs = () => {
  const refs = useRef<Record<string, HTMLElement | null>>({});

  const setRefFromKey = (key: string) => (element: HTMLElement | null) => {
    refs.current[key] = element;
  };

  return { refs: refs.current, setRefFromKey };
};

/**
 * This component controls the layout of an individual events within a week
 * @returns EventLayout Component
 */
export const EventWeekLayout = ({ events, daysInweek }: EventLayoutProps) => {
  const {
    dateAdapter: { getGridStartIndex, getGridEndIndex },
  } = useCalendar();
  const { eventComponent: EventComponent } = useComponents();
  const { setHighlight, clearHighlight, isHighlighted } = useEventHighlight();
  const { onEventClick } = useActions();

  const { refs, setRefFromKey } = useRefs();
  const weekLayoutRef = useRef(null);

  useLayoutEffect(() => {
    const checkIntersection: IntersectionObserverCallback = (entries) =>
      entries.map((x) => {
        var styles = x.target.attributes.getNamedItem('style');
        if (x.intersectionRatio < 1) {
          if (styles) {
            styles.value = `${styles.value} display: none;`;
            x.target.attributes.setNamedItem(styles);
          }
        } else {
          if (styles) {
            styles.value = `${styles.value} display: block;`;
            x.target.attributes.setNamedItem(styles);
          }
        }
      });

    if (!weekLayoutRef.current) return;

    const observer = new IntersectionObserver(checkIntersection, {
      root: weekLayoutRef.current,
      rootMargin: '0px 0px -1% 0px',
      threshold: 1,
    });

    Object.values(refs).map((eventRef) => {
      if (eventRef) observer.observe(eventRef);
    });

    return () => {
      Object.values(refs).map((eventRef) => {
        if (eventRef) observer.unobserve(eventRef);
      });
    };
  }, [weekLayoutRef, refs]);

  return (
    <div className="event-week-layout" ref={weekLayoutRef}>
      <div className="event-week-layout-grid">
        <div className="event-week-layout-header-spacer" />
        {events.map((event) => (
          <div
            key={event.id}
            className="event-position-layout"
            data-eventid={event.id}
            style={{
              gridColumnStart: getGridStartIndex(event.start, daysInweek[0]),
              gridColumnEnd: getGridEndIndex(event.end, daysInweek[6]),
              // visibility: isEventHidden(event.id),
            }}
            onMouseOver={() => setHighlight(event.id)}
            onMouseLeave={clearHighlight}
            ref={setRefFromKey(event.id)}
          >
            <EventComponent
              event={event}
              isHovered={isHighlighted(event.id)}
              onClick={onEventClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
