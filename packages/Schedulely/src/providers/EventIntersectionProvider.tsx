import { InternalCalendarEvent } from '@/types';
import { ReactNode, createContext, useLayoutEffect, useState } from 'react';
import { useCalendar } from '@/hooks';

type EventIntersectionState = {
  /** Set the parent container that will be used as the root element for overflow detection */
  setParentContainerRef: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >;
  setRefFromKey: (key: string) => (element: HTMLElement | null) => void;
  /** Lookup an event and retrieve its visibility */
  isEventVisible: (key: string) => boolean;
  /** Gets an array of hidden overflow events for the supplied date. An empty array is returned if no days are hidden. */
  getOverflowForDay: (date: Date) => InternalCalendarEvent[];
};

export const EventIntersectionContext =
  createContext<EventIntersectionState | null>(null);
EventIntersectionContext.displayName = 'EventIntersectionContext';

/**
 * Determines which events overflow from the calendar, and when they should be hidden
 * @param {ReactNode} children Child nodes
 * @param {nternalCalendarEvent[]} events Calendar Events assoicated with this parent
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

  const [childContainerRefs, setChildContainerRefs] = useState<
    Record<string, HTMLElement | null>
  >({});

  const [parentContainerRef, setParentContainerRef] =
    useState<HTMLElement | null>(null);

  const [eventVisibility, setEventVisibility] = useState<
    Record<string, InternalCalendarEvent>
  >({});

  const setRefFromKey = (key: string) => (element: HTMLElement | null) =>
    setChildContainerRefs((current) => {
      current[key] = element;
      return current;
    });

  const getOverflowForDay = (date: Date) =>
    Object.values(eventVisibility).filter(
      (x) => !x.visible && isDateBetween(date, x.start, x.end)
    );

  const isEventVisible = (key: string) => eventVisibility[key]?.visible;

  const checkIntersection: IntersectionObserverCallback = (entries) =>
    entries.map((x) => {
      var eventId = x.target.attributes.getNamedItem('data-eventid')?.value;
      const matchingEvent = events.find((x) => x.id === eventId);
      if (matchingEvent === undefined) return;

      setEventVisibility((current) => {
        current[matchingEvent.id] = matchingEvent;
        current[matchingEvent.id].visible = x.intersectionRatio >= 1;
        return { ...current };
      });
    });

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(checkIntersection, {
      root: parentContainerRef,
      rootMargin: '0px 0px -15% 0px',
      threshold: 1,
    });

    Object.values(childContainerRefs).map((eventRef) => {
      if (eventRef) observer.observe(eventRef!);
    });

    return () => {
      observer.takeRecords().map((x) => observer.unobserve(x.target));
      observer.disconnect();
    };
  }, [parentContainerRef, events]);

  const value: EventIntersectionState = {
    setParentContainerRef,
    setRefFromKey,
    isEventVisible,
    getOverflowForDay,
  };

  return (
    <EventIntersectionContext.Provider value={value}>
      {children}
    </EventIntersectionContext.Provider>
  );
};
