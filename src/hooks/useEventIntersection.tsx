import { MutableRefObject, useEffect, useRef, useState } from 'react';

type EventIntersectionProps = Omit<IntersectionObserverInit, 'root'> & {
  root: MutableRefObject<null>;
};

export const useEventIntersection = ({
  root,
  rootMargin,
  threshold,
}: EventIntersectionProps) => {
  const eventContainerRef = useRef(null);
  const [isOverlapping, setIsOverlapping] = useState<boolean>(false);

  const checkIntersection: IntersectionObserverCallback = (entries) => {
    // if any part of the element is hidden, set overlap
    entries.map((x) => {
      if (x.intersectionRatio < 1) {
        console.log(x.intersectionRatio);
        setIsOverlapping(true);
      }
    });
  };

  useEffect(() => {
    const currentContainer = eventContainerRef.current;

    const observer = new IntersectionObserver(checkIntersection, {
      root: root.current,
      rootMargin,
      threshold,
    });

    if (currentContainer) observer.observe(currentContainer);

    return () => {
      if (currentContainer) observer.unobserve(currentContainer);
    };
  });

  return { eventContainerRef, isOverlapping };
};
