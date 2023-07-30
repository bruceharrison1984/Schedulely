import { EventIntersectionProvider, HighlightProvider } from '@/providers';
import { EventWeekLayout } from '@/layouts/eventWeekLayout';
import { WeekLayout } from '@/layouts/weekLayout';
import { useCalendar, useKeyboardControls } from '@/hooks';

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
        {calendarWithEvents.map(({ daysInWeek, events }, idx) => (
          <div
            key={daysInWeek[0].toISOString()}
            className="week-container"
            data-week={idx}
          >
            <EventIntersectionProvider
              eventsInWeek={events}
              weekNumber={idx + 1}
            >
              <EventWeekLayout eventsInWeek={events} daysInweek={daysInWeek} />
              <WeekLayout dates={daysInWeek} />
            </EventIntersectionProvider>
          </div>
        ))}
      </HighlightProvider>
    </div>
  );
};
