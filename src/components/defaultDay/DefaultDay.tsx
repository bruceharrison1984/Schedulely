import './DefaultDay.scss';
import { DayComponent } from '@/types/index';

export const DefaultDay: DayComponent = ({ isCurrentMonth, children }) => (
  <div
    className={`calendo--default-day ${
      isCurrentMonth
        ? 'calendo--default-day-current'
        : 'calendo--default-day-sibling'
    }`}
  >
    {children}
  </div>
);
