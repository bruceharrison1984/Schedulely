import { InternalCalendarEvent } from '@/types';

/** This represents a single calendar week, including both days, events, and their relationships */
export interface InternalEventWeek {
  /** The calendar days in the week */
  daysInWeek: Date[];

  /** The events that occur within the week */
  events: InternalCalendarEvent[];
}
