import { DayComponent } from '@/types';

export const DefaultDay: DayComponent = ({
  isCurrentMonth,
  isToday,
  dateNumber,
  events,
  isOverflowed,
  onClick,
}) => {
  const dayHeader = isToday ? (
    <div className="default-day-header--indicator">
      <span className="default-day-header--text">{dateNumber}</span>
    </div>
  ) : (
    <span className="default-day-header--text">{dateNumber}</span>
  );

  const hiddenEventTooltip =
    events.length > 1 ? `(${events.length}) hidden events` : '(1) hidden event';

  return (
    <div
      role={'cell'}
      className={`default-day ${
        isCurrentMonth ? 'default-day-current' : 'default-day-sibling'
      }`}
    >
      <div role={'heading'} className="default-day-header">
        {dayHeader}
      </div>
      {isOverflowed && (
        <div
          role={'note'}
          className="additional-events-indicator"
          title={hiddenEventTooltip}
          onClick={() => onClick(events)}
        >
          ...
        </div>
      )}
    </div>
  );
};
