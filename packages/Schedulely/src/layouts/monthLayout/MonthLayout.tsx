import { EventWeekLayout } from '@/layouts/eventWeekLayout';
import { HighlightProvider } from '@/providers/HightlightProvider';
import { WeekLayout } from '@/layouts/weekLayout';
import { useCalendar } from '@/hooks/useCalendar';

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
          <div key={idx} className="week-container" data-week={idx}>
            {/* <div
              style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
              }}
            > */}
            <EventWeekLayout
              events={week.events}
              daysInweek={week.daysInWeek}
            />
            {/* </div> */}
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
