import { ActionState } from '@/types/ActionState';
import { CalendarEvent } from '@/types/InternalCalendarEvent';
import { ReactNode, createContext, useCallback } from 'react';

export const ActionContext = createContext<ActionState | null>(null);
ActionContext.displayName = 'ActionContext';

interface ActionProviderProps {
  onEventClick?: (event: CalendarEvent) => void;
  onMoreEventClick?: (events: CalendarEvent[]) => void;
  children: ReactNode;
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
  onEventClick = (event: CalendarEvent) => console.log(event),
  onMoreEventClick = (events: CalendarEvent[]) => console.log(events),
}: ActionProviderProps) => {
  const memoizedOnEventClick = useCallback(
    (event: CalendarEvent) => onEventClick(event),
    [onEventClick]
  );

  const memoizedOnMoreEventClick = useCallback(
    (events: CalendarEvent[]) => onMoreEventClick(events),
    [onMoreEventClick]
  );

  const context: ActionState = {
    onEventClick: memoizedOnEventClick,
    onMoreEventClick: memoizedOnMoreEventClick,
  };

  return (
    <ActionContext.Provider value={context}>{children}</ActionContext.Provider>
  );
};
