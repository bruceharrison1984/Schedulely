import { JSXElementConstructor, PropsWithChildren } from 'react';

/**
 * Props interface for creating Day components
 */
export interface DayComponentProps {
  /** Does this date represent the current month (used for coloring trailing/leading days) */
  isCurrentMonth: boolean;
}

/**
 * Type used for creating DayComponent
 */
export type DayComponent = JSXElementConstructor<
  PropsWithChildren<DayComponentProps>
>;
