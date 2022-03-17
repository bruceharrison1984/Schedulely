import './DefaultDayHeader.scss';
import { DayHeaderComponent } from '@/types/index';

export const DefaultDayHeader: DayHeaderComponent = ({
  dateNumber,
  isToday,
}) => (
  <div className="calendo--default-day-header">
    {isToday ? (
      <div className="calendo--default-day-header--indicator">
        <span className="calendo--default-day-header--text">{dateNumber}</span>
      </div>
    ) : (
      <span className="calendo--default-day-header--text">{dateNumber}</span>
    )}
  </div>
);
