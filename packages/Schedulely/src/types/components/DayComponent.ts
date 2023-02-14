import { InternalCalendarEvent } from '@/types';
import { JSXElementConstructor, PropsWithChildren } from 'react';

/**
 * Props interface for creating Day components
 */
export interface DayComponentProps<T extends object = {}> {
  /** Does this date represent the current month (used for coloring trailing/leading days) */
  isCurrentMonth: boolean;

  /** Does this date represent today? */
  isToday: boolean;

  /** Does this date have more events than can fit in the grid? */
  isOverflowed: boolean;

  /** Events occuring on this date */
  events: InternalCalendarEvent<T>[];

  /** Function executes when the more events indicator is clicked */
  onMoreEventsClick: (event: InternalCalendarEvent<T>[]) => void;

  /** Function executes when the day container is clicked */
  onDayClick: (day: Date) => void;

  /** JS Date object representing this day */
  date: Date;
}

/**
 * Type used for creating DayComponent
 */
export type DayComponent<T extends object = {}> = JSXElementConstructor<
  PropsWithChildren<DayComponentProps<T>>
>;
