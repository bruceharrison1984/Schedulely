import { EventComponent } from '@/types/index';

/**
 * This component is the UI representation of events on the calendar
 * @returns DefaultEvent Component
 */
export const DefaultEvent: EventComponent = ({ event, isHovered, onClick }) => {
  const classes = ['event'];
  if (isHovered) classes.push('event-selected');

  return (
    <div
      role={'listitem'}
      data-eventid={event.id}
      className={classes.join(' ')}
      style={{
        backgroundColor: event.color,
      }}
      title={event.summary}
      onClick={() => onClick(event)}
    >
      <div className="event-text-container">{event.summary}</div>
    </div>
  );
};
