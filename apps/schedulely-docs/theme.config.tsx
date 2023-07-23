import { DocsThemeConfig } from 'nextra-theme-docs';
import React from 'react';

const config: DocsThemeConfig = {
  logo: (
    <>
      <img
        src="/schedulely-logo.svg"
        style={{
          height: '1.5em',
          paddingRight: '0.5em',
        }}
        alt="schedulely-logo"
      />
      <span style={{ fontWeight: 'bold', fontSize: '1.5em' }}>Schedulely</span>
    </>
  ),
  project: {
    link: 'https://github.com/bruceharrison1984/Schedulely',
  },
  docsRepositoryBase:
    'https://github.com/bruceharrison1984/Schedulely/tree/main/apps/schedulely-docs',
  banner: {
    dismissible: false,
    text: '🚧 There be dragons here. Please bear with us until the 1.0.0 release 🚧',
  },
};

export default config;
