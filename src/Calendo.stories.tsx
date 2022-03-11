import { CalendarEvent } from '@/types/index';
import { Calendo } from './Calendo';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import {
  addDays,
  // addMonths,
  // eachDayOfInterval,
  // eachWeekOfInterval,
  // format,
  // isSameWeek,
  // startOfMonth,
  // startOfWeek,
} from 'date-fns';
// import { createDateFnsConvertor } from './dateConvertors/dateFns';
import { createDefaultAdapter } from './dateAdapters';
import chance from 'chance';

export default {
  title: 'Calendo',
  component: Calendo,
} as ComponentMeta<typeof Calendo>;

const Template: ComponentStory<typeof Calendo> = (props) => (
  <Calendo {...props}></Calendo>
);

const chanceSeed = chance(1);

const generateEvents = (
  numberOfEvents = 100,
  minLength = 0,
  maxLength = 15
) => {
  const events: CalendarEvent[] = [];
  const today = new Date();
  for (let index = 0; index < numberOfEvents; index++) {
    const id = index.toString();
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

const events = [...generateEvents(), ...generateEvents(100, 0, 1)];

// export const datefns = Template.bind({});
// datefns.storyName = 'DateFns';
// datefns.args = {
//   events,
//   dateConvertor: createDateFnsConvertor({
//     addDays,
//     eachDayOfInterval,
//     eachWeekOfInterval,
//     format,
//     startOfMonth,
//     startOfWeek,
//     addMonths,
//     isSameWeek,
//   }),
// };

export const nativeJs = Template.bind({});
nativeJs.storyName = 'NativeJS Date';
nativeJs.args = {
  events,
  dateAdapter: createDefaultAdapter(),
};
