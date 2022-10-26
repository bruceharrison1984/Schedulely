import { EventIntersectionProvider, HighlightProvider } from '@/providers';
import { EventWeekLayout } from '@/layouts/eventWeekLayout';
import { WeekLayout } from '@/layouts/weekLayout';
import { useCalendar } from '@/hooks/useCalendar';
import { useKeyboardControls } from '@/hooks';

/**
 * This component controls the layout of the weeks of the calendar
 * @returns MonthLayout Component
 */
export const MonthLayout = () => {
  const { calendarWithEvents } = useCalendar();
  useKeyboardControls();

  return (
    <div className="calendar-body-container">
      <HighlightProvider>
        {calendarWithEvents.map((week, idx) => (
          <div
            key={week.weekStart.toISOString()}
            className="week-container"
            data-week={idx}
          >
            <EventIntersectionProvider events={week.events}>
              <EventWeekLayout
                events={week.events}
                daysInweek={week.daysInWeek}
              />
              <WeekLayout dates={week.daysInWeek} />
            </EventIntersectionProvider>
          </div>
        ))}
      </HighlightProvider>
    </div>
  );
};
