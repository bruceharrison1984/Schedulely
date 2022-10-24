import { InternalCalendarEvent } from '@/types';

export interface InternalEventWeek {
  weekStart: Date;
  weekEnd: Date;
  daysInWeek: Date[];
  events: InternalCalendarEvent[];
  eventsOnDays: { date: Date; events: InternalCalendarEvent[] }[];
}
