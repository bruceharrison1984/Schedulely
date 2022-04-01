import './Schedulely.css';

import { CalendarEvent } from '@/types/index';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Schedulely } from './Schedulely';
import { addDays } from 'date-fns';
import chance from 'chance';

export default {
  title: 'Schedulely',
  component: Schedulely,
} as ComponentMeta<typeof Schedulely>;

const Template: ComponentStory<typeof Schedulely> = (props) => (
  <Schedulely {...props}></Schedulely>
);

const chanceSeed = chance(1);

const generateEvents = (
  numberOfEvents = 100,
  minLength = 0,
  maxLength = 15,
  idOffset = 0
) => {
  const events: CalendarEvent[] = [];
  const today = new Date();
  for (let index = 0; index < numberOfEvents; index++) {
    const id = (index + idOffset).toString();
    const start = new Date(
      chanceSeed.integer({
        min: today.getFullYear() - 1,
        max: today.getFullYear() + 1,
      }),
      chanceSeed.integer({ min: 0, max: 11 }),
      chanceSeed.integer({ min: 1, max: 30 })
    );
    const end = addDays(
      start,
      chanceSeed.integer({ min: minLength, max: maxLength })
    );
    const summary = chanceSeed.name();
    const color = chanceSeed.color({ format: 'hex' });
    events.push({
      id,
      start: start.toISOString(),
      end: end.toISOString(),
      summary,
      color,
    });
  }
  return events;
};

const events = [
  ...generateEvents(100),
  ...generateEvents(100, 0, 1, 100),
  {
    color: '#4b578a',
    end: new Date(2021, 8, 25).toISOString(),
    id: '1',
    start: new Date(2021, 8, 11).toISOString(),
    summary: '*Cross Week Test*',
  },
];

export const nativeJs = Template.bind({});
nativeJs.storyName = 'Temporal';
nativeJs.args = {
  events,
  theme: 'light',
};
