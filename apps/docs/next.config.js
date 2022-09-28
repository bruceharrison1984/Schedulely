const withTM = require('next-transpile-modules')(['schedulely']);

module.exports = withTM({
  reactStrictMode: true,
});

// module.exports = {
//   reactStrictMode: true,
// };
