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

export interface NextMonthComponents {
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
 * @param customComponents Partial<NextMonthComponents>
 * @returns NextMonthComponents object
 */
export const combineComponentDeclarations = (
  customComponents?: Partial<NextMonthComponents>
) => {
  if (!customComponents) return defaultComponents;
  return { ...defaultComponents, ...customComponents };
};

const defaultComponents: NextMonthComponents = {
  dayOfWeekComponent: DefaultDayOfWeek,
  dayComponent: DefaultDay,
  forwardNavigationButtonComponent: DefaultForwardButton,
  backwardNavigationButtonComponent: DefaultBackButton,
  headerBannerComponent: DefaultHeaderBanner,
  dayHeaderComponent: DefaultDayHeader,
  eventComponent: DefaultEvent,
};
