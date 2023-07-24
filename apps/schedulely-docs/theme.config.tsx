import { DocsThemeConfig } from 'nextra-theme-docs';
import { PageLogo } from './components/Logo';
import { Pre } from './components/pre';
import React from 'react';

const config: DocsThemeConfig = {
  logo: <PageLogo />,
  project: {
    link: 'https://github.com/bruceharrison1984/Schedulely',
  },
  docsRepositoryBase:
    'https://github.com/bruceharrison1984/Schedulely/tree/main/apps/schedulely-docs',
  banner: {
    dismissible: false,
    text: '🚧 There be dragons here. Please bear with us until the 1.0.0 release 🚧',
  },
  components: {
    pre: Pre,
  },
};

export default config;
