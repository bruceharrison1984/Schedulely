import { InternalCalendarEvent } from '../InternalCalendarEvent';
import { JSXElementConstructor } from 'react';

/**
 * Props interface for More Events Indicator components
 */
export interface MoreEventsIndicatorProps {
  events: InternalCalendarEvent[];
}

/**
 * Type used for creating MoreEventsIndicatorComponent
 */
export type MoreEventsIndicatorComponent =
  JSXElementConstructor<MoreEventsIndicatorProps>;
