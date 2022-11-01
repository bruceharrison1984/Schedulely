import { CalendarContextState, SchedulelyComponents } from '@/types';
import { DefaultDay, DefaultEvent, DefaultHeader } from '@/components';
import { createDefaultAdapter } from '@/dateAdapters';

export const getCalendarProviderProps = (
  overrides: Partial<CalendarContextState> | null
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

export const getComponentProviderProps = (
  overrides: Partial<SchedulelyComponents>
) => {
  const hook: SchedulelyComponents = {
    dayComponent: DefaultDay,
    headerComponent: DefaultHeader,
    eventComponent: DefaultEvent,
  };
  return { hook, ...overrides };
};
