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

export default {
  title: 'NextMonth',
  component: NextMonth,
} as ComponentMeta<typeof NextMonth>;

const Template: ComponentStory<typeof NextMonth> = (props) => (
  <NextMonth {...props}></NextMonth>
);

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    start: new Date(2022, 1, 7),
    end: new Date(2022, 1, 11),
    summary: 'EVENT 2022-2-7 -> 2022-2-11',
    color: 'lightblue',
  },
  {
    id: '3',
    start: new Date(2022, 1, 11),
    end: new Date(2022, 1, 12),
    summary: 'EVENT 2 2022-2-11 -> 2022-2-12',
    color: 'cyan',
  },
  {
    id: '6',
    start: new Date(2022, 1, 9),
    end: new Date(2022, 1, 9),
    summary: 'EVENT 2 2022-2-10 -> 2022-2-10',
    color: 'yellow',
  },
  {
    id: '2',
    start: new Date(2022, 1, 10),
    end: new Date(2022, 1, 15),
    summary: 'EVENT 2 2022-2-10 -> 2022-2-15',
    color: 'pink',
  },
  {
    id: '5',
    start: new Date(2022, 3, 10),
    end: new Date(2022, 3, 15),
    summary: 'EVENT 3 2022-3-10 -> 2022-3-15',
    color: 'pink',
  },
  {
    id: '7',
    start: new Date(2022, 1, 20),
    end: new Date(2022, 1, 25),
    summary: 'EVENT 3 2022-3-10 -> 2022-3-15',
    color: 'pink',
  },
  {
    id: '7',
    start: new Date(2022, 1, 12),
    end: new Date(2022, 1, 12),
    summary: 'EVENT 3 2022-3-10 -> 2022-3-15',
    color: 'pink',
  },
];

export const datefns = Template.bind({});
datefns.args = {
  events: mockEvents,
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
nativeJs.args = {
  events: mockEvents,
  dateConvertor: createDefaultConvertor(),
};
