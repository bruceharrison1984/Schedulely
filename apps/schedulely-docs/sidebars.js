/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Components',
      link: {
        type: 'doc',
        id: 'Components/Components',
      },
      items: ['Components/Day', 'Components/Event', 'Components/Header'],
    },
    {
      type: 'category',
      label: 'Usage',
      link: {
        type: 'generated-index',
      },
      items: [
        'Usage/Events',
        'Usage/CustomEventData',
        'Usage/Actions',
        'Usage/DateTime',
        'Usage/Keyboard',
        'Usage/StartOfWeek',
      ],
    },
    {
      type: 'category',
      label: 'Themes',
      link: {
        type: 'doc',
        id: 'Themes/Themes',
      },
      items: ['Themes/DarkMode'],
    },
    'alternatives',
  ],
};

module.exports = sidebars;
