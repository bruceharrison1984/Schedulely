import { InternalCalendarEvent } from '@/types';
import { useLayoutEffect, useState } from 'react';

export const useEventIntersection = (events: InternalCalendarEvent[]) => {
  const [childContainerRefs, setChildContainerRefs] = useState<
    Record<string, HTMLElement | null>
  >({});

  const [parentContainerRef, setParentContainerRef] =
    useState<HTMLElement | null>(null);

  const [eventVisibility, setEventVisibility] = useState<
    Record<string, boolean>
  >({});

  const [hiddenEvents, setHiddenEvents] = useState<
    Record<string, InternalCalendarEvent[]>
  >({});

  const setRefFromKey = (key: string) => (element: HTMLElement | null) =>
    setChildContainerRefs((current) => {
      current[key] = element;
      return current;
    });

  const isEventHidden = (key: string) => eventVisibility[key];

  const checkIntersection: IntersectionObserverCallback = (entries) =>
    entries.map((x) => {
      var eventId = x.target.attributes.getNamedItem('data-eventid')?.value;
      if (eventId === undefined) return;
      setEventVisibility((current) => {
        current[eventId!] = x.intersectionRatio < 1;
        return { ...current };
      });
      setHiddenEvents((current) => {
        var hiddenEvent = events?.find((x) => x.id === eventId);
        if (hiddenEvent) {
          let hidden = current[hiddenEvent!.end.toISOString()];
          if (!hidden?.length) hidden = [];
          current[hiddenEvent!.end.toISOString()] = [...hidden, hiddenEvent];
        }

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
  }, [childContainerRefs, parentContainerRef]);

  return { setParentContainerRef, setRefFromKey, isEventHidden, hiddenEvents };
};
