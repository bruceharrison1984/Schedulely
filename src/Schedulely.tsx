import './Schedulely.css';

import {
  ActionProvider,
  CalendarProvider,
  ComponentProvider,
} from '@/providers/index';
import { DayOfWeekLayout, HeaderLayout, MonthLayout } from '@/layouts/index';
import { SchedulelyProps } from '@/types/index';
import { createDateFnsAdapter } from './dateAdapters';
import React from 'react';

/**
 * Create an instance of Schedulely
 * @param {SchedulelyProps} param0 Schedulely configuration properties
 * @returns
 */
export const Schedulely = ({
  dateAdapter = createDateFnsAdapter(),
  schedulelyComponents,
  events,
  theme,
  additionalClassNames = [],
  actions,
  initialDate = new Date().toISOString(),
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
        <ActionProvider actions={actions}>
          <ComponentProvider calendarComponents={schedulelyComponents}>
            <CalendarProvider
              initialDate={initialDate}
              dateAdapter={dateAdapter}
              calendarEvents={events}
            >
              <HeaderLayout />
              <DayOfWeekLayout />
              <MonthLayout />
            </CalendarProvider>
          </ComponentProvider>
        </ActionProvider>
      </div>
    </React.StrictMode>
  );
};
