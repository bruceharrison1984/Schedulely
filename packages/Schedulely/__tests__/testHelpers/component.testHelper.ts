import { CalendarContextState } from '@/types';
import { createDefaultAdapter } from '@/dateAdapters';

export const getCalendarProviderProps = (
  overrides: Partial<CalendarContextState>
) => {
  const hook: CalendarContextState = {
    currentDate: new Date(),
    currentMonth: '',
    currentYear: 1,
    isCurrentMonth: false,
    dateAdapter: createDefaultAdapter(),
    daysOfWeek: [],
    onNextMonth: () => null,
    onPrevMonth: () => null,
    onNextYear: () => null,
    onPrevYear: () => null,
    calendarWithEvents: [],
  };
  return { hook, ...overrides } as CalendarContextState;
};
