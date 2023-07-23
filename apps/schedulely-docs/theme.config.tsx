import { DocsThemeConfig } from 'nextra-theme-docs';
import React from 'react';

const config: DocsThemeConfig = {
  logo: <span>Schedulely Documentation</span>,
  project: {
    link: 'https://github.com/bruceharrison1984/Schedulely',
  },
  docsRepositoryBase:
    'https://github.com/bruceharrison1984/Schedulely/tree/main/apps/schedulely-docs',
  footer: {
    text: 'Schedulely Documentation',
  },
};

export default config;
