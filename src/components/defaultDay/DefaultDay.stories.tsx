import './DefaultDay.scss';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DayComponentProps } from '@/types';
import { DefaultDay } from './DefaultDay';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/DefaultDay',
  component: DefaultDay,
} as ComponentMeta<typeof DefaultDay>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DefaultDay> = (
  props: DayComponentProps
) => (
  <div style={{ height: '5em' }}>
    <div id="schedulely" className="schedulely" data-theme={'light'}>
      <DefaultDay {...props} />
    </div>
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  isCurrentMonth: true,
  isToday: true,
  dateNumber: 22,
  events: [],
  isOverflowed: true,
  onClick: null,
};
