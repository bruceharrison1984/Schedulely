import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DefaultDay } from './DefaultDay';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/DefaultDay',
  component: DefaultDay,
} as ComponentMeta<typeof DefaultDay>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DefaultDay> = (props) => (
  <div style={{ width: '12em', height: '7em' }}>
    <DefaultDay {...props} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = { isCurrentMonth: true };
