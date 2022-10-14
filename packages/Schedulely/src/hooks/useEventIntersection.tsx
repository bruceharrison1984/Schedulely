import { EventIntersectionContext } from '@/providers/EventIntersectionProvider';
import { useContext } from 'react';

export const useEventIntersection = () => {
  const highlight = useContext(EventIntersectionContext);
  if (!highlight)
    throw new Error(
      'useEventIntersection must be used within EventIntersectionProvider'
    );
  return highlight;
};
