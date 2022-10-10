import './Schedulely.scss';

import {
  ActionProvider,
  CalendarProvider,
  ComponentProvider,
} from '@/providers/index';
import { DayOfWeekLayout, HeaderLayout, MonthLayout } from '@/layouts/index';
import { SchedulelyProps } from '@/types/index';
import { createDefaultAdapter } from './dateAdapters';
import { useEffect } from 'react';
import useResizeObserver from './hooks/useResizeObserver';

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

  return (
    <div
      id="schedulely"
      className={[...additionalClassNames, 'schedulely'].join(' ')}
      data-theme={theme}
      data-dark={dark === true ? true : undefined}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto auto 1fr',
      }}
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
  );
};
