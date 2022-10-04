import '../src/Schedulely.scss';

import { Schedulely } from '../src/Schedulely';
import { SchedulelyProps } from '@/types/index';
import {
  Story,
  StoryDecorator,
  ThemeState,
  useLadleContext,
} from '@ladle/react';
import { storyEvents } from './helpers.stories';

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
