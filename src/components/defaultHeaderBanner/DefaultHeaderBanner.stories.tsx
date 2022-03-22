import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DefaultHeaderBanner } from './DefaultHeaderBanner';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/DefaultHeaderBanner',
  component: DefaultHeaderBanner,
} as ComponentMeta<typeof DefaultHeaderBanner>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DefaultHeaderBanner> = (props) => (
  <div id="schedulely" className="schedulely" data-theme={'light'}>
    <DefaultHeaderBanner {...props} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = { month: 'December', year: 2021 };
