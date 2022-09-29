import './Schedulely.scss';

import {
  ActionProvider,
  CalendarProvider,
  ComponentProvider,
} from '@/providers/index';
import { DayOfWeekLayout, HeaderLayout, MonthLayout } from '@/layouts/index';
import { SchedulelyProps } from '@/types/index';
import { createDefaultAdapter } from './dateAdapters';
import { useRef } from 'react';
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
  actions,
  dark,
  initialDate = new Date().toISOString(),
}: SchedulelyProps) => {
  if (!dateAdapter) throw new Error('Date Adapter must be supplied!');
  const calendarBodyRef = useRef<HTMLDivElement>(null);

  return (
    <div
      id="schedulely"
      className={[...additionalClassNames, 'schedulely'].join(' ')}
      data-theme={theme}
      data-dark={dark ? '' : undefined}
    >
      <ActionProvider actions={actions}>
        <ComponentProvider calendarComponents={schedulelyComponents}>
          <CalendarProvider
            initialDate={initialDate}
            dateAdapter={dateAdapter}
            calendarEvents={events}
            rootDiv={calendarBodyRef}
          >
            <HeaderLayout />
            <DayOfWeekLayout />
            <div ref={calendarBodyRef}>
              <MonthLayout />
            </div>
          </CalendarProvider>
        </ComponentProvider>
      </ActionProvider>
    </div>
  );
};
