import { EventIntersectionProvider, HighlightProvider } from '@/providers';
import { EventWeekLayout, WeekLayout } from '@/layouts';
import { useCalendar } from '@/hooks';

/**
 * This component controls the layout of the weeks of the calendar
 * @returns MonthLayout Component
 */
export const MonthLayout = () => {
  const { calendarWithEvents } = useCalendar();

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
              <WeekLayout
                eventsOnDays={week.eventsOnDays}
                dates={week.daysInWeek}
              />
            </EventIntersectionProvider>
          </div>
        ))}
      </HighlightProvider>
    </div>
  );
};
