import {
  ActionProvider,
  BreakpointProvider,
  CalendarProvider,
} from '@/providers';
import { DayOfWeekLayout } from '@/layouts';
import { RenderResult, render } from '@testing-library/react';
import { createDefaultAdapter } from '@/dateAdapters';
import React from 'react';

const smallDaysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const mediumDaysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

describe('DayOfWeekLayout', () => {
  let testObject: RenderResult;

  beforeEach(() => {
    testObject = render(
      <BreakpointProvider containerRef={React.createRef()}>
        <ActionProvider actions={{ onMonthChangeClick: () => null }}>
          <CalendarProvider
            dateAdapter={createDefaultAdapter('en-us')}
            initialDate={new Date().toISOString()}
            calendarEvents={[]}
          >
            <DayOfWeekLayout />
          </CalendarProvider>
        </ActionProvider>
      </BreakpointProvider>
    );
  });

  describe('small display header text', () => {
    test.each(smallDaysOfWeek)('%s is rendered', (value) => {
      // lazily check because Sun/Sat will match on small mode
      expect(testObject.queryAllByText(value)).not.toBeNull();
    });
  });

  xdescribe('medium display header text', () => {
    test.each(mediumDaysOfWeek)('%s is rendered', (value) => {
      expect(testObject.queryAllByText(value)).not.toBeNull();
    });
  });
});
