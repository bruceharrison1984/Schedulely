export interface HighlightEventContextState {
  /** Set the ID of the currently highlighted event */
  setHighlight: (eventId: string) => void;

  /** Clear the currently value for highlightedEvent */
  clearHighlight: () => void;

  /** Check if the eventId equals the currently highlighted event */
  isHighlighted: (eventId: string) => boolean;
}
