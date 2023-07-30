import { EventIntersectionState, InternalCalendarEvent } from '@/types';
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useCalendar } from '@/hooks';

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
  eventsInWeek,
}: {
  children: ReactNode;
  eventsInWeek: InternalCalendarEvent[];
}) => {
  const {
    dateAdapter: { isDateBetween },
  } = useCalendar();

  const [parentContainerRef, setParentContainerRef] =
    useState<HTMLElement | null>(null);

  const observerRef = useRef<IntersectionObserver | undefined>();

  const [eventVisibility, setEventVisibility] = useState<
    Record<string, InternalCalendarEvent>
  >(
    Object.assign(
      {},
      ...eventsInWeek.map((x) => ({ [[x.id, x.weekNumber].join('-')]: x }))
    )
  );

  const getEventsOnDate = useCallback(
    (date: Date) =>
      Object.values(eventVisibility).filter((x) =>
        isDateBetween(date, x.start, x.end)
      ),
    [eventVisibility, isDateBetween]
  );

  const checkIntersection: IntersectionObserverCallback = useCallback(
    (entries) =>
      entries.map((x) => {
        // this controls the event data that is sent back to the DayComponent for event visibility
        setEventVisibility((current) => {
          var eventId = x.target.attributes.getNamedItem('data-eventid')?.value;
          if (!eventId) return { ...current };

          if (!current[eventId]) {
            const matchingEvent = eventsInWeek.find((x) => x.id === eventId)!;
            current[eventId] = matchingEvent;
          }
          current[eventId].visible = x.isIntersecting;
          return { ...current };
        });
      }),
    [eventsInWeek]
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
      for (const element of Array.from(eventContainers))
        observerRef.current!.observe(element);

    return () => {
      observerRef.current!.disconnect();
    };
  }, [checkIntersection, parentContainerRef]);

  const value: EventIntersectionState = {
    setParentContainerRef,
    getEventsOnDate,
    getEvent: (id) => eventVisibility[id],
  };

  return (
    <EventIntersectionContext.Provider value={value}>
      {children}
    </EventIntersectionContext.Provider>
  );
};
