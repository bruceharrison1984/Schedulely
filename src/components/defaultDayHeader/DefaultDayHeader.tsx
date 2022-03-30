import { DayHeaderComponent } from '@/types/index';

export const DefaultDayHeader: DayHeaderComponent = ({
  dateNumber,
  isToday,
}) => (
  <div className="schedulely--default-day-header">
    <div className="schedulely--default-day-header--text">{dateNumber}</div>
    {isToday && <div className="schedulely--default-day-header--indicator" />}
  </div>
);
