import { DateConvertor } from '.';
import { EventWeek } from './EventWeek';

export type CalendarState = {
  /** The current visible month */
  currentMonth: Date;

  /** The DateConvertor that is being utilized */
  dateConvertor: DateConvertor;

  /** Array with localized names of the days of the week */
  daysOfWeek: string[];

  /** Advance the calendar one month */
  onNextMonth: () => void;

  /** Decrease the calendar by one month */
  onPrevMonth: () => void;

  /** Calendar with events that will be displayed */
  calendarWithEvents: EventWeek[];

  /** Positive offset used for position calendar events. Represents leading days visible on the current month. */
  dayOffset: number;
};
