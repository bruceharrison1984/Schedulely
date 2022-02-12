/**
 * This object represents an event that is displayed on the calendar
 */
export interface CalendarEvent {
  /** Unique *external* ID of the event */
  id: string;

  /** Start date of the event */
  start: Date;

  /** End date of the event */
  end: Date;

  /** Text that will be visible on the event */
  summary: string;

  /** Visible color of the event *(css color value)* */
  color: string;
}
