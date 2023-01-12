---
title: Actions
description: Functions used for interacting with Schedulely
---

While Schedulely expects developers to implement their own components to achieve their desired goals, we have provided clear interfaces for how actions should be handled.
The ActionProvider is used under the hood to take in functions as arguments and pass them in to the calendar components. This makes state management within
Schedulely simple, and ensures we are re-rendering the bare minimum. If you are creating custom calendar components, these actions are available to you on each components
respective interface, and can be implemented(or not implemented) however you choose.

**All actions return `() => null` unless explicitly overridden.**

## Provided Actions

By default, the actions will print their target Events in to the javascript console.

| Action             | Signature                                         | Description                                                                    |
| ------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------ |
| onEventClick       | `(event: InternalCalendarEvent) => void`          | This function runs any time an individual event is clicked                     |
| onMoreEventsClick  | `(event: InternalCalendarEvent[]) => void`        | This function should be called whenever the 'More Events' indicator is clicked |
| onDayClick         | `(day: Date) => void`                             | This function should be called whenever a Day Component is clicked on          |
| onMonthChangeClick | `(firstOfMonth: Date, lastOfMonth: Date) => void` | This function is called whenever the month is changed                          |

## Default Actions

The default behavior will just print Event information to the javascript console. This behavior is intended to be overridden.

```tsx live noInline
// This demo is an example of what a custom component might look like if you wanted to override the default.
// If you are using the default components, you don't need to worry about this.

const events = [...generateEvents(100), ...generateEvents(100, 0, 1, 100)];

render(
  <Schedulely events={events} dark={localStorage.getItem('theme') === 'dark'} />
);
```

## Setting Custom Actions

Action behavior can be easily set by passing in a function for the desired action when initializing Schedulely.

This simple example replaces the default `console.log` action action with `alert`.

```tsx live noInline
/* array of CalendarEvents */
const events = [...generateEvents(100), ...generateEvents(100, 0, 1, 100)];

render(
  <Schedulely
    events={events}
    dark={localStorage.getItem('theme') === 'dark'}
    actions={{
      onEventClick: (event) => alert(JSON.stringify(event)),
      onMoreEventClick: (events) => alert(JSON.stringify(events)),
    }}
  />
);
```

This principal could easily be expanded upon to display an information modal with more details about that particular event. We leave this implementation up to you.

## Disabling Actions

If you have no need for custom actions(or otherwise), the default `console.log` actions can easily be disabled by having them simply return `null`.

```tsx live noInline
/* array of CalendarEvents */
const events = [...generateEvents(100), ...generateEvents(100, 0, 1, 100)];

render(
  <Schedulely
    events={events}
    dark={localStorage.getItem('theme') === 'dark'}
    actions={{
      onEventClick: (event) => null,
      onMoreEventClick: (events) => null,
    }}
  />
);
```

## Custom Components and Actions

When creating custom components, you are not required to use the ActionProvider interface to deal with behavior though you should if possible. If you choose to bypass the
ActionProvider (ie don't use functions passed in through the interfaces), make sure you remember to memoize them to prevent unnecessary rerenders.
