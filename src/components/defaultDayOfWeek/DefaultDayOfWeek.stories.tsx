import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DefaultDayOfWeek } from './DefaultDayOfWeek';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/DefaultDayOfWeek',
  component: DefaultDayOfWeek,
} as ComponentMeta<typeof DefaultDayOfWeek>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DefaultDayOfWeek> = (props) => (
  <div id="schedulely" className="schedulely" data-theme={'light'}>
    <DefaultDayOfWeek {...props} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = { dayName: 'Monday' };
