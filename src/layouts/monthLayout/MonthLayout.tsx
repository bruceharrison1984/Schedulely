import { EventWeekLayout, WeekLayout } from '@/layouts/index';
import { HighlightProvider } from '@/providers/HightlightProvider';
import { useCalendar } from '@/hooks/index';

/**
 * This component controls the layout of the weeks of the calendar
 * @returns MonthLayout Component
 */
export const MonthLayout = () => {
  const { calendarWithEvents } = useCalendar();

  return (
    <HighlightProvider>
      {calendarWithEvents.map((week, idx) => (
        <div key={idx} className="calendo--week-container" data-week={idx}>
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
