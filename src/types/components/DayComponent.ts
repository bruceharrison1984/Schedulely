import { JSXElementConstructor } from 'react';

/**
 * Props interface for creating Day components
 */
export interface DayComponentProps {
  /** Does this date represent the current month (used for coloring trailing/leading days) */
  isCurrentMonth: boolean;

  /** Child elements within the day */
  children?: JSX.Element | JSX.Element[];
}

/**
 * Type used for creating DayComponent
 */
export type DayComponent = JSXElementConstructor<DayComponentProps>;
