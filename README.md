# Schedulely

### Prerelease

_This component is still very early in development. Everything is currently still subject to massive change (including the project name), so use at your own risk!_

![Large Calendar Preview](/assets/large_preview.png)
[**Storybook Demo**](https://bruceharrison1984.github.io/Schedulely)

---

[![npm version](https://badge.fury.io/js/schedulely.svg)](https://badge.fury.io/js/schedulely) [![bundlephobia](https://badgen.net/bundlephobia/minzip/schedulely)](https://bundlephobia.com/package/schedulely) [![install size](https://packagephobia.com/badge?p=schedulely)](https://packagephobia.com/result?p=schedulely)

## 📃 Description

A react-based, light-weight, highly customizable Month calendar for React-based applications.

- Extremely small package size
- Entire design is based on CSS-grid, so it is fully responsive and fast!
- Easy to override default components to add unique behavior

The ultimate goal for this library was to create a blank canvas that allowed for users to create their own calendar and components for use in the grid system. This allows for users to easily add additional functionality without bloating the base library with features not everyone may want.

The included default calendar components can be simply used as is, but the real power is being able to easily override these components. This allows consumers to use any state-management, styles, UX, or _whatever_ without needing them included in this library, and without interfering with it's behavior.

## 📦 Installation

NPM:

```sh
npm install schedulely
```

Yarn:

```sh
yarn install schedulely
```

## 🔨 Basic Usage

This example initializes the calendar with default components, using the included NativeJS DateAdapter as the date library.

```js
import 'schedulely/dist/index.css';
import { Schedulely } from './Schedulely';

...
  export const MyApp = () => {
    const events = [
      {
        id: '1',
        start: '2022-02-07T06:00:00.000Z', // ISO formatted
        end: '2022-02-11T06:00:00.000Z'), // ISO formatted
        summary: 'EVENT 2022-2-7 -> 2022-2-11',
        color: 'lightblue',
      },
      {
        id: '3',
        start: '2022-02-11T06:00:00.000Z', // ISO formatted
        end: '2022-02-12T06:00:00.000Z', // ISO formatted
        summary: 'EVENT 2 2022-2-11 -> 2022-2-12',
        color: 'cyan',
      },
    ];

    return (<Schedulely events={events} />);
  }

/* HEAD (for custom font) */
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
  rel="stylesheet"
/>
```

## 🔧 Custom Components

[See Component Docs](src/components/README.md)

The default components contain very little behavior outside of simply being displayed. Implementing things such as `onClick` handlers or selection is entirely up to the end user. While the Default components can be restyled, the approach _we recommend is creating custom components for the display and actions that your project requires_.

## 📚 DateTime Libraries

[See DateAdapter Docs](src/dateAdapters/readme.md)

Schedulely doesn't force a particular DateTime library on you. By implementing the `DateAdapter` interface, you can pass in whatever DateTime implementation that you want. This helps us keep the package size very small, and not force consumers to have to marshall DateTime objects between libraries within their own projects.

_By default, the calendar will use the NativeJs DateAdapter for dealing with dates._

The long term plan is to implement a default DateAdapter based on `Temporal` when it is finally approved. Until then, the default adapter is based on native JS `Date` objects.

## 👓 Themes

Schedulely is themed via standard CSS files. Importing `schedulely/dist/index.css` will give access to the base themes, but custom themes are supported via custom CSS files as well.

[See Theme Docs](src/themes/README.md)

## Alternatives

Here are some other libraries that also offer calendar functionality similar to what Schedulely provides. Open-source initiatives are important, so I think it is a good idea to shine a light on one another.

- [react-big-calendar](https://github.com/jquense/react-big-calendar)
  - Month view along with multiple other views
- [kalend](https://github.com/nibdo/kalend)
  - Month view along with multiple other views
- [fullcalendar-react](https://github.com/fullcalendar/fullcalendar-react)
  - Month view along with multiple other views(based on the classic FullCalendar)
