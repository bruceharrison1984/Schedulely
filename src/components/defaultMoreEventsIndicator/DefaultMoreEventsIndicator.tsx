import { MoreEventsIndicatorComponent } from '@/types/components/MoreEventsIndicatorComponent';

export const DefaultMoreEventsIndicator: MoreEventsIndicatorComponent = ({
  events,
  onClick,
}) => {
  return (
    <div
      className="schedulely--additional-events-indicator"
      title={`(${events.length}) total events`}
      onClick={() => onClick(events)}
    >
      ...
    </div>
  );
};
