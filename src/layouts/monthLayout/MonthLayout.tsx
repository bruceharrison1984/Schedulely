import './MonthLayout.scss';
import { EventLayout, WeekLayout } from '@/layouts/index';
import { useCalendar } from '@/hooks/index';

/**
 * This component controls the layout of the weeks of the calendar
 * @returns MonthLayout Component
 */
export const MonthLayout = () => {
  const { calendarWithEvents } = useCalendar();

  return (
    <>
      {calendarWithEvents.map((week, idx) => (
        <div
          key={`${week.weekStart.toISOString()}`}
          className="nm--week-container"
          data-week={idx}
        >
          {/* If we have no events, don't bother rendering the event grid */}
          {!!week.events.length && (
            <EventLayout
              events={week.events}
              startOfWeek={week.daysInWeek[0]}
              endOfWeek={week.daysInWeek[6]}
            />
          )}
          <WeekLayout dates={week.daysInWeek} />
        </div>
      ))}
    </>
  );
};
