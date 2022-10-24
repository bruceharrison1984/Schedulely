import { BreakpointProvider, CalendarProvider } from '@/providers';
import { CalendarState, ComponentSize } from '@/types';
import { DayOfWeekLayout } from '@/layouts';
import { createDefaultAdapter } from '@/dateAdapters';
import { render, within } from '@testing-library/react';
import { useCalendar } from '../../src/hooks/useCalendar';
import React from 'react';

jest.mock('../../src/hooks/useCalendar');
const mockUseCalendar = useCalendar as jest.MockedFunction<typeof useCalendar>;

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tueday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const hook: CalendarState = {
  currentMonth: new Date(),
  dateAdapter: createDefaultAdapter(),
  getDaysOfWeek: (componentSize: ComponentSize) => daysOfWeek,
  onNextMonth: () => null,
  onPrevMonth: () => null,
  onNextYear: () => null,
  onPrevYear: () => null,
  calendarWithEvents: [],
};

xdescribe('DayOfWeekLayout', () => {
  mockUseCalendar.mockReturnValue(hook);

  const testObject = render(
    <BreakpointProvider containerRef={React.createRef()}>
      <DayOfWeekLayout></DayOfWeekLayout>
    </BreakpointProvider>
  );

  test.each(daysOfWeek)('%s is rendered', (value) => {
    expect(testObject.findByText(value)).toBeInTheDocument();
  });
});
