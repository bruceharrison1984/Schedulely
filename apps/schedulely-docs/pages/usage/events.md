---
title: Event Data
description: Event model and usage
---

| Property | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| id       | `string` | Unique ID of this event                                                                                    |
| start    | `string` | JS ISO Formatted that represents the start of the event                                                    |
| end      | `string` | JS ISO Formatted that represents the end of the event                                                      |
| summary  | `string` | String value that will appear in the default event component                                               |
| color    | `string` | Color value that determines the color of the default event component. Can be any valid CSS color value.    |
| data     | `object` | Arbitrary event data that you want passed to the Event and Day components. Not used by default components. |

## Default Event Type

An array of `CalendarEvent` items is supplied to Schedulely within your React application. The standard event type is used by the default Scheduely Event and Day components.

```tsx
const storyEvents: CalendarEvent[] = [
  {
    color: '#4b578a',
    end: '2022-09-09T16:07:22.292Z',
    id: 'f147',
    start: '2022-09-08T16:07:22.292Z',
    summary: 'Craig Bishop',
  },
];

<Schedulely events={storyEvents} dark={colorMode === 'dark'} theme={theme} />;
```

## Internal Implementation

Once you pass in your array of events, it is transformed into an `InternalCalendarEvent`. This allows us to make consistent transformations from input string dates to `Date`-types, as well as perform any validations all at once. If you require additional metadata for your events, you will need to utilize [Custom Event Data](/docs/Usage/CustomEventData), and possibly create custom Day/Event components depending on your intended usage.

**Any additional Event properties passed in that are not listed in the `CalendarEvent` type will be discarded and will not reach the Day/Event components.**

## Custom Event Metadata

[See the Custom Event Data Page](/docs/Usage/CustomEventData).
