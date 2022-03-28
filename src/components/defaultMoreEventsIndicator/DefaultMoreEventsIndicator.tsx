import { MoreEventsIndicatorComponent } from '@/types/components/MoreEventsIndicator';

export const DefaultMoreEventsIndicator: MoreEventsIndicatorComponent = ({
  events,
}) => {
  return (
    <div className="schedulely--additional-events">
      <div
        className="schedulely--additional-events-indicator"
        title={`(${events.length}) total events`}
        onClick={() => console.log(events)}
      >
        ...
      </div>
    </div>
  );
};
