import './DefaultDay.scss';
import { DayComponent } from '@/types/index';

export const DefaultDay: DayComponent = ({ isCurrentMonth, children }) => (
  <div
    className={`nm--default-day ${
      isCurrentMonth ? 'nm--default-day-current' : 'nm--default-day-sibling'
    }`}
  >
    {children}
  </div>
);
