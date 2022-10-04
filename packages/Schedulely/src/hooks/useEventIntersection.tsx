import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

type EventIntersectionProps = Omit<IntersectionObserverInit, 'root'> & {
  root: MutableRefObject<null>;
};

/**
 * Check if the eventContainerRef is outside the bounds of the root container.
 * If true, isOverlapping will be set to true
 * @param param0 EventIntersectionProps
 * @returns
 */
export const useEventIntersection = ({
  root,
  rootMargin = '0px 0px -1% 0px',
  threshold = 1,
}: EventIntersectionProps) => {
  const eventContainerRef = useRef(null);
  const [isOverlapping, setIsOverlapping] = useState<boolean>(false);

  /**
   * If any part of the element is hidden or touching the edge, set overlap to true
   * @param entries IntersectionObserverEntry[]
   */
  const checkIntersection: IntersectionObserverCallback = (entries) =>
    entries.map((x) => x.intersectionRatio < 1 && setIsOverlapping(true));

  useLayoutEffect(() => {
    const eventContainer = eventContainerRef.current;

    const observer = new IntersectionObserver(checkIntersection, {
      root: root.current,
      rootMargin,
      threshold,
    });

    if (eventContainer) observer.observe(eventContainer);

    return () => {
      if (eventContainer) observer.unobserve(eventContainer);
    };
  });

  return { eventContainerRef, isOverlapping };
};
