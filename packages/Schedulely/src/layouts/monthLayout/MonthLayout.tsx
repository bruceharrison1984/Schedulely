import { EventWeekLayout } from '@/layouts/eventWeekLayout';
import { HighlightProvider } from '@/providers/HightlightProvider';
import { WeekLayout } from '@/layouts/weekLayout';
import { useCalendar } from '@/hooks/useCalendar';

/**
 * This component controls the layout of the weeks of the calendar
 * @returns MonthLayout Component
 */
export const MonthLayout = () => {
  const { calendarWithEvents, dayHeightPx } = useCalendar();

  return (
    <HighlightProvider>
      {calendarWithEvents.map((week, idx) => (
        <div
          key={idx}
          className="week-container"
          style={{ height: dayHeightPx }}
          data-week={idx}
        >
          {/* If we have no events, don't bother rendering the event grid */}
          {!!week.events.length && (
            <EventWeekLayout
              events={week.events}
              daysInweek={week.daysInWeek}
            />
          )}
          <WeekLayout
            eventsOnDays={week.eventsOnDays}
            dates={week.daysInWeek}
          />
        </div>
      ))}
    </HighlightProvider>
  );
};
