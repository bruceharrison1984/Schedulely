import { InternalCalendarEvent } from '../InternalCalendarEvent';
import { JSXElementConstructor } from 'react';

/**
 * Props interface for More Events Indicator components
 */
export interface MoreEventsIndicatorProps {
  events: InternalCalendarEvent[];

  /** Function executes when the indicator is clicked */
  onClick: (event: InternalCalendarEvent[]) => void;
}

/**
 * Type used for creating MoreEventsIndicatorComponent
 */
export type MoreEventsIndicatorComponent =
  JSXElementConstructor<MoreEventsIndicatorProps>;
