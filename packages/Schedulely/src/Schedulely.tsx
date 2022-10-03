import './Schedulely.scss';

import {
  ActionProvider,
  CalendarProvider,
  ComponentProvider,
} from '@/providers/index';
import { DayOfWeekLayout, HeaderLayout, MonthLayout } from '@/layouts/index';
import { DisplaySize, SchedulelyProps } from '@/types/index';
import { createDefaultAdapter } from './dateAdapters';
import { useState, useCallback, useEffect } from 'react';

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

  const [prefersDarkMode, setPrefersDarkMode] = useState<boolean | undefined>();
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  const createQueryListener = useCallback(
    (mediaQuery: string) => {
      const media = window.matchMedia(mediaQuery);
      const listener = () =>
        setPrefersDarkMode(media.matches ? true : undefined);
      window.addEventListener('change', listener);
      return listener;
    },
    [setPrefersDarkMode]
  );

  useEffect(() => {
    var colorWatcher = createQueryListener('(prefers-color-scheme: dark)');

    () => {
      window.removeEventListener('change', colorWatcher);
    };
  }, []);

  return (
    <div
      id="schedulely"
      className={[...additionalClassNames, 'schedulely'].join(' ')}
      data-theme={theme}
      data-dark={prefersDarkMode}
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
