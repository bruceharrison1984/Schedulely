const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  codeHighlight: false,
});

module.exports = withNextra({
  distDir: './dist',
  output: 'export',
  basePath: '/bruceharrison1984',
  images: {
    unoptimized: true,
  },
});
