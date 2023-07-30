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
  weekNumber,
}: {
  children: ReactNode;
  eventsInWeek: InternalCalendarEvent[];
  weekNumber: number;
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
      ...eventsInWeek.map((x) => ({ [[x.id, weekNumber].join('-')]: x }))
    )
  );

  const getEventsOnDate = useCallback(
    (date: Date) =>
      Object.values(eventVisibility).filter((x) =>
        isDateBetween(date, x.start, x.end)
      ),
    [eventVisibility, isDateBetween]
  );

  /**
   * this controls the event data that is sent back to the DayComponent for retrieving event visibility via getEventsOnDate
   */
  const checkIntersection: IntersectionObserverCallback = useCallback(
    (entries) =>
      entries.map(({ target, isIntersecting }) =>
        setEventVisibility((current) => {
          var eventId = target.attributes.getNamedItem('data-eventid')?.value;

          if (!eventId)
            throw new Error(
              'Event does not have a data-eventid attribute! Did you manually create it?'
            );

          if (!current[eventId]) {
            const matchingEvent = eventsInWeek.find(({ id }) => id === eventId);

            if (!matchingEvent) {
              throw new Error(
                `Event ${eventId} not found in event intersection dictionary!`
              );
            }
            current[[eventId, weekNumber].join('-')] = matchingEvent;
          }
          current[[eventId, weekNumber].join('-')].visible = isIntersecting;
          return { ...current };
        })
      ),
    [eventsInWeek, weekNumber]
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
    getEvent: (id) => eventVisibility[[id, weekNumber].join('-')],
  };

  return (
    <EventIntersectionContext.Provider value={value}>
      {children}
    </EventIntersectionContext.Provider>
  );
};
