import { MoreEventsIndicatorComponent } from '@/types/components/MoreEventsIndicator';

export const DefaultMoreEventsIndicator: MoreEventsIndicatorComponent = ({
  events,
  onClick,
}) => {
  return (
    <div className="schedulely--additional-events">
      <div
        className="schedulely--additional-events-indicator"
        title={`(${events.length}) total events`}
        onClick={() => onClick(events)}
      >
        ...
      </div>
    </div>
  );
};
