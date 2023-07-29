import './Schedulely.scss';

import {
  ActionProvider,
  CalendarProvider,
  ComponentProvider,
} from '@/providers/index';
import { BreakpointProvider } from './providers/BreakPointProvider';
import { DayOfWeekLayout, HeaderLayout, MonthLayout } from '@/layouts/index';
import { EventPriority } from './types/EventPriority';
import { SchedulelyProps } from '@/types/index';
import { StrictMode, useEffect, useRef, useState } from 'react';
import { createDefaultAdapter } from './dateAdapters';

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
  eventPriority = EventPriority.long,
  initialDate = new Date().toISOString(),
}: SchedulelyProps) => {
  if (!dateAdapter) throw new Error('Date Adapter must be supplied!');

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const containerRef = useRef(null);

  // hide the calendar until it is fully rendered on the client
  // this prevents various types of UI flashing resulting from waiting for Observers to take measurements
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <StrictMode>
      <div
        id="schedulely"
        className={[...additionalClassNames, 'schedulely'].join(' ')}
        data-theme={theme}
        data-dark={dark === true ? true : undefined}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridTemplateRows: 'auto auto 1fr',
          // by setting the root as visiblity:hidden, we can still measure things but avoid the flashes
          visibility: isVisible ? 'visible' : 'hidden',
        }}
        ref={containerRef}
      >
        <BreakpointProvider containerRef={containerRef}>
          <ActionProvider actions={actions}>
            <ComponentProvider calendarComponents={schedulelyComponents}>
              <CalendarProvider
                initialDate={initialDate}
                dateAdapter={dateAdapter}
                calendarEvents={events}
                eventPriority={eventPriority}
              >
                <HeaderLayout />
                <DayOfWeekLayout />
                <MonthLayout />
              </CalendarProvider>
            </ComponentProvider>
          </ActionProvider>
        </BreakpointProvider>
      </div>
    </StrictMode>
  );
};
