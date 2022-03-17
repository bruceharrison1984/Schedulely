import { EventComponent } from '@/types/index';

/**
 * This component is the UI representation of events on the calendar
 * @returns DefaultEvent Component
 */
export const DefaultEvent: EventComponent = ({ event, isHovered }) => (
  <div
    className={`calendo--event ${
      isHovered ? 'calendo--event-selected' : 'calendo--event-unselected'
    }`}
    style={{
      backgroundColor: event.color,
    }}
    title={event.summary}
    onClick={() => console.log(event)}
  >
    {event.summary}
  </div>
);
