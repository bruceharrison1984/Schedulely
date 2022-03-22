import { HighlightEventState } from '@/types/HighlightEventState';
import { ReactNode, createContext, useState } from 'react';

export const HighlightContext = createContext<HighlightEventState | null>(null);
HighlightContext.displayName = 'HighlightContext';

/**
 * Enables highlighting of events that span multiple weeks. Kinda hacky but it works.
 * @param {ReactNode} children Child nodes
 * @returns HighlightProvider component
 */
export const HighlightProvider = ({ children }: { children: ReactNode }) => {
  const [highlightedEvent, setHighlightedEvent] = useState<string | undefined>(
    undefined
  );

  const setHighlight = (eventId: string) => setHighlightedEvent(eventId);
  const clearHighlight = () => setHighlightedEvent(undefined);
  const isHighlighted = (eventId: string) => highlightedEvent === eventId;

  const context: HighlightEventState = {
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
