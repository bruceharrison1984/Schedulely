import { EventIntersectionContext } from '@/providers/EventIntersectionProvider';
import { useContext } from 'react';

export const useEventIntersection = () => {
  const intersection = useContext(EventIntersectionContext);
  if (!intersection)
    throw new Error(
      'useEventIntersection must be used within EventIntersectionProvider'
    );
  return intersection;
};
