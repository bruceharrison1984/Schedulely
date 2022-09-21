import { InternalCalendarEvent } from '../InternalCalendarEvent';
import { JSXElementConstructor, PropsWithChildren } from 'react';

/**
 * Props interface for creating Day components
 */
export interface DayComponentProps {
  /** Does this date represent the current month (used for coloring trailing/leading days) */
  isCurrentMonth: boolean;

  /** The day number portion of the Date */
  dateNumber: number;

  /** Does this date represent today? */
  isToday: boolean;

  /** Does this date have more events than can fit in the grid? */
  isOverflowed: boolean;

  /** Events occuring on this date */
  events: InternalCalendarEvent[];

  /** Function executes when the indicator is clicked */
  onClick: (event: InternalCalendarEvent[]) => void;
}

/**
 * Type used for creating DayComponent
 */
export type DayComponent = JSXElementConstructor<
  PropsWithChildren<DayComponentProps>
>;
