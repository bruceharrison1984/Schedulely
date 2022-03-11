import {
  CalendarEvent,
  CalendoComponents,
  DateTimeAdapter,
} from '@/types/index';
import { CalendarProvider, ComponentProvider } from '@/providers/index';
import { DayOfWeekLayout, HeaderLayout, MonthLayout } from '@/layouts/index';
import { Theme, defaultTheme, makeCssTheme } from '@/theme/index';
import { createDefaultAdapter } from './dateAdapters';
import { useMemo } from 'react';
import React from 'react';

export interface CalendoProps {
  dateAdapter?: DateTimeAdapter;
  calendoComponents?: Partial<CalendoComponents>;
  events: CalendarEvent[];
  theme?: Partial<Theme>;
  className?: string;
}

export const Calendo = ({
  dateAdapter = createDefaultAdapter(),
  calendoComponents,
  events,
  theme,
  className = 'calendo',
}: CalendoProps) => {
  if (!dateAdapter) throw new Error('Date Adapter must be supplied!');

  const cssTheme = useMemo(
    () => makeCssTheme(theme || defaultTheme, 'calendo'),
    [theme]
  );

  return (
    <React.StrictMode>
      <div className={className} style={cssTheme}>
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
