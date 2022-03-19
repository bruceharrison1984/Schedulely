import { DateTimeAdapter } from '.';
import { EventWeek } from './EventWeek';

export type CalendarState = {
  /** The current visible month */
  currentMonth: Date;

  /** The DateTimeAdapter that is being utilized */
  dateAdapter: DateTimeAdapter;

  /** Array with localized names of the days of the week */
  daysOfWeek: string[];

  /** Advance the calendar one month */
  onNextMonth: () => void;

  /** Decrease the calendar by one month */
  onPrevMonth: () => void;

  /** Calendar with events that will be displayed */
  calendarWithEvents: EventWeek[];
};
