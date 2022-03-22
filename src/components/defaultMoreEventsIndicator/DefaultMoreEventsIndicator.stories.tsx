import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DefaultMoreEventsIndicator } from './DefaultMoreEventsIndicator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/DefaultMoreEventsIndicator',
  component: DefaultMoreEventsIndicator,
} as ComponentMeta<typeof DefaultMoreEventsIndicator>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DefaultMoreEventsIndicator> = (props) => (
  <div id="schedulely" className="schedulely" data-theme={'light'}>
    <DefaultMoreEventsIndicator {...props} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  events: [
    {
      start: new Date(1, 1, 2022),
      end: new Date(1, 1, 2022),
      id: '12345',
      summary: 'Test event',
      color: 'red',
    },
  ],
};
