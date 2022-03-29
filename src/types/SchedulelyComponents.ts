import {
  DayComponent,
  DayHeaderComponent,
  DayOfWeekComponent,
  EventComponent,
  HeaderComponent,
  MoreEventsIndicatorComponent,
} from './components';

export interface SchedulelyComponents {
  dayOfWeekComponent: DayOfWeekComponent;
  dayComponent: DayComponent;
  dayHeaderComponent: DayHeaderComponent;
  headerComponent: HeaderComponent;
  eventComponent: EventComponent;
  moreEventsIndicatorComponent: MoreEventsIndicatorComponent;
}
