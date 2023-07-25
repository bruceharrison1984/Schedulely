import { DocsThemeConfig } from 'nextra-theme-docs';
import { PageLogo } from './components/Logo';
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
    text: <span>🚧 Please bear with us until the 1.0.0 release 🚧</span>,
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s - Schedulely',
    };
  },
};

export default config;
