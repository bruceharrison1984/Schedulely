import { InternalCalendarEvent } from '@/types';
import { useLayoutEffect, useState } from 'react';

export const useEventIntersection = (events: InternalCalendarEvent[]) => {
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

  return { setParentContainerRef, setRefFromKey, isEventVisible };
};
