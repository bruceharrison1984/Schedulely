import { JSXElementConstructor } from 'react';

/** Props used when creating a Header */
export interface HeaderProps {
  /** The current month the calendar is displaying */
  month: string;
  /** The current year the calendar is displaying */
  year: number;
  isCurrentMonth: boolean;
  onNextMonth: () => void;
  onNextYear: () => void;
  onPrevMonth: () => void;
  onPrevYear: () => void;
}

/** The month/year banner displayed at the top of the calendar */
export type HeaderComponent = JSXElementConstructor<HeaderProps>;
