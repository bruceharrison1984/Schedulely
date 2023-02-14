import { DayComponent, EventComponent, HeaderComponent } from '@/types';

export interface SchedulelyComponents {
  dayComponent: DayComponent<any>;
  headerComponent: HeaderComponent;
  eventComponent: EventComponent<any>;
}
