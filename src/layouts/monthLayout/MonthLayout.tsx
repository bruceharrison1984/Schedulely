import './MonthLayout.scss';
import { EventLayout, WeekLayout } from '@/layouts/index';
import { useCalendar } from '@/hooks/index';
import { useState } from 'react';

/**
 * This component controls the layout of the weeks of the calendar
 * @returns MonthLayout Component
 */
export const MonthLayout = () => {
  const { calendarWithEvents } = useCalendar();
  /**
   * TODO:
   * Hacky way to get multi-line highlights working
   * causes excessive re-render of all events :(
   * Pure SCSS option is likely possible
   */
  const [highlightedEvent, setHighlightedEvent] = useState<
    string | undefined
  >();

  return (
    <>
      {calendarWithEvents.map((week, idx) => (
        <div key={idx} className="calendo--week-container" data-week={idx}>
          {/* If we have no events, don't bother rendering the event grid */}
          {!!week.events.length && (
            <EventLayout
              events={week.events}
              startOfWeek={week.daysInWeek[0]}
              endOfWeek={week.daysInWeek[6]}
              setHighlightedEvent={setHighlightedEvent}
              highlightedEvent={highlightedEvent}
            />
          )}
          <WeekLayout dates={week.daysInWeek} />
        </div>
      ))}
    </>
  );
};
