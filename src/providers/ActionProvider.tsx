import { ActionState } from '@/types/ActionState';
import { InternalCalendarEvent } from '@/types/InternalCalendarEvent';
import { ReactNode, createContext, useCallback } from 'react';

export const ActionContext = createContext<ActionState | null>(null);
ActionContext.displayName = 'ActionContext';

interface ActionProviderProps {
  actions?: Partial<ActionState>;
  children: ReactNode;
}

/**
 * Provides fuctions/actions to components. By default, onClick events send objects to the console.
 * @param {ReactNode} children Child nodes
 * @param onEventClick function that will run when an event is clicked on
 * @param onMoreEventClick function that will run when the 'more events' indicator is clicked on
 * @returns ActionProvider component
 */
export const ActionProvider = ({ children, actions }: ActionProviderProps) => {
  const onEventClick = actions?.onEventClick
    ? actions?.onEventClick
    : (event: InternalCalendarEvent) => console.log(event);

  const onMoreEventClick = actions?.onMoreEventClick
    ? actions?.onMoreEventClick
    : (events: InternalCalendarEvent[]) => console.log(events);

  const memoizedOnEventClick = useCallback(onEventClick, [onEventClick]);

  const memoizedOnMoreEventClick = useCallback(onMoreEventClick, [
    onMoreEventClick,
  ]);

  const context: ActionState = {
    onEventClick: memoizedOnEventClick,
    onMoreEventClick: memoizedOnMoreEventClick,
  };

  return (
    <ActionContext.Provider value={context}>{children}</ActionContext.Provider>
  );
};
