import { EventIntersectionState, InternalCalendarEvent } from '@/types';
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useCalendar } from '@/hooks/useCalendar';

export const EventIntersectionContext =
  createContext<EventIntersectionState | null>(null);
EventIntersectionContext.displayName = 'EventIntersectionContext';

/**
 * Determines which events overflow from the calendar, and when they should be hidden
 * @param {ReactNode} children Child nodes
 * @param {InternalCalendarEvent[]} events Calendar Events assoicated with this parent
 * @returns EventIntersectionProvider component
 */
export const EventIntersectionProvider = ({
  children,
  events,
}: {
  children: ReactNode;
  events: InternalCalendarEvent[];
}) => {
  const {
    dateAdapter: { isDateBetween },
  } = useCalendar();

  const [parentContainerRef, setParentContainerRef] =
    useState<HTMLElement | null>(null);

  const [eventVisibility, setEventVisibility] = useState<
    Record<string, InternalCalendarEvent>
  >({});

  const observerRef = useRef<IntersectionObserver | undefined>();

  const getEventsOnDate = useCallback(
    (date: Date) =>
      Object.values(eventVisibility).filter((x) =>
        isDateBetween(date, x.start, x.end)
      ),
    [eventVisibility, isDateBetween]
  );

  const isEventVisible = (key: string) => eventVisibility[key]?.visible;

  /**
   * This method checks if an event is fully visible, and if not hides it
   * We do this via direct Refs because direct updates are faster and cleaner than relying upon
   * React to route the property before and after a render.
   *
   * This could possibly be done in a more React-y way by splitting this context, but this seems pretty straight-forward as it.
   */
  const checkIntersection: IntersectionObserverCallback = useCallback(
    (entries) =>
      entries.map((x) => {
        var eventId = x.target.attributes.getNamedItem('data-eventid')?.value;

        const currentStyle = x.target
          .getAttribute('style')
          ?.replaceAll(/\svisibility:.*;/g, '');

        if (x.isIntersecting)
          x.target.setAttribute('style', currentStyle || '');
        else {
          x.target.setAttribute('style', `${currentStyle} visibility: hidden;`);
        }

        const matchingEvent = events.find((x) => x.id === eventId);
        if (matchingEvent === undefined) return;

        setEventVisibility((current) => {
          current[matchingEvent.id] = matchingEvent;
          current[matchingEvent.id].visible = x.isIntersecting;
          return { ...current };
        });
      }),
    [events]
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(checkIntersection, {
      root: parentContainerRef,
      rootMargin: '0px 0px -15% 0px',
      threshold: 1,
    });

    const eventContainers = parentContainerRef?.getElementsByClassName(
      'event-position-layout'
    );

    if (eventContainers)
      for (const element of eventContainers)
        observerRef.current!.observe(element);

    return () => {
      observerRef.current!.disconnect();
    };
  }, [checkIntersection, parentContainerRef]);

  const value: EventIntersectionState = {
    setParentContainerRef,
    isEventVisible,
    getEventsOnDate,
  };

  return (
    <EventIntersectionContext.Provider value={value}>
      {children}
    </EventIntersectionContext.Provider>
  );
};
