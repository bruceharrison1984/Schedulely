import { DayComponent } from '@/types/index';

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

  return (
    <div
      className={`default-day ${
        isCurrentMonth ? 'default-day-current' : 'default-day-sibling'
      }`}
    >
      <div className="default-day-header">{dayHeader}</div>
      {isOverflowed && (
        <div
          className="additional-events-indicator"
          title={`(${events.length}) total events`}
          onClick={() => onClick(events)}
        >
          ...
        </div>
      )}
    </div>
  );
};
