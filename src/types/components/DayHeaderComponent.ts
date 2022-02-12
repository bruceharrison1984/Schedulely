import { JSXElementConstructor } from 'react';

/**
 * Props interface for creating Day components
 */
export interface DayHeaderComponentProps {
  /** The day number portion of the Date */
  dateNumber: number;

  /** Does this date represent today? */
  isToday: boolean;
}

/**
 * Type used for creating DayComponent
 */
export type DayHeaderComponent = JSXElementConstructor<DayHeaderComponentProps>;
