import { DayHeaderComponent } from '@/types/index';

export const DefaultDayHeader: DayHeaderComponent = ({
  dateNumber,
  isToday,
}) => (
  <div className="default-day-header">
    {isToday ? (
      <div className="default-day-header--indicator">
        <span className="default-day-header--text">{dateNumber}</span>
      </div>
    ) : (
      <span className="default-day-header--text">{dateNumber}</span>
    )}
  </div>
);
