import { JSXElementConstructor } from 'react';

/** Props used when creating a HeaderBanner */
export interface HeaderBannerProps {
  /** The current month the calendar is displaying */
  month: string;
  /** The current year the calendar is displaying */
  year: number;
}

/** The month/year banner displayed at the top of the calendar */
export type HeaderBannerComponent = JSXElementConstructor<HeaderBannerProps>;
