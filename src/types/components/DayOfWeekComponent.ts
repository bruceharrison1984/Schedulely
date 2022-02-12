import { JSXElementConstructor } from 'react';

/** Props used when creating a DayOfWeek */
export interface DayOfWeekProps {
  /** The the name of the day */
  dayName: string;
}

/** Displays the name of the day at the top of the calendar column */
export type DayOfWeekComponent = JSXElementConstructor<DayOfWeekProps>;
