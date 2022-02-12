import './DefaultEvent.scss';
import { EventComponent } from '@/types/index';

/**
 * This component is the UI representation of events on the calendar
 * @returns DefaultEvent Component
 */
export const DefaultEvent: EventComponent = ({ event }) => (
  <div
    className="nm--event"
    style={{ backgroundColor: event.color }}
    title={event.summary}
    onClick={() => console.log(event)}
  >
    {event.summary}
  </div>
);
