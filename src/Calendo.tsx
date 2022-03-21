import { CalendarProvider, ComponentProvider } from '@/providers/index';
import { CalendoProps } from '@/types/index';
import { DayOfWeekLayout, HeaderLayout, MonthLayout } from '@/layouts/index';
import { createDefaultAdapter } from './dateAdapters';
import React from 'react';

/**
 * Create an instance of Calendo
 * @param {CalendoProps} param0 Calendo configuration properties
 * @returns
 */
export const Calendo = ({
  dateAdapter = createDefaultAdapter(),
  calendoComponents,
  events,
  theme,
  additionalClassNames = [],
}: CalendoProps) => {
  if (!dateAdapter) throw new Error('Date Adapter must be supplied!');
  additionalClassNames?.push('calendo');
  return (
    <React.StrictMode>
      <div
        id="calendo"
        className={additionalClassNames?.join(' ')}
        data-theme={theme}
      >
        <ComponentProvider calendarComponents={calendoComponents}>
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
