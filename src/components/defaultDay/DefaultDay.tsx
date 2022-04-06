import { DayComponent } from '@/types/index';

export const DefaultDay: DayComponent = ({ isCurrentMonth, children }) => (
  <div
    className={`default-day ${
      isCurrentMonth ? 'default-day-current' : 'default-day-sibling'
    }`}
  >
    {children}
  </div>
);
