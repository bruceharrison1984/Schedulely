import { ReactNode, createContext, useState } from 'react';

export const HighlightContext = createContext<HighlightEventContext | null>(
  null
);
HighlightContext.displayName = 'HighlightContext';

/**
 * Enables highlighting of events that span multiple weeks. Kinda hacky but it works.
 * @param param0 Child nodes
 * @returns HighlightProvider component
 */
export const HighlightProvider = ({ children }: { children: ReactNode }) => {
  const [highlightedEvent, setHighlightedEvent] = useState<string | undefined>(
    undefined
  );

  const setHighlight = (eventId: string) => setHighlightedEvent(eventId);
  const clearHighlight = () => setHighlightedEvent(undefined);
  const isHighlighted = (eventId: string) => highlightedEvent === eventId;

  const context: HighlightEventContext = {
    setHighlight,
    clearHighlight,
    isHighlighted,
  };

  return (
    <HighlightContext.Provider value={context}>
      {children}
    </HighlightContext.Provider>
  );
};

export interface HighlightEventContext {
  /** Set the ID of the currently highlighted event */
  setHighlight: (eventId: string) => void;

  /** Clear the currently value for highlightedEvent */
  clearHighlight: () => void;

  /** Check if the eventId equals the currently highlighted event */
  isHighlighted: (eventId: string) => boolean;
}
