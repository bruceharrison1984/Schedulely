import { InternalEventWeek } from '..';
import {
  MutableRefObject,
  ReactNode,
  createContext,
  useLayoutEffect,
  useState,
} from 'react';

type EventIntersectionContextState = {
  isEventHidden: (eventId: string) => 'hidden' | 'visible';
  setRefFromKey: (
    key: string
  ) => (element: HTMLElement | null) => HTMLElement | null;
};

export const EventIntersectionContext =
  createContext<EventIntersectionContextState | null>(null);
EventIntersectionContext.displayName = 'EventIntersectionContext';

/**
 * Enables highlighting of events that span multiple weeks. Kinda hacky but it works.
 * @param {ReactNode} children Child nodes
 * @returns HighlightProvider component
 */
export const EventIntersectionProvider = ({
  children,
  parentRef,
}: {
  children: ReactNode;
  parentRef: MutableRefObject<null>;
}) => {
  const [eventContainerRefs, setContainerRefs] = useState<
    Record<string, HTMLElement | null>
  >({});
  const [hiddenEvents, setHiddenEvents] = useState<string[]>([]);

  const setRefFromKey = (key: string) => (element: HTMLElement | null) => {
    setContainerRefs((current) => {
      current[key] = element;
      return current;
    });
    return element;
  };

  const isEventHidden = (eventId: string) =>
    hiddenEvents.includes(eventId) ? 'hidden' : 'visible';

  const checkIntersection: IntersectionObserverCallback = (entries) =>
    entries.map((x) => {
      console.log('checking', x);
      const eventId = x.target.attributes.getNamedItem('data-eventid');
      if (eventId) {
        if (x.intersectionRatio < 1) {
          console.log('hiding event');
          setHiddenEvents((current) => {
            if (!current.includes(eventId.value)) current.push(eventId.value);
            return current;
          });
        } else {
          setHiddenEvents((current) => {
            return current.filter((x) => x != eventId.value);
          });
        }
      }
    });

  useLayoutEffect(() => {
    console.log('intersection hook');
    const observer = new IntersectionObserver(checkIntersection, {
      root: parentRef.current,
      rootMargin: '0px 0px -15% 0px',
      threshold: 1,
    });

    if (eventContainerRefs)
      Object.values(eventContainerRefs).map((element) => {
        if (element) observer.observe(element);
      });

    return () => {
      if (eventContainerRefs) {
        Object.values(eventContainerRefs).map((element) => {
          if (element) observer.unobserve(element);
        });
        setContainerRefs({});
      }
      observer.disconnect();
    };
  }, [eventContainerRefs]);

  const value = {
    isEventHidden,
    setRefFromKey,
  };

  return (
    <EventIntersectionContext.Provider value={value}>
      {children}
    </EventIntersectionContext.Provider>
  );
};
