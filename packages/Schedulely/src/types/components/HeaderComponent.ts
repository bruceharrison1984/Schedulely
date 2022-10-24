import { ComponentSize } from '../ComponentSize';
import { JSXElementConstructor } from 'react';

/** Props used when creating a Header */
export interface HeaderComponentProps {
  /** The current month the calendar is displaying */
  month: string;
  /** The current year the calendar is displaying */
  year: number;

  /** True if the selected month is the same as the current month */
  isCurrentMonth: boolean;

  /** Triggers moving forward one month */
  onNextMonth: () => void;

  /** Triggers moving forward one year */
  onNextYear: () => void;

  /** Triggers moving back one month */
  onPrevMonth: () => void;

  /** Triggers moving back one year */
  onPrevYear: () => void;

  /** The current size of the header component */
  componentSize: ComponentSize;
}

/** The month/year banner displayed at the top of the calendar */
export type HeaderComponent = JSXElementConstructor<HeaderComponentProps>;
