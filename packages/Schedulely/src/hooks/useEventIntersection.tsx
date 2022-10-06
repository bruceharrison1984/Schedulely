import { useLayoutEffect, useRef } from 'react';

type EventVisibility = {
  element: HTMLElement | null;
  isVisible?: boolean;
};

/**
 * Check if the eventContainerRef is outside the bounds of the root container.
 * If true, isOverlapping will be set to true
 * @param param0 EventIntersectionProps
 * @returns
 */
export const useEventIntersection = () => {
  const parentContainerRef = useRef(null);
  const eventContainerRefs = useRef<Record<string, EventVisibility>>({});

  const setRefFromKey = (key: string) => (element: HTMLElement | null) => {
    eventContainerRefs.current[key] = { element };
  };

  useLayoutEffect(() => {
    if (!parentContainerRef.current) return;

    const checkIntersection: IntersectionObserverCallback = (entries) =>
      entries.map((x) => {
        if (x.intersectionRatio < 1) {
          console.log(x);
        }
      });

    const observer = new IntersectionObserver(checkIntersection, {
      root: parentContainerRef.current,
      rootMargin: '0px 0px -1% 0px',
      threshold: 1,
    });

    Object.values(eventContainerRefs.current).map(({ element }) => {
      if (element) observer.observe(element);
    });

    return () => {
      Object.values(eventContainerRefs.current).map(({ element }) => {
        if (element) observer.unobserve(element);
      });
    };
  }, [parentContainerRef, eventContainerRefs]);

  return { parentContainerRef, eventContainerRefs, setRefFromKey };
};
