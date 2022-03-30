import { DayHeaderComponent } from '@/types/index';

export const DefaultDayHeader: DayHeaderComponent = ({
  dateNumber,
  isToday,
}) => (
  <div className="schedulely--default-day-header">
    {isToday ? (
      <div className="schedulely--default-day-header--indicator">
        <span className="schedulely--default-day-header--text">
          {dateNumber}
        </span>
      </div>
    ) : (
      <span className="schedulely--default-day-header--text">{dateNumber}</span>
    )}
  </div>
);
