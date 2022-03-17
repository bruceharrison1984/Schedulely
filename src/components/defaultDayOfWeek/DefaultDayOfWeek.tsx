import './DefaultDayOfWeek.scss';
import { DayOfWeekComponent } from '@/types/index';

/**
 * This component is the header that appears at the top of each day of the week
 * @param param0 Name of the day of the week
 * @returns DayOfWeek component
 */
export const DefaultDayOfWeek: DayOfWeekComponent = ({ dayName }) => (
  <div className="calendo--default-day-of-week">{dayName}</div>
);
