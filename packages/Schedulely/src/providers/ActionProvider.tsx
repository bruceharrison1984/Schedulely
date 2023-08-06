import { ActionContextState, KeyboardEvents } from '@/types';
import { PropsWithChildren, createContext } from 'react';

export const ActionContext = createContext<ActionContextState | null>(null);
ActionContext.displayName = 'ActionContext';

interface ActionProviderProps {
  actions?: Partial<ActionContextState>;
  keyboardEvents?: KeyboardEvents;
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
  keyboardEvents,
}: PropsWithChildren<ActionProviderProps>) => {
  const defaultAction = () => null;

  const onEventClick = actions?.onEventClick || defaultAction;
  const onMoreEventsClick = actions?.onMoreEventsClick || defaultAction;
  const onDayClick = actions?.onDayClick || defaultAction;
  const onMonthChangeClick = actions?.onMonthChangeClick || defaultAction;

  const context: ActionContextState = {
    onEventClick,
    onMoreEventsClick,
    onMonthChangeClick,
    onDayClick,
    keyboardEvents,
  };

  return (
    <ActionContext.Provider value={context}>{children}</ActionContext.Provider>
  );
};
