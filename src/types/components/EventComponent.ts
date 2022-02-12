import { CalendarEvent } from '@/types/index';
import { JSXElementConstructor } from 'react';

/**
 * Props interface for creating Event components
 */
export interface EventComponentProps {
  event: CalendarEvent;
}

/**
 * Type used for creating EventComponent
 */
export type EventComponent = JSXElementConstructor<EventComponentProps>;
