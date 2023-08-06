import {
  ActionContextState,
  CalendarEvent,
  DateTimeAdapter,
  SchedulelyComponents,
} from '@/types';
import { EventPriority } from './EventPriority';

export interface KeyboardEvents {
  /** Typically used to navigate to the previous month */
  onLeftArrow?: () => void;
  /** Typically used to navigate to the next month */
  onRightArrow?: () => void;
  /** Typically used to navigate to the next year */
  onUpArrow?: () => void;
  /** Typically used to navigate to the previous year */
  onDownArrow?: () => void;
}

export interface CalendarOptions {
  /** Provides a way to customise the keyboard actions within the calendar */
  keyboardEvents?: KeyboardEvents;
}

/** Properties used to initialize Schedulely */
export interface SchedulelyProps {
  /** DateAdapter used to process dates */
  dateAdapter?: DateTimeAdapter;

  /** Component overrides */
  schedulelyComponents?: Partial<SchedulelyComponents>;

  /** List of events to display */
  events: CalendarEvent[];

  /** Additional class names to apply to the root div */
  additionalClassNames?: string[];

  /** Name of theme to display */
  theme?: string;

  /** Toggle dark theme (if available) */
  dark?: boolean;

  /** Schedulely actions */
  actions?: Partial<ActionContextState>;

  /** Initial Date that Schedulely should be opened to */
  initialDate?: string;

  /** Which length of event should take priority.
   * If set to short, long events will be pushed off the calendar before short ones.
   * If set to long, short events will be pushed off the calendar before long ones.
   *
   * _Long is the default_ */
  eventPriority?: EventPriority;

  /** Options to customize the calendar */
  calendarOptions?: CalendarOptions;
}
