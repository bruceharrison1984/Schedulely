import {
  CalendarEvent,
  CalendoComponents,
  DateTimeAdapter,
} from '@/types/index';
import { CalendarProvider, ComponentProvider } from '@/providers/index';
import { DayOfWeekLayout, HeaderLayout, MonthLayout } from '@/layouts/index';
import { createDefaultAdapter } from './dateAdapters';
import React from 'react';

export interface CalendoProps {
  dateAdapter?: DateTimeAdapter;
  calendoComponents?: Partial<CalendoComponents>;
  events: CalendarEvent[];
  className?: string;
  theme?: string;
}

export const Calendo = ({
  dateAdapter = createDefaultAdapter(),
  calendoComponents,
  events,
  theme,
  className = 'calendo',
}: CalendoProps) => {
  if (!dateAdapter) throw new Error('Date Adapter must be supplied!');

  return (
    <React.StrictMode>
      <div id="calendo" className={className} data-theme={theme}>
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
