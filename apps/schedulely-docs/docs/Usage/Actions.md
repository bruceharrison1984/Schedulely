---
title: 🎬 Actions
description: Functions used for interacting with Schedulely
---

While Schedulely expects developers to implement their own components to achieve their desired goals, we have provided clear interfaces for how actions should be handled.
The ActionProvider is used under the hood to take in functions as arguments, memoize them, and pass them in to the calendar components. This makes state management within
Schedulely simple, and ensures we are re-rendering the bare minimum.

## Provided Actions

By default, the actions will print their target Events in to the javascript console.

| Action           | Signature                                | Description                                                       |
| ---------------- | ---------------------------------------- | ----------------------------------------------------------------- |
| onEventClick     | (event: InternalCalendarEvent) => void   | This function runs any time an individual event is clicked        |
| onMoreEventClick | (event: InternalCalendarEvent[]) => void | The function runs whenever the 'More Events' indicator is clicked |

## Default Actions

The default behavior will just print Event information to the javascript console. This behavior is intended to be overridden.

```tsx live=true
/* array of CalendarEvents */
const events = [...generateEvents(100), ...generateEvents(100, 0, 1, 100)];

render(<Schedulely events={events} />);
```

## Setting Custom Actions

Action behavior can be easily set by passing in a function for the desired action when initializing Schedulely.

This simple example replaces the default `console.log` action action with `alert`.

```tsx live=true
/* array of CalendarEvents */
const events = [...generateEvents(100), ...generateEvents(100, 0, 1, 100)];

render(
  <Schedulely
    events={events}
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

```tsx live=true
/* array of CalendarEvents */
const events = [...generateEvents(100), ...generateEvents(100, 0, 1, 100)];

render(
  <Schedulely
    events={events}
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
