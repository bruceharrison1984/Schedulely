import { EventIntersectionProvider } from '@/providers/EventIntersectionProvider';
import { EventWeekLayout } from '@/layouts/eventWeekLayout';
import { HighlightProvider } from '@/providers/HightlightProvider';
import { WeekLayout } from '@/layouts/weekLayout';
import { useCalendar } from '@/hooks/useCalendar';
import { useRef } from 'react';

/**
 * This component controls the layout of the weeks of the calendar
 * @returns MonthLayout Component
 */
export const MonthLayout = () => {
  const { calendarWithEvents } = useCalendar();
  const weekRef = useRef(null);

  return (
    <div className="calendar-body-container">
      <HighlightProvider>
        {calendarWithEvents.map((week, idx) => (
          <div
            key={idx}
            className="week-container"
            data-week={idx}
            ref={weekRef}
          >
            <EventIntersectionProvider parentRef={weekRef}>
              <EventWeekLayout
                events={week.events}
                daysInweek={week.daysInWeek}
              />
            </EventIntersectionProvider>
            <WeekLayout
              eventsOnDays={week.eventsOnDays}
              dates={week.daysInWeek}
            />
          </div>
        ))}
      </HighlightProvider>
    </div>
  );
};
