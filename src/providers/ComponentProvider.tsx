import {
  DefaultBackButton,
  DefaultDay,
  DefaultDayHeader,
  DefaultDayOfWeek,
  DefaultEvent,
  DefaultForwardButton,
  DefaultHeaderBanner,
  DefaultMoreEventsIndicator,
} from '../components';
import { ReactNode, createContext, useMemo } from 'react';
import { SchedulelyComponents } from '@/types/index';
import React from 'react';

export const ComponentContext = createContext<SchedulelyComponents | null>(
  null
);
ComponentContext.displayName = 'ComponentContext';

interface ComponentProviderProps {
  calendarComponents?: Partial<SchedulelyComponents>;
  children: ReactNode;
}

/**
 * Provides the layout components with the visible calendar components
 * @param param0 Partial<SchedulelyComponents> that will over-ride the default components
 * @returns ComponentProvider component
 */
export const ComponentProvider = ({
  calendarComponents,
  children,
}: ComponentProviderProps) => {
  const components = useMemo(() => {
    if (!calendarComponents) return defaultComponents;
    return { ...defaultComponents, ...calendarComponents };
  }, [calendarComponents]);

  const contextValue: SchedulelyComponents = {
    dayOfWeekComponent: React.memo(components.dayOfWeekComponent),
    dayComponent: React.memo(components.dayComponent),
    forwardNavigationButtonComponent: React.memo(
      components.forwardNavigationButtonComponent
    ),
    backwardNavigationButtonComponent: React.memo(
      components.backwardNavigationButtonComponent
    ),
    headerBannerComponent: React.memo(components.headerBannerComponent),
    dayHeaderComponent: React.memo(components.dayHeaderComponent),
    eventComponent: React.memo(components.eventComponent),
    moreEventsIndicatorComponent: React.memo(
      components.moreEventsIndicatorComponent
    ),
  };

  return (
    <ComponentContext.Provider value={contextValue}>
      {children}
    </ComponentContext.Provider>
  );
};

const defaultComponents: SchedulelyComponents = {
  dayOfWeekComponent: DefaultDayOfWeek,
  dayComponent: DefaultDay,
  forwardNavigationButtonComponent: DefaultForwardButton,
  backwardNavigationButtonComponent: DefaultBackButton,
  headerBannerComponent: DefaultHeaderBanner,
  dayHeaderComponent: DefaultDayHeader,
  eventComponent: DefaultEvent,
  moreEventsIndicatorComponent: DefaultMoreEventsIndicator,
};
