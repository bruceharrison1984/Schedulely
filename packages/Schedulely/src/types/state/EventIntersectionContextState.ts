import { InternalCalendarEvent } from '@/types';

export type EventIntersectionState = {
  /** Set the parent container that will be used as the root element for overflow detection */
  setParentContainerRef: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >;

  /** Gets an array of events that occur on or span the supplied date. */
  getEventsOnDate: (date: Date) => InternalCalendarEvent[];

  /** Gets an array of events that occur on or span the supplied date. */
  getEvent: (eventId: string) => InternalCalendarEvent;
};
