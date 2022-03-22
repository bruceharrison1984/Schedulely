import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DefaultForwardButton } from './DefaultForwardButton';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Buttons/DefaultForwardButton',
  component: DefaultForwardButton,
} as ComponentMeta<typeof DefaultForwardButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DefaultForwardButton> = (props) => (
  <div id="schedulely" className="schedulely" data-theme={'light'}>
    <DefaultForwardButton {...props} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = { onClick: () => console.log('clicked!') };
