import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DefaultBackButton } from './DefaultBackButton';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Buttons/DefaultBackButton',
  component: DefaultBackButton,
} as ComponentMeta<typeof DefaultBackButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DefaultBackButton> = (props) => (
  <DefaultBackButton {...props} />
);

export const Primary = Template.bind({});
Primary.args = { onClick: () => console.log('clicked!') };
