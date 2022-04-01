import { InternalCalendarEvent } from '@/types/index';
import { Temporal } from '@js-temporal/polyfill';

export interface InternalEventWeek {
  weekStart: Temporal.ZonedDateTime;
  weekEnd: Temporal.ZonedDateTime;
  daysInWeek: Temporal.ZonedDateTime[];
  events: InternalCalendarEvent[];
  eventsOnDays: {
    date: Temporal.ZonedDateTime;
    events: InternalCalendarEvent[];
  }[];
}
