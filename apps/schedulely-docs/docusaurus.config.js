// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'schedulely',
  tagline: 'The super-fast, super-small React calendar',
  url: 'https://bruceharrison1984.github.io/',
  baseUrl: '/Schedulely/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'bruceharrison1984',
  projectName: 'Schedulely',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  themes: ['@docusaurus/theme-live-codeblock'],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/bruceharrison1984/Schedulely/tree/main/apps/schedulely-docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-B7NYF75SRT',
          anonymizeIP: true,
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Schedulely',
        logo: {
          alt: 'Schedulely Logo',
          src: 'img/calendar-days-regular.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/bruceharrison1984/Schedulely',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Schedulely, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      liveCodeBlock: {
        playgroundPosition: 'top',
      },
      announcementBar: {
        id: 'warning',
        content:
          '🚧 <b>There be dragons here. Please bear with us until the 1.0.0 release</b> 🚧',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: false,
      },
    }),
};

module.exports = config;
