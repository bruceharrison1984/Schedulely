import { DateTimeAdapter } from '..';
import { EventPriority } from '../EventPriority';
import { InternalEventWeek } from '../InternalEventWeek';

export type CalendarContextState = {
  /** The current active date (this controls calendar position) */
  currentDate: Date;

  /** The current active month */
  currentMonth: string;

  /** The current active year */
  currentYear: number;

  /** The DateTimeAdapter that is being utilized */
  dateAdapter: DateTimeAdapter;

  /** Indicates if the active month is the current month */
  isCurrentMonth: boolean;

  /** The days of the week, for use in the calendar header */
  daysOfWeek: string[];

  /** Advance the calendar one month */
  onNextMonth: () => void;

  /** Decrease the calendar by one month */
  onPrevMonth: () => void;

  /** Advance the calendar one year */
  onNextYear: () => void;

  /** Decrease the calendar by one year */
  onPrevYear: () => void;

  /** Calendar with events that will be displayed */
  calendarWithEvents: InternalEventWeek[];

  /** Which length of event should take priority.
   * If set to short, long events will be pushed off the calendar before short ones.
   * If set to long, short events will be pushed off the calendar before long ones.
   *
   * _Long is the default_ */
  eventPriority: EventPriority;
};
