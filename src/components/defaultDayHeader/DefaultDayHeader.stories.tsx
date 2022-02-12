import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DefaultDayHeader } from './DefaultDayHeader';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/DefaultDayHeader',
  component: DefaultDayHeader,
} as ComponentMeta<typeof DefaultDayHeader>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DefaultDayHeader> = (props) => (
  <div style={{ width: '12em', height: '7em' }}>
    <DefaultDayHeader {...props} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = { dateNumber: 2, isToday: false };
