import { ComponentContext } from '@/providers/ComponentProvider';
import { useContext } from 'react';

export const useComponents = () => {
  const calendar = useContext(ComponentContext);
  if (!calendar)
    throw new Error('useComponents must be used within ComponentProvider');
  return calendar;
};
