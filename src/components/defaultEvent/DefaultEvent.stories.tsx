import './DefaultEvent.scss';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DefaultEvent } from './DefaultEvent';
import { EventComponentProps } from '@/types';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/DefaultEvent',
  component: DefaultEvent,
} as ComponentMeta<typeof DefaultEvent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DefaultEvent> = (
  props: EventComponentProps
) => (
  <div id="schedulely" className="schedulely" data-theme={'light'}>
    <DefaultEvent {...props} />
  </div>
);

export const Unhovered = Template.bind({});
Unhovered.args = {
  event: {
    start: new Date(1, 1, 2022),
    end: new Date(1, 1, 2022),
    id: '12345',
    summary: 'Test event',
    color: 'red',
  },
  isHovered: false,
};

export const Hovered = Template.bind({});
Hovered.args = {
  event: {
    start: new Date(1, 1, 2022),
    end: new Date(1, 1, 2022),
    id: '12345',
    summary: 'Test event',
    color: 'red',
  },
  isHovered: true,
};
