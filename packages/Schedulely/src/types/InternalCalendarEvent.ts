/**
 * This object represents an event that is supplied by the client
 */
export type CalendarEvent<T extends object = {}> = {
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

  /** Optional event data object */
  data?: T;
};

/**
 * This object is used internally to represent Events
 */
export type InternalCalendarEvent<T extends object = {}> = Omit<
  CalendarEvent<T>,
  'start' | 'end'
> & {
  /** Start date of the event */
  start: Date;

  /** End date of the event */
  end: Date;

  /** Is this event visible (not hidden) */
  visible: boolean;

  /** The week that this event falls in for the current month */
  weekNumber?: number;
};
