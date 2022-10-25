import { ComponentSize } from '../ComponentSize';
import { DateTimeAdapter } from '..';
import { InternalEventWeek } from '../InternalEventWeek';

export type CalendarContextState = {
  /** The current visible month */
  currentMonth: Date;

  /** The DateTimeAdapter that is being utilized */
  dateAdapter: DateTimeAdapter;

  /** Array with localized names of the days of the week */
  getDaysOfWeek: (componentSize: ComponentSize) => string[];

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
};
