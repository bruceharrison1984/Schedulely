import { CalendarEvent } from './InternalCalendarEvent';

/** Represents the state of the ActionProvider */
export interface ActionState {
  /** function that will run when an event is clicked on */
  onEventClick: (event: CalendarEvent) => void;

  /** function that will run when the 'more events' indicator is clicked on */
  onMoreEventClick: (event: CalendarEvent[]) => void;
}
