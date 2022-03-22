import { DayComponent } from '@/types/index';

export const DefaultDay: DayComponent = ({ isCurrentMonth, children }) => (
  <div
    className={`schedulely--default-day ${
      isCurrentMonth
        ? 'schedulely--default-day-current'
        : 'schedulely--default-day-sibling'
    }`}
  >
    {children}
  </div>
);
