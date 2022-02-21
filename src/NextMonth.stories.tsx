import { CalendarEvent } from '@/types/index';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { NextMonth } from './NextMonth';
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  isSameWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { createDateFnsConvertor } from './dateConvertors/dateFns';
import { createDefaultConvertor } from './dateConvertors';
import chance from 'chance';

export default {
  title: 'NextMonth',
  component: NextMonth,
} as ComponentMeta<typeof NextMonth>;

const Template: ComponentStory<typeof NextMonth> = (props) => (
  <NextMonth {...props}></NextMonth>
);

const generateEvents = (numberOfEvents = 100) => {
  const events: CalendarEvent[] = [];
  const today = new Date();
  for (let index = 0; index < numberOfEvents; index++) {
    const id = index.toString();
    const start = new Date(
      chance().integer({
        min: today.getFullYear() - 1,
        max: today.getFullYear() + 1,
      }),
      chance().integer({ min: 0, max: 11 }),
      chance().integer({ min: 1, max: 30 })
    );
    const end = addDays(start, chance().integer({ min: 0, max: 15 }));
    const summary = chance().name();
    const color = chance().color();
    events.push({ id, start, end, summary, color });
  }
  return events;
};

// const mockEvents: CalendarEvent[] = [
//   {
//     id: '1',
//     start: new Date(2022, 1, 7),
//     end: new Date(2022, 1, 11),
//     summary: 'EVENT 2022-2-7 -> 2022-2-11',
//     color: 'lightblue',
//   },
//   {
//     id: '2',
//     start: new Date(2022, 1, 10),
//     end: new Date(2022, 1, 15),
//     summary: 'EVENT 2 2022-2-10 -> 2022-2-15',
//     color: 'pink',
//   },
//   {
//     id: '3',
//     start: new Date(2022, 1, 11),
//     end: new Date(2022, 1, 12),
//     summary: 'EVENT 3 2022-2-11 -> 2022-2-12',
//     color: 'cyan',
//   },
//   {
//     id: '5',
//     start: new Date(2022, 3, 10),
//     end: new Date(2022, 3, 15),
//     summary: 'EVENT 5 2022-4-10 -> 2022-4-15',
//     color: 'pink',
//   },
//   {
//     id: '6',
//     start: new Date(2022, 1, 9),
//     end: new Date(2022, 1, 9),
//     summary: 'EVENT 6 2022-2-9 -> 2022-2-9',
//     color: 'yellow',
//   },
//   {
//     id: '7',
//     start: new Date(2022, 1, 20),
//     end: new Date(2022, 1, 25),
//     summary: 'EVENT 7 2022-2-20 -> 2022-2-25',
//     color: 'pink',
//   },
// ];

export const datefns = Template.bind({});
datefns.storyName = 'DateFns';
datefns.args = {
  events: generateEvents(),
  dateConvertor: createDateFnsConvertor({
    addDays,
    eachDayOfInterval,
    eachWeekOfInterval,
    format,
    startOfMonth,
    startOfWeek,
    addMonths,
    isSameWeek,
  }),
};

export const nativeJs = Template.bind({});
nativeJs.storyName = 'NativeJS Date';
nativeJs.args = {
  events: generateEvents(),
  dateConvertor: createDefaultConvertor(),
};
