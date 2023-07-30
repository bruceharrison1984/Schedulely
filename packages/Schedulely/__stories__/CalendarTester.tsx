import { CalendarEvent, WeekDay } from '@/types';
import { Chance } from 'chance';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { ThemeState, useLadleContext } from '@ladle/react';

type CalendarTesterState = {
  events: CalendarEvent[];
  startOfWeek: WeekDay;
  changeEvents: (events: CalendarEvent[]) => void;
  changeStartOfWeek: (day: WeekDay) => void;
  clearEvents: () => void;
  theme: ThemeState;
  initialDate: Date;
};

export const CalendarTesterContext = createContext<CalendarTesterState | null>(
  null
);

export const useCalendarTester = () => {
  const calendarTester = useContext(CalendarTesterContext);
  if (!calendarTester)
    throw new Error(
      'useCalendarTester must be used within CalendarTesterProvider'
    );
  return calendarTester;
};

export const CalendarTesterProvider = ({
  children,
  inputEvents,
  currentDate,
}: PropsWithChildren<{
  currentDate?: Date;
  inputEvents?: CalendarEvent[];
}>) => {
  const { globalState } = useLadleContext();
  const [startDay, setStartDay] = useState<WeekDay>(WeekDay.Sunday);
  const [events, setEvents] = useState<CalendarEvent[]>(inputEvents || []);

  const changeStartOfWeek = (day: WeekDay) => setStartDay(day);
  const changeEvents = (events: CalendarEvent[]) => setEvents([...events]);
  const clearEvents = () => setEvents([]);

  const context: CalendarTesterState = {
    changeStartOfWeek,
    changeEvents,
    initialDate: currentDate || new Date(),
    events,
    clearEvents,
    startOfWeek: startDay,
    theme: globalState.theme,
  };

  return (
    <CalendarTesterContext.Provider value={context}>
      {children}
    </CalendarTesterContext.Provider>
  );
};

export const CalendarStoryTester = (props: PropsWithChildren) => {
  const { changeStartOfWeek, changeEvents, events, initialDate, clearEvents } =
    useCalendarTester();

  const lastDayOfMonth = new Date(
    initialDate.getFullYear(),
    initialDate.getMonth() + 1,
    0
  ).getDate();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <span>Start Day: </span>
          <select
            onChange={(e) => changeStartOfWeek(Number.parseInt(e.target.value))}
            style={{ marginBottom: '10px' }}
          >
            <option value={0}>Sunday</option>
            <option value={1}>Monday</option>
            <option value={2}>Tuesday</option>
            <option value={3}>Wednesday</option>
            <option value={4}>Thursday</option>
            <option value={5}>Friday</option>
            <option value={6}>Saturday</option>
          </select>
        </div>
        <div>
          <button
            onClick={() => {
              const start = Chance().integer({ min: 1, max: lastDayOfMonth });
              const end = Chance().integer({ min: start, max: lastDayOfMonth });

              events.push({
                id: Chance().string(),
                start: new Date(
                  initialDate.getFullYear(),
                  initialDate.getMonth(),
                  start
                ).toISOString(),
                end: new Date(
                  initialDate.getFullYear(),
                  initialDate.getMonth(),
                  end
                ).toISOString(),
                color: Chance().color(),
                summary: Chance().name(),
              });
              changeEvents(events);
            }}
          >
            Add Event To Initial Month
          </button>
        </div>
        <div>
          <button onClick={clearEvents}>Clear All Events</button>
        </div>
      </div>
      <hr />
    </>
  );
};
