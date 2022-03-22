import { EventComponent } from '@/types/index';

/**
 * This component is the UI representation of events on the calendar
 * @returns DefaultEvent Component
 */
export const DefaultEvent: EventComponent = ({ event, isHovered }) => (
  <div
    className={`schedulely--event ${
      isHovered ? 'schedulely--event-selected' : 'schedulely--event-unselected'
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
