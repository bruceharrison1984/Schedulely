import { BreakpointProvider } from '@/providers';
import { DayOfWeekLayout } from '@/layouts';
import { RenderResult, render } from '@testing-library/react';
import { getCalendarProviderProps } from '../testHelpers/component.testHelper';
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

const hook = getCalendarProviderProps({ daysOfWeek: daysOfWeek });

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
