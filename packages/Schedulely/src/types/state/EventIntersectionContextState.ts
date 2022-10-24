import { InternalCalendarEvent } from '@/types';

export type EventIntersectionState = {
  /** Set the parent container that will be used as the root element for overflow detection */
  setParentContainerRef: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >;
  setRefFromKey: (key: string) => (element: HTMLElement | null) => void;
  /** Lookup an event and retrieve its visibility */
  isEventVisible: (key: string) => boolean;
  /** Gets an array of hidden overflow events for the supplied date. An empty array is returned if no days are hidden. */
  getEventsOnDate: (date: Date) => InternalCalendarEvent[];
};
