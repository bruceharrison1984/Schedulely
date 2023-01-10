import { InternalCalendarEvent } from '../InternalCalendarEvent';

/** Represents the state of the ActionProvider */
export interface ActionContextState {
  /** function that will run when an event is clicked on */
  onEventClick: (event: InternalCalendarEvent) => void;

  /** function that will run when the 'more events' indicator is clicked on */
  onMoreEventsClick: (event: InternalCalendarEvent[]) => void;

  /** function that will run whenever the month of the calendar is changed */
  onMonthChangeClick: (firstOfMonth: Date, lastOfMonth: Date) => void;

  /** function that will run whenever a day container on the calendar is clicked */
  onDayClick: (day: Date) => void;
}
