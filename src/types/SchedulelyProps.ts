import { ActionState } from './ActionState';
import { CalendarEvent } from './InternalCalendarEvent';
import { DateTimeAdapter } from './DateAdapter';
import { SchedulelyComponents } from './SchedulelyComponents';

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

  /** Schedulely actions */
  actions?: Partial<ActionState>;

  /** Initial Date that Schedulely should be opened to */
  initialDate?: string;
}
