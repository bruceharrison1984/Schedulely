import {
  DayComponent,
  DayHeaderComponent,
  DayOfWeekComponent,
  EventComponent,
  HeaderBannerComponent,
  HeaderComponent,
  MoreEventsIndicatorComponent,
  NavigationButtonComponent,
} from '@/types/index';

export interface SchedulelyComponents {
  dayOfWeekComponent: DayOfWeekComponent;
  dayComponent: DayComponent;
  forwardNavigationButtonComponent: NavigationButtonComponent;
  backwardNavigationButtonComponent: NavigationButtonComponent;
  headerBannerComponent: HeaderBannerComponent;
  dayHeaderComponent: DayHeaderComponent;
  headerComponent: HeaderComponent;
  eventComponent: EventComponent;
  moreEventsIndicatorComponent: MoreEventsIndicatorComponent;
}
