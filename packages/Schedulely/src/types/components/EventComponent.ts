import { InternalCalendarEvent } from '@/types';
import { JSXElementConstructor } from 'react';

/**
 * Props interface for creating Event components
 */
export interface EventComponentProps {
  /* The object that represents this event */
  event: InternalCalendarEvent;

  /* True when event is hovered. Can be used to control event display when spanning multiple weeks. */
  isHovered: boolean;

  /** Function executes when the event is clicked */
  onClick: (event: InternalCalendarEvent) => void;
}

/**
 * Type used for creating EventComponent
 */
export type EventComponent = JSXElementConstructor<EventComponentProps>;
