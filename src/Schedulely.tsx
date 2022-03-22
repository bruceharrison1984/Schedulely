import { CalendarProvider, ComponentProvider } from '@/providers/index';
import { DayOfWeekLayout, HeaderLayout, MonthLayout } from '@/layouts/index';
import { SchedulelyProps } from '@/types/index';
import { createDefaultAdapter } from './dateAdapters';
import React from 'react';

/**
 * Create an instance of Schedulely
 * @param {SchedulelyProps} param0 Schedulely configuration properties
 * @returns
 */
export const Schedulely = ({
  dateAdapter = createDefaultAdapter(),
  schedulelyComponents,
  events,
  theme,
  additionalClassNames = [],
}: SchedulelyProps) => {
  if (!dateAdapter) throw new Error('Date Adapter must be supplied!');
  additionalClassNames?.push('schedulely');
  return (
    <React.StrictMode>
      <div
        id="schedulely"
        className={additionalClassNames?.join(' ')}
        data-theme={theme}
      >
        <ComponentProvider calendarComponents={schedulelyComponents}>
          <CalendarProvider dateAdapter={dateAdapter} calendarEvents={events}>
            <HeaderLayout />
            <DayOfWeekLayout />
            <MonthLayout />
          </CalendarProvider>
        </ComponentProvider>
      </div>
    </React.StrictMode>
  );
};
