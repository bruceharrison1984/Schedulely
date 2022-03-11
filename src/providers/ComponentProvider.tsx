import { CalendoComponents, combineComponentDeclarations } from '@/types/index';
import { ReactNode, createContext, useMemo } from 'react';

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
  const components = useMemo(
    () => combineComponentDeclarations(calendarComponents),
    [calendarComponents]
  );

  const contextValue: CalendoComponents = {
    ...components,
  };

  return (
    <ComponentContext.Provider value={contextValue}>
      {children}
    </ComponentContext.Provider>
  );
};
