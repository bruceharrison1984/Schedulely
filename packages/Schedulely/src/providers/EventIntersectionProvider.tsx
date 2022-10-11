import {
  MutableRefObject,
  ReactNode,
  createContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

type EventIntersectionContextState = {
  parentContainerRef: MutableRefObject<null>;
  hiddenEvents: string[];
  eventContainerRefs: Record<string, HTMLElement | null>;
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
}: {
  children: ReactNode;
}) => {
  const parentContainerRef = useRef(null);
  const eventContainerRefs = useRef<Record<string, HTMLElement | null>>({});
  const [hiddenEvents, setHiddenEvents] = useState<string[]>([]);

  const setRefFromKey = (key: string) => (element: HTMLElement | null) =>
    (eventContainerRefs.current[key] = element);

  const checkIntersection: IntersectionObserverCallback = (entries) =>
    entries.map((x) => {
      const eventId = x.target.attributes.getNamedItem('data-eventid');
      if (eventId) {
        if (x.intersectionRatio < 1) {
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
      root: parentContainerRef.current,
      rootMargin: '0px 0px -15% 0px',
      threshold: 1,
    });

    if (eventContainerRefs.current)
      Object.values(eventContainerRefs.current).map((element) => {
        if (element) observer.observe(element);
      });

    return () => {
      if (eventContainerRefs.current)
        Object.values(eventContainerRefs.current).map((element) => {
          if (element) observer.unobserve(element);
        });
      observer.disconnect();
    };
  }, [eventContainerRefs]);

  const value = {
    parentContainerRef,
    hiddenEvents,
    eventContainerRefs: eventContainerRefs.current,
    setRefFromKey,
  };

  return (
    <EventIntersectionContext.Provider value={value}>
      {children}
    </EventIntersectionContext.Provider>
  );
};
