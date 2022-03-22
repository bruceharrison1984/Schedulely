import { MoreEventsIndicatorComponent } from '@/types/components/MoreEventsIndicator';

export const DefaultMoreEventsIndicator: MoreEventsIndicatorComponent = ({
  events,
}) => {
  return (
    <div
      className="calendo--additional-events"
      title={`(${events.length}) total events`}
      onClick={() => console.log(events)}
    >
      <div className="calendo--additional-events-indicator">. . .</div>
    </div>
  );
};
