import '@storybook/addon-console';
import { useDarkMode } from 'storybook-dark-mode';
import { useEffect } from 'react';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => {
    const isDarkMode = useDarkMode();
    useEffect(
      () =>
        (document.getElementById('calendo').dataset.theme = isDarkMode
          ? 'dark'
          : 'light'),
      [isDarkMode]
    );
    return <Story />;
  },
];
