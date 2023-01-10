import { ActionContextState } from '@/types';
import { PropsWithChildren, createContext, useCallback } from 'react';

export const ActionContext = createContext<ActionContextState | null>(null);
ActionContext.displayName = 'ActionContext';

interface ActionProviderProps {
  actions?: Partial<ActionContextState>;
}

/**
 * Provides fuctions/actions to components. By default, onClick events send objects to the console.
 * @param {ReactNode} children Child nodes
 * @param onEventClick function that will run when an event is clicked on
 * @param onMoreEventClick function that will run when the 'more events' indicator is clicked on
 * @returns ActionProvider component
 */
export const ActionProvider = ({
  children,
  actions,
}: PropsWithChildren<ActionProviderProps>) => {
  const onEventClick = useCallback(actions?.onEventClick || (() => null), [
    actions?.onEventClick,
  ]);

  const onMoreEventsClick = useCallback(
    actions?.onMoreEventsClick || (() => null),
    [actions?.onMoreEventsClick]
  );

  const onDayClick = useCallback(
    actions?.onDayClick || (() => null),
    [actions?.onDayClick]
  );

  const onMonthChangeClick = useCallback(
    actions?.onMonthChangeClick || (() => null),
    [actions?.onMonthChangeClick]
  );

  const context: ActionContextState = {
    onEventClick,
    onMoreEventsClick: onMoreEventsClick,
    onMonthChangeClick,
    onDayClick
  };

  return (
    <ActionContext.Provider value={context}>{children}</ActionContext.Provider>
  );
};
