import { useLayoutEffect, useState } from 'react';

export const useEventIntersection = () => {
  const [eventRefs, setEventRefs] = useState<
    Record<string, HTMLElement | null>
  >({});

  const setRefFromKey = (key: string) => (element: HTMLElement | null) => {
    const old = eventRefs;
    old[key] = element;
    setEventRefs(old);
  };
  const [weekLayoutRef, setWeekLayoutRef] = useState<HTMLElement | null>(null);

  const checkIntersection: IntersectionObserverCallback = (entries) =>
    entries.map((x) => {
      var styles = x.target.attributes.getNamedItem('style');
      if (x.intersectionRatio < 1) {
        if (styles) {
          styles.value = `${styles.value} visibility: hidden;`;
          x.target.attributes.setNamedItem(styles);
        }
      } else {
        if (styles) {
          styles.value = `${styles.value} visibility: visible;`;
          x.target.attributes.setNamedItem(styles);
        }
      }
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
  }, [weekLayoutRef, eventRefs]);

  return { setWeekLayoutRef, setRefFromKey };
};
