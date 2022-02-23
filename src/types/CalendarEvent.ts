/**
 * This object represents an event that is supplied by the client
 */
export interface CalendarEvent {
  /** Unique *external* ID of the event */
  id: string;

  /** Start date of the event (ISO format w/Timezone) */
  start: string;

  /** End date of the event  (ISO format w/Timezone) */
  end: string;

  /** Text that will be visible on the event */
  summary: string;

  /** Visible color of the event *(css color value)* */
  color: string;
}

/**
 * This object represents an event that is displayed on the calendar
 */
export interface InternalCalendarEvent {
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
