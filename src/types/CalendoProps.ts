import { CalendarEvent } from './InternalCalendarEvent';
import { CalendoComponents } from './components';
import { DateTimeAdapter } from './DateAdapter';

/** Properties used to initialize Calendo */
export interface CalendoProps {
  /** DateAdapter used to process dates */
  dateAdapter?: DateTimeAdapter;

  /** Component overrides */
  calendoComponents?: Partial<CalendoComponents>;

  /** List of events to display */
  events: CalendarEvent[];

  /** Additional class names to apply to the root div */
  additionalClassNames?: string[];

  /** Name of theme to display */
  theme?: string;
}
