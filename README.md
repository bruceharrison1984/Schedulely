# React NextMonth

### Prerelease

_This component is still very early in development. An npm package will be made available once it has reached a suitable level of functionality. Everything is currently still subject to massive change (including the project name), so use at your own risk!_

![Large Calendar Preview](/assets/large_preview.png)
[**Storybook Demo**](https://bruceharrison1984.github.io/NextMonth)

---

## Description

- 🤏 Extremely small package size
- 📱 Entire design is based on CSS-grid, so it is fully responsive and fast!
- 🔩 Easy to override default components to add behavior... and you should!

A light-weight, highly customizable Month calendar for React-based applications. The primary focus of NextMonth is to just display a CSS-grid based month calendar with events.

The ultimate goal for this library was to create a blank canvas that allowed for users to create their own calendar and components for use in the grid system. This allows for users to easily add additional functionality without bloating the base library with features not everyone may want.

The included default calendar components can be simply used as is, but the real power is being able to easily override these components. This allows consumers to use any state-management, styles, UX, or _whatever_ without needing them included in this library, and without interfering with it's behavior.

## Custom Components

The default components contain very little behavior outside of simply being displayed. Implementing things such as `onClick` handlers or selection is entirely up to the end user. While the Default components can be restyled, the approach _we recommend is creating custom components for the display and actions that your project requires_.

The default components aren't really extensible. For example, the default event component onClick handler just prints the event data in to the console. As a consumer, you would extend the `EventComponent` interface to implement your own Event component that has the behavior you require.

All default components have interfaces available, and custom components can be passed in via the `nextMonthComponents` property.

Care should be taken when styling custom components. The underlying calendar layout is flexible, but it can still be easily broken.

## DateTime Libraries

[See DateAdapter Docs](src/dateAdapters/readme.md)

NextMonth doesn't force a particular DateTime library on you. By implementing the `DateAdapter` interface, you can pass in whatever DateTime implementation that you want. This helps us keep the package size very small, and not force consumers to have to marshall DateTime objects between libraries within their own projects.

_By default, the calendar will use the NativeJs DateAdapter for dealing with dates._

The long term plan is to implement a default DateAdapter based on `Temporal` when it is finally approved. Until then, you are required to bring-your-own-date-lib.

## SCSS Overrides

TBD

## Basic Usage

This example initializes the calendar with default components, using date-fns as the date library.

```js
import { NextMonth } from './NextMonth';
import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  startOfMonth,
  startOfWeek,
  addMonths,
  isSameWeek,
} from 'date-fns';
import { createDateFnsConvertor } from './dateAdapters/dateFns';
...
  export const MyApp = () => {
    const convertor = createDateFnsConvertor(
        addDays,
        eachDayOfInterval,
        eachWeekOfInterval,
        format,
        startOfMonth,
        startOfWeek,
        addMonths,
        isSameWeek
      );

    const events = [
      {
        id: '1',
        start: new Date(2022, 1, 7),
        end: new Date(2022, 1, 11),
        summary: 'EVENT 2022-2-7 -> 2022-2-11',
        color: 'lightblue',
      },
      {
        id: '3',
        start: new Date(2022, 1, 11),
        end: new Date(2022, 1, 12),
        summary: 'EVENT 2 2022-2-11 -> 2022-2-12',
        color: 'cyan',
      },
    ];

    return (<NextMonth events={events} dateAdapter={convertor} />);
  }
```
