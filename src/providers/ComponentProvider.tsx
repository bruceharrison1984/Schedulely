import { CalendoComponents } from '@/types/index';
import {
  DefaultBackButton,
  DefaultDay,
  DefaultDayHeader,
  DefaultDayOfWeek,
  DefaultEvent,
  DefaultForwardButton,
  DefaultHeaderBanner,
} from '../components';
import { ReactNode, createContext, useMemo } from 'react';
import React from 'react';

export const ComponentContext = createContext<CalendoComponents | null>(null);
ComponentContext.displayName = 'ComponentContext';

interface ComponentProviderProps {
  calendarComponents?: Partial<CalendoComponents>;
  children: ReactNode;
}

/**
 * Provides the layout components with the visible calendar components
 * @param param0 Partial<CalendoComponents> that will over-ride the default components
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

  const contextValue: CalendoComponents = {
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
  };

  return (
    <ComponentContext.Provider value={contextValue}>
      {children}
    </ComponentContext.Provider>
  );
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
