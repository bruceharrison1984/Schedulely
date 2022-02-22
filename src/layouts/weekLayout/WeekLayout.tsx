import './WeekLayout.scss';
import { useCalendar, useComponents } from '@/hooks/index';

interface WeekLayoutProps {
  dates: Date[];
}

/**
 * This component controls the layout of an individual weeks worth of days
 * @returns WeekLayout Component
 */
export const WeekLayout = ({ dates }: WeekLayoutProps) => {
  const { dateConvertor, currentMonth } = useCalendar();

  const { dayComponent: DayComponent, dayHeaderComponent: DayHeader } =
    useComponents();

  return (
    <div className="nm--week-layout">
      {dates.map((day) => (
        <div
          key={day.getDate()}
          data-day={day.getDate()}
          data-istoday={dateConvertor.isDateToday(day) ? true : undefined}
        >
          <DayComponent
            isCurrentMonth={dateConvertor.isSameMonth(day, currentMonth)}
          >
            <DayHeader
              isToday={dateConvertor.isDateToday(day)}
              dateNumber={dateConvertor.getDayNumberFromDate(day)}
            />
          </DayComponent>
        </div>
      ))}
    </div>
  );
};
