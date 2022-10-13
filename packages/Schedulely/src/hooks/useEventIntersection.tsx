import { useLayoutEffect, useState } from 'react';

export const useEventIntersection = () => {
  const [eventRefs, setEventRefs] = useState<
    Record<string, HTMLElement | null>
  >({});

  const [weekLayoutRef, setWeekLayoutRef] = useState<HTMLElement | null>(null);

  const [eventVisibility, setEventVisibility] = useState<
    Record<string, boolean>
  >({});

  const setRefFromKey = (key: string) => (element: HTMLElement | null) =>
    setEventRefs((current) => {
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
    });

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(checkIntersection, {
      root: weekLayoutRef,
      rootMargin: '0px 0px -15% 0px',
      threshold: 1,
    });

    Object.values(eventRefs).map((eventRef) => {
      if (eventRef) observer.observe(eventRef!);
    });

    return () => {
      Object.values(eventRefs).map((eventRef) => {
        if (eventRef) observer.unobserve(eventRef!);
      });
      observer.disconnect();
    };
  });

  return { setWeekLayoutRef, setRefFromKey, isEventHidden };
};
