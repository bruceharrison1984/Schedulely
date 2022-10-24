import { BreakpointProvider, CalendarProvider } from '@/providers';
import { CalendarState, ComponentSize } from '@/types';
import { DayOfWeekLayout } from '@/layouts';
import { createDefaultAdapter } from '@/dateAdapters';
import { render } from '@testing-library/react';
import { useCalendar } from '../../src/hooks/useCalendar';
import React from 'react';

jest.mock('../../src/hooks/useCalendar');
const mockUseCalendar = useCalendar as jest.MockedFunction<typeof useCalendar>;

const hook: CalendarState = {
  currentMonth: new Date(),
  dateAdapter: createDefaultAdapter(),
  getDaysOfWeek: (componentSize: ComponentSize) => [
    'Sunday',
    'Monday',
    'Tueday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  onNextMonth: () => null,
  onPrevMonth: () => null,
  onNextYear: () => null,
  onPrevYear: () => null,
  calendarWithEvents: [],
};

xdescribe('DayOfWeekLayout', () => {
  mockUseCalendar.mockReturnValue(hook);

  const testFixture = render(
    <BreakpointProvider containerRef={React.createRef()}>
      <DayOfWeekLayout></DayOfWeekLayout>
    </BreakpointProvider>
  );

  var testObject = testFixture.baseElement.querySelector('.day-of-week-layout');
  var individualDays = testFixture.baseElement.querySelector(
    '.default-day-of-week'
  );

  it('renders the correct number of days', () => {
    expect(testObject?.children.length).toEqual(hook.getDaysOfWeek('large'));
  });

  it('renders the correct names of the days', () => {
    expect(testObject?.children.length).toEqual(hook.getDaysOfWeek('large'));
  });
});
