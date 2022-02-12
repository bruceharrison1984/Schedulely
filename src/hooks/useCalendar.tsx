import { CalendarContext } from '@/providers/index';
import { useContext } from 'react';

export const useCalendar = () => {
  const calendar = useContext(CalendarContext);
  if (!calendar)
    throw new Error('useCalendar must be used within CalendarProvider');
  return calendar;
};
