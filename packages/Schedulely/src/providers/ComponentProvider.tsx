import { DefaultDay, DefaultEvent, DefaultHeader } from '../components';
import { PropsWithChildren, createContext } from 'react';
import { SchedulelyComponents } from '@/types/index';
import React from 'react';

export const ComponentContext = createContext<SchedulelyComponents | null>(
  null
);
ComponentContext.displayName = 'ComponentContext';

interface ComponentProviderProps {
  calendarComponents?: Partial<SchedulelyComponents>;
}

/**
 * Provides the layout components with the visible calendar components
 * @param param0 Partial<SchedulelyComponents> that will over-ride the default components
 * @returns ComponentProvider component
 */
export const ComponentProvider = ({
  calendarComponents,
  children,
}: PropsWithChildren<ComponentProviderProps>) => {
  const components = calendarComponents
    ? { ...defaultComponents, ...calendarComponents }
    : defaultComponents;

  const contextValue: SchedulelyComponents = {
    dayComponent: React.memo(components.dayComponent),
    headerComponent: React.memo(components.headerComponent),
    eventComponent: React.memo(components.eventComponent),
  };

  return (
    <ComponentContext.Provider value={contextValue}>
      {children}
    </ComponentContext.Provider>
  );
};

const defaultComponents: SchedulelyComponents = {
  dayComponent: DefaultDay,
  headerComponent: DefaultHeader,
  eventComponent: DefaultEvent,
};
