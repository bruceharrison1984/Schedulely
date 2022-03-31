import { InternalCalendarEvent } from '@/types/InternalCalendarEvent';
import { ZonedDateTime } from 'temporal-polyfill';
import { useActions } from '@/hooks/useActions';
import { useCalendar, useComponents } from '@/hooks/index';
import { useCallback } from 'react';

interface WeekLayoutProps {
  dates: ZonedDateTime[];
  eventsOnDays: { date: ZonedDateTime; events: InternalCalendarEvent[] }[];
}

/**
 * This component controls the layout of an individual weeks worth of days
 * @returns WeekLayout Component
 */
export const WeekLayout = ({ dates, eventsOnDays }: WeekLayoutProps) => {
  const { dateAdapter, currentMonth } = useCalendar();

  const {
    dayComponent: DayComponent,
    dayHeaderComponent: DayHeader,
    moreEventsIndicatorComponent: MoreEventsIndicatorComponent,
  } = useComponents();

  const { onMoreEventClick } = useActions();

  /**
   * Display 'more events' indicator.
   * This feels like it doesn't belong here, not sure where to move it
   * Also not a great solution because it forces Day to be 7em, rather than detect overflow
   */
  const hasEventOverflow = useCallback(
    (date: ZonedDateTime, overflowLimit = 3) => {
      const events = eventsOnDays.find((x) => x.date.day === date.day)?.events;
      if (!events) return false;
      if (events.length > overflowLimit) return true;
    },
    [eventsOnDays]
  );

  return (
    <div className="schedulely--week-layout">
      {dates.map((day) => (
        <div
          key={day.day}
          data-day={day.day}
          data-istoday={dateAdapter.isDateToday(day) ? true : undefined}
        >
          <DayComponent
            isCurrentMonth={dateAdapter.isSameMonth(day, currentMonth)}
          >
            <div className="schedulely--week-day-layout">
              <DayHeader
                isToday={dateAdapter.isDateToday(day)}
                dateNumber={dateAdapter.getDayNumber(day)}
              />
              {/* empty div to maintain space within grid */}
              <div></div>
              {hasEventOverflow(day) && (
                <MoreEventsIndicatorComponent
                  events={
                    eventsOnDays.find((x) => x.date === day)?.events || []
                  }
                  onClick={onMoreEventClick}
                />
              )}
            </div>
          </DayComponent>
        </div>
      ))}
    </div>
  );
};
