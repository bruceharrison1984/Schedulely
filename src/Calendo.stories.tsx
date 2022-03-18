import './Calendo.scss';

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
    end: 'Wed Mar 02 2022 00:00:00 GMT-0600 (Central Standard Time)',
    id: 'f147',
    start: 'Wed Mar 02 2022 00:00:00 GMT-0600 (Central Standard Time)',
    summary: 'Craig Bishop',
  },
  {
    color: '#4b578a',
    end: 'Wed Mar 02 2022 00:00:00 GMT-0600 (Central Standard Time)',
    id: 'a147',
    start: 'Wed Mar 02 2022 00:00:00 GMT-0600 (Central Standard Time)',
    summary: 'Craig Bishop',
  },
  {
    color: '#4b578a',
    end: 'Wed Mar 02 2022 00:00:00 GMT-0600 (Central Standard Time)',
    id: 'b147',
    start: 'Wed Mar 02 2022 00:00:00 GMT-0600 (Central Standard Time)',
    summary: 'Craig Bishop',
  },
  {
    color: '#4b578a',
    end: 'Wed Mar 02 2022 00:00:00 GMT-0600 (Central Standard Time)',
    id: 'c147',
    start: 'Wed Mar 02 2022 00:00:00 GMT-0600 (Central Standard Time)',
    summary: 'Craig Bishop',
  },
  {
    color: '#4b578a',
    end: 'Wed Mar 02 2022 00:00:00 GMT-0600 (Central Standard Time)',
    id: 'd147',
    start: 'Wed Mar 02 2022 00:00:00 GMT-0600 (Central Standard Time)',
    summary: 'Craig Bishop',
  },
  {
    color: '#4b578a',
    end: 'Wed Mar 02 2022 00:00:00 GMT-0600 (Central Standard Time)',
    id: 'e147',
    start: 'Wed Mar 02 2022 00:00:00 GMT-0600 (Central Standard Time)',
    summary: 'Craig Bishop',
  },
];

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
  theme: 'light',
};
