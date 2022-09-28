import { EventComponent } from '@/types/index';

/**
 * This component is the UI representation of events on the calendar
 * @returns DefaultEvent Component
 */
export const DefaultEvent: EventComponent = ({ event, isHovered, onClick }) => (
  <div
    className={`event ${isHovered ? 'event-selected' : 'event-unselected'}`}
    style={{
      backgroundColor: event.color,
    }}
    title={event.summary}
    onClick={() => onClick(event)}
  >
    {event.summary}
  </div>
);
