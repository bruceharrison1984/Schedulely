/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import '../src/Schedulely.scss';

import { EventComponent, SchedulelyProps } from '@/types/index';
import { Schedulely } from '../src/Schedulely';
import { StoryDecorator, ThemeState, useLadleContext } from '@ladle/react';
import { storyEvents } from './helpers';

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
    <Schedulely
      {...props}
      dark={globalState.theme === ThemeState.Dark}
    ></Schedulely>
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
