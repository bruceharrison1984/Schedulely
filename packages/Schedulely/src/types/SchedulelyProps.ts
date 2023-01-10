import {
  ActionContextState,
  CalendarEvent,
  ComponentSize,
  DateTimeAdapter,
  SchedulelyComponents,
} from '@/types';

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
}
