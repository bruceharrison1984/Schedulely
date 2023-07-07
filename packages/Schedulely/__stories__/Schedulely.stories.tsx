/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import '../src/Schedulely.scss';

import { EventComponent, SchedulelyProps, WeekDay } from '@/types/index';
import { Schedulely } from '../src/Schedulely';
import { StoryDecorator, ThemeState, useLadleContext } from '@ladle/react';
import { createDefaultAdapter } from '@/dateAdapters';
import { storyEvents } from './helpers';
import { useState } from 'react';

const story = {
  title: 'Schedulely',
  decorators: [
    (Component, context) => (
      <div style={{ height: '100%' }}>
        <Component />
      </div>
    ),
  ] as StoryDecorator[],
};
export default story;

export const NoEvents = () => {
  const { globalState } = useLadleContext();

  const props: SchedulelyProps = {
    events: [],
    initialDate: new Date().toISOString(),
    actions: {
      onMoreEventsClick: (events) => console.log(events),
      onEventClick: (event) => console.log(event),
      onDayClick: (day) => console.log(day),
    },
  };

  return (
    <Schedulely
      {...props}
      dark={globalState.theme === ThemeState.Dark}
    ></Schedulely>
  );
};

export const DefaultTheme = () => {
  const { globalState } = useLadleContext();
  const [startDay, setStartDay] = useState<WeekDay>(WeekDay.Sunday);

  const props: SchedulelyProps = {
    events: storyEvents,
    initialDate: new Date().toISOString(),
    actions: {
      onMoreEventsClick: (events) => console.log(events),
      onEventClick: (event) => console.log(event),
      onDayClick: (day) => console.log(day),
    },
  };
  return (
    <>
      <select onChange={(e) => setStartDay(Number.parseInt(e.target.value))}>
        <option value={0}>Sunday</option>
        <option value={1}>Monday</option>
        <option value={2}>Tuesday</option>
        <option value={3}>Wednesday</option>
        <option value={4}>Thursday</option>
        <option value={5}>Friday</option>
        <option value={6}>Saturday</option>
      </select>
      <Schedulely
        {...props}
        dateAdapter={createDefaultAdapter('en', startDay)}
        dark={globalState.theme === ThemeState.Dark}
      ></Schedulely>
    </>
  );
};

export const MinimalTheme = () => {
  const { globalState } = useLadleContext();

  const props: SchedulelyProps = {
    events: storyEvents,
    theme: 'minimal',
    initialDate: new Date().toISOString(),
  };

  return (
    <div style={{ height: '100%', marginBottom: '5em' }}>
      <Schedulely
        {...props}
        dark={globalState.theme === ThemeState.Dark}
      ></Schedulely>
    </div>
  );
};

export const CustomEvents = () => {
  const { globalState } = useLadleContext();

  const props: SchedulelyProps = {
    events: storyEvents,
    theme: 'minimal',
    initialDate: new Date().toISOString(),
  };

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
    <div style={{ height: '100%', marginBottom: '5em' }}>
      <Schedulely
        {...props}
        dark={globalState.theme === ThemeState.Dark}
        schedulelyComponents={{ eventComponent: CustomEvent }}
      ></Schedulely>
    </div>
  );
};
