import { HighlightEventContextState } from '@/types';
import { ReactNode, createContext, useCallback, useState } from 'react';

export const HighlightContext =
  createContext<HighlightEventContextState | null>(null);
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

  const isHighlighted = useCallback(
    (eventId: string) => highlightedEvent === eventId,
    [highlightedEvent]
  );

  const context: HighlightEventContextState = {
    setHighlight: (eventId: string) => setHighlightedEvent(eventId),
    clearHighlight: () => setHighlightedEvent(undefined),
    isHighlighted,
  };

  return (
    <HighlightContext.Provider value={context}>
      {children}
    </HighlightContext.Provider>
  );
};
