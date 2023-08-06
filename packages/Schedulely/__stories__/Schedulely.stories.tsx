/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import '../src/Schedulely.scss';

import {
  CalendarStoryTester,
  CalendarTesterProvider,
  useCalendarTester,
} from './CalendarTester';
import { EventComponent, SchedulelyProps } from '@/types/index';
import { EventPriority } from '@/types/EventPriority';
import { Schedulely } from '../src/Schedulely';
import { StoryDecorator, ThemeState } from '@ladle/react';
import { createDefaultAdapter } from '@/dateAdapters';
import { storyEvents } from './helpers';

const story = {
  title: 'Schedulely',
  decorators: [
    (Component) => (
      <div style={{ height: '100%' }}>
        <CalendarTesterProvider inputEvents={storyEvents}>
          <Component />
        </CalendarTesterProvider>
      </div>
    ),
  ] as StoryDecorator[],
};
export default story;

const defaultProps: SchedulelyProps = {
  events: storyEvents,
  initialDate: new Date().toISOString(),
  actions: {
    onMoreEventsClick: (events) => console.log(events),
    onEventClick: (event) => console.log(event),
    onDayClick: (day) => console.log(day),
  },
};

export const XDefaultTheme = () => {
  const { startOfWeek, events, theme } = useCalendarTester();

  return (
    <>
      <CalendarStoryTester />
      <Schedulely
        {...defaultProps}
        events={events}
        dateAdapter={createDefaultAdapter('en', startOfWeek)}
        dark={theme === ThemeState.Dark}
        eventPriority={EventPriority.long}
        actions={{
          onMoreEventsClick: (events) => console.log(events),
          onEventClick: (event) => console.log(event),
          onDayClick: (day) => console.log(day),
        }}
      ></Schedulely>
    </>
  );
};

export const XXMinimalTheme = () => {
  const { startOfWeek, events, theme } = useCalendarTester();

  return (
    <>
      <CalendarStoryTester />
      <div style={{ height: '100%', marginBottom: '5em' }}>
        <Schedulely
          {...defaultProps}
          events={events}
          dateAdapter={createDefaultAdapter('en', startOfWeek)}
          theme={'minimal'}
          dark={theme === ThemeState.Dark}
          actions={{
            onMoreEventsClick: (events) => console.log(events),
            onEventClick: (event) => console.log(event),
            onDayClick: (day) => console.log(day),
          }}
        ></Schedulely>
      </div>
    </>
  );
};

export const XXXCustomEvents = () => {
  const { startOfWeek, events, theme } = useCalendarTester();

  const CustomEvent: EventComponent<{ animal: string; address: string }> = ({
    event,
    isHovered,
    onClick,
  }) => {
    const classes = ['event'];
    if (isHovered) classes.push('event-selected');

    return (
      <div
        role={'listitem'}
        data-eventid={event.id}
        className={classes.join(' ')}
        style={{
          backgroundColor: event.color,
        }}
        title={event.data?.animal}
        onClick={() => onClick(event)}
      >
        <div className="event-text-container">{`${event.summary} - ${event.data?.address}`}</div>
      </div>
    );
  };

  return (
    <>
      <CalendarStoryTester />
      <div style={{ height: '100%', marginBottom: '5em' }}>
        <Schedulely
          {...defaultProps}
          events={events}
          dateAdapter={createDefaultAdapter('en', startOfWeek)}
          dark={theme === ThemeState.Dark}
          schedulelyComponents={{ eventComponent: CustomEvent }}
          actions={{
            onMoreEventsClick: (events) => console.log(events),
            onEventClick: (event) => console.log(event),
            onDayClick: (day) => console.log(day),
          }}
        ></Schedulely>
      </div>
    </>
  );
};

export const XXXXCustomKeyboardHandlers = () => {
  const { startOfWeek, events, theme } = useCalendarTester();

  return (
    <>
      <CalendarStoryTester />
      <div style={{ height: '100%', marginBottom: '5em' }}>
        <Schedulely
          {...defaultProps}
          events={events}
          dateAdapter={createDefaultAdapter('en', startOfWeek)}
          dark={theme === ThemeState.Dark}
          calendarOptions={{
            keyboardEvents: {
              onLeftArrow: () => console.log('left'),
              onRightArrow: () => console.log('right'),
              onUpArrow: () => console.log('up'),
              onDownArrow: () => console.log('down'),
            },
          }}
          actions={{
            onMoreEventsClick: (events) => console.log(events),
            onEventClick: (event) => console.log(event),
            onDayClick: (day) => console.log(day),
          }}
        ></Schedulely>
      </div>
    </>
  );
};
