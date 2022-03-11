import {
  DayComponent,
  DayHeaderComponent,
  DayOfWeekComponent,
  EventComponent,
  HeaderBannerComponent,
  NavigationButtonComponent,
} from '@/types/index';
import {
  DefaultBackButton,
  DefaultDay,
  DefaultDayHeader,
  DefaultDayOfWeek,
  DefaultEvent,
  DefaultHeaderBanner,
} from '@/components/index';
import { DefaultForwardButton } from '@/components/defaultForwardButton';

export interface CalendoComponents {
  dayOfWeekComponent: DayOfWeekComponent;
  dayComponent: DayComponent;
  forwardNavigationButtonComponent: NavigationButtonComponent;
  backwardNavigationButtonComponent: NavigationButtonComponent;
  headerBannerComponent: HeaderBannerComponent;
  dayHeaderComponent: DayHeaderComponent;
  eventComponent: EventComponent;
}

/**
 * Replace default components with custom ones
 * @param customComponents Partial<CalendoComponents>
 * @returns CalendoComponents object
 */
export const combineComponentDeclarations = (
  customComponents?: Partial<CalendoComponents>
) => {
  if (!customComponents) return defaultComponents;
  return { ...defaultComponents, ...customComponents };
};

const defaultComponents: CalendoComponents = {
  dayOfWeekComponent: DefaultDayOfWeek,
  dayComponent: DefaultDay,
  forwardNavigationButtonComponent: DefaultForwardButton,
  backwardNavigationButtonComponent: DefaultBackButton,
  headerBannerComponent: DefaultHeaderBanner,
  dayHeaderComponent: DefaultDayHeader,
  eventComponent: DefaultEvent,
};
