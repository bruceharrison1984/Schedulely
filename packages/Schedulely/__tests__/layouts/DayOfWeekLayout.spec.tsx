import { BreakpointProvider } from '@/providers';
import { CalendarContextState, ComponentSize } from '@/types';
import { DayOfWeekLayout } from '@/layouts';
import { RenderResult, render } from '@testing-library/react';
import { createDefaultAdapter } from '@/dateAdapters';
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

const hook: CalendarContextState = {
  currentDate: new Date(),
  currentMonth: '',
  currentYear: 1,
  isCurrentMonth: false,
  dateAdapter: createDefaultAdapter(),
  daysOfWeek: daysOfWeek,
  onNextMonth: () => null,
  onPrevMonth: () => null,
  onNextYear: () => null,
  onPrevYear: () => null,
  calendarWithEvents: [],
};

describe('DayOfWeekLayout', () => {
  mockUseCalendar.mockReturnValue(hook);
  let testObject: RenderResult;

  beforeEach(() => {
    testObject = render(
      <BreakpointProvider containerRef={React.createRef()}>
        <DayOfWeekLayout />
      </BreakpointProvider>
    );
  });

  test.each(daysOfWeek)('%s is rendered', (value) => {
    expect(testObject.queryByText(value)).not.toBeNull();
  });
});
