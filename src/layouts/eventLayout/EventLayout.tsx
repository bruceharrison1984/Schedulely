import './EventLayout.scss';
import { CalendarEvent, useCalendar, useComponents } from 'src';

interface EventLayoutProps {
  events: CalendarEvent[];
  startOfWeek: Date;
  endOfWeek: Date;
}

/**
 * This component controls the layout of an individual events within a week
 * @returns EventLayout Component
 */
export const EventLayout = ({
  events,
  startOfWeek,
  endOfWeek,
}: EventLayoutProps) => {
  const {
    dateConvertor: { getStartIndex, getEndIndex },
  } = useCalendar();
  const { eventComponent: EventComponent } = useComponents();

  return (
    <div className="nm--event-layout">
      {events.map((event) => (
        <div
          data-eventid={event.id}
          key={event.id}
          style={{
            gridColumnStart: getStartIndex(event.start, startOfWeek),
            gridColumnEnd: getEndIndex(event.end, endOfWeek),
            minWidth: 0,
          }}
        >
          <EventComponent event={event} />
        </div>
      ))}
    </div>
  );
};
