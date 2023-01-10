import { DayComponent } from '@/types';

export const DefaultDay: DayComponent = ({
  isCurrentMonth,
  isToday,
  events,
  isOverflowed,
  onMoreEventsClick,
  onDayClick,
  date,
}) => {
  const dayHeader = isToday ? (
    <div className="default-day-header--indicator">
      <span className="default-day-header--text">{date.getDate()}</span>
    </div>
  ) : (
    <span className="default-day-header--text">{date.getDate()}</span>
  );

  const hiddenEventTooltip =
    events.length > 1 ? `(${events.length}) hidden events` : '(1) hidden event';

  return (
    <div
      role={'cell'}
      className={`default-day ${
        isCurrentMonth ? 'default-day-current' : 'default-day-sibling'
      }`}
      onClick={() => onDayClick(date)}
    >
      <div role={'heading'} className="default-day-header">
        {dayHeader}
      </div>
      {isOverflowed && (
        <div
          role={'note'}
          className="additional-events-indicator"
          title={hiddenEventTooltip}
          onClick={() => onMoreEventsClick(events)}
        >
          ...
        </div>
      )}
    </div>
  );
};
