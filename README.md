# Schedulely

### Prerelease

_This component is still very early in development. Everything is currently still subject to massive change, so use at your own risk! Don't be surprised if you run into major or breaking bugs until we hit the 1.0.0 release._

![Schedulely Preview](https://github.com/bruceharrison1984/Schedulely/blob/main/assets/preview.png?raw=true 'Schedulely Preview')

### 📚 Live Previews & Documentation

- [Documentation and live previews can be found in the docs](https://bruceharrison1984.github.io/Schedulely/)

---

[![npm](https://img.shields.io/npm/v/schedulely)](https://www.npmjs.com/package/schedulely) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/schedulely)](https://bundlephobia.com/package/schedulely) [![install size](https://packagephobia.com/badge?p=schedulely)](https://packagephobia.com/result?p=schedulely) ![NPM](https://img.shields.io/npm/l/schedulely?color=blue)

## 📃 Description

A react-based, light-weight, highly customizable Month calendar for React-based applications.

- Extremely small deployed package size (less than 5kb when minified & g-zipped)
- Entire design is based on CSS-grid, so it is fully responsive and fast
- Easy to override default components to add unique behavior and styles

The ultimate goal for this library was to create a framework that allowed for users to create their own calendar and components for use in the grid system. This allows for users to easily add additional functionality without bloating the base library with features not everyone may want.

The included default calendar components can be simply used as is, but the real power is being able to easily override these components. This allows consumers to use any state-management, styles, UX, or _whatever_ without needing them included in this library, and without interfering with it's overall behavior.

## Development

### Projects

| location                 | description                                                                  |
| ------------------------ | ---------------------------------------------------------------------------- |
| `./packages/Schedulely`  | The Schedulely component that is used to create the NPM package              |
| `./apps/schedulely-docs` | The Docusaurus project that contains the formal documentation for Schedulely |

### Turborepo

These project uses Turborepo for building, so many of these tasks are additive and will call other tasks.

The following commands are used for development:

| command            | description                                                               |
| ------------------ | ------------------------------------------------------------------------- |
| `npm run build`    | Build all artifacts (Schedulely and docs)                                 |
| `npm run rollup`   | Build the Schedulely NPM package artifact                                 |
| `npm run dev`      | Run Schedulely within Ladle. This is used for real-time local development |
| `npm run test`     | Run Jest unit tests for Schedulely                                        |
| `npm run dev-docs` | Run Docusaurus documentation with real-time updates.                      |
