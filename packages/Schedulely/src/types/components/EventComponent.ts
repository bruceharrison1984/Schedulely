import { InternalCalendarEvent } from '@/types';
import { JSXElementConstructor } from 'react';

/**
 * Props interface for creating Event components
 */
export interface EventComponentProps<T extends object = {}> {
  /* The object that represents this event */
  event: InternalCalendarEvent<T>;

  /* True when event is hovered. Can be used to control event display when spanning multiple weeks. */
  isHovered: boolean;

  /** Function executes when the event is clicked */
  onClick: (event: InternalCalendarEvent<T>) => void;
}

/**
 * Type used for creating EventComponent.
 *
 * *optional:* The `<T>` parameter is used to define the structure of the Event `data` property if required.
 * This can be used to pass additional data into Event component.
 */
export type EventComponent<T extends object = {}> = JSXElementConstructor<
  EventComponentProps<T>
>;
