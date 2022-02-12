import './DefaultDayHeader.scss';
import { DayHeaderComponent } from '@/types/index';

export const DefaultDayHeader: DayHeaderComponent = ({
  dateNumber,
  isToday,
}) => (
  <div className="nm--default-day-header">
    {isToday ? (
      <div className="nm--default-day-header--indicator">
        <span className="nm--default-day-header--text">{dateNumber}</span>
      </div>
    ) : (
      <span className="nm--default-day-header--text">{dateNumber}</span>
    )}
  </div>
);
