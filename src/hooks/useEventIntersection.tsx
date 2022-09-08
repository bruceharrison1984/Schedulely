import { useEffect, useRef, useState } from 'react';

export const useEventIntersection = ({ root }: IntersectionObserverInit) => {
  const parentContainer = useRef(root);
  const eventContainerRef = useRef(null);
  const [isOverlapping, setIsOverlapping] = useState<boolean>(false);

  const checkItersection: IntersectionObserverCallback = (entries) => {
    const [entry] = entries;
    if (entry.intersectionRatio > 0 && entry.intersectionRatio < 1) {
      console.log(entry);
      setIsOverlapping(entry.isIntersecting);
    }
  };

  useEffect(() => {
    const currentContainer = eventContainerRef.current;
    const parent = parentContainer.current;
    const observer = new IntersectionObserver(checkItersection, {
      root: parent,
    });

    if (currentContainer) observer.observe(currentContainer);

    return () => {
      if (currentContainer) observer.unobserve(currentContainer);
    };
  });

  return { eventContainerRef, isOverlapping };
};
