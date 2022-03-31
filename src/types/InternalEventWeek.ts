import { InternalCalendarEvent } from '@/types/index';
import { ZonedDateTime } from 'temporal-polyfill';

export interface InternalEventWeek {
  weekStart: ZonedDateTime;
  weekEnd: ZonedDateTime;
  daysInWeek: ZonedDateTime[];
  events: InternalCalendarEvent[];
  eventsOnDays: { date: ZonedDateTime; events: InternalCalendarEvent[] }[];
}
