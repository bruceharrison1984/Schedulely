import { CalendarEvent } from './CalendarEvent';

export interface EventWeek {
  weekStart: Date;
  weekEnd: Date;
  daysInWeek: Date[];
  events: CalendarEvent[];
}
