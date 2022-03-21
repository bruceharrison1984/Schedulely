import { InternalCalendarEvent } from '@/types/index';

export interface EventWeek {
  weekStart: Date;
  weekEnd: Date;
  daysInWeek: Date[];
  events: InternalCalendarEvent[];
  eventsOnDays: { date: Date; events: InternalCalendarEvent[] }[];
}
