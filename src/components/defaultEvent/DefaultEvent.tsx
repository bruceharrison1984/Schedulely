import './DefaultEvent.scss';
import { EventComponent } from '@/types/index';

/**
 * This component is the UI representation of events on the calendar
 * @returns DefaultEvent Component
 */
export const DefaultEvent: EventComponent = ({ event, isHovered }) => (
  <div
    className="nm--event"
    style={{
      backgroundColor: event.color,
      opacity: isHovered ? '100%' : '80%',
    }}
    title={event.summary}
    onClick={() => console.log(event)}
  >
    {event.summary}
  </div>
);
