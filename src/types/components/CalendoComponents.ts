import {
  DayComponent,
  DayHeaderComponent,
  DayOfWeekComponent,
  EventComponent,
  HeaderBannerComponent,
  NavigationButtonComponent,
} from '@/types/index';

export interface CalendoComponents {
  dayOfWeekComponent: DayOfWeekComponent;
  dayComponent: DayComponent;
  forwardNavigationButtonComponent: NavigationButtonComponent;
  backwardNavigationButtonComponent: NavigationButtonComponent;
  headerBannerComponent: HeaderBannerComponent;
  dayHeaderComponent: DayHeaderComponent;
  eventComponent: EventComponent;
}
