import { InternalCalendarEvent } from '..';
import { useLayoutEffect, useRef, useState } from 'react';

/**
 * Check if the eventContainerRef is outside the bounds of the root container.
 * If true, isOverlapping will be set to true
 * @param param0 EventIntersectionProps
 * @returns
 */
export const useEventIntersection = (events: InternalCalendarEvent[]) => {
  const parentContainerRef = useRef(null);
  const eventContainerRefs = useRef<Record<string, HTMLElement | null>>({});
  const [hiddenEvents, setHiddenEvents] = useState<Record<string, boolean>>({});

  const setRefFromKey = (key: string) => (element: HTMLElement | null) => {
    eventContainerRefs.current[key] = element;
  };

  const checkIntersection: IntersectionObserverCallback = (entries) =>
    entries.map((x) => {
      const eventId = x.target.attributes.getNamedItem('data-eventid');
      if (eventId) {
        if (x.intersectionRatio < 1) {
          setHiddenEvents((current) => {
            current[eventId.value] = true;
            return current;
          });
        } else {
          setHiddenEvents((current) => {
            current[eventId.value] = false;
            return current;
          });
        }
      }
    });

  useLayoutEffect(() => {
    console.log('running hook');
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
  });

  return {
    parentContainerRef,
    hiddenEvents,
    eventContainerRefs: eventContainerRefs.current,
    setRefFromKey,
  };
};
