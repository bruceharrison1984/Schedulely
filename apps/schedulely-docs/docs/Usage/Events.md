---
title: Events
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

## Custom Event Metadata

[See the Custom Event Data Page](/docs/Usage/CustomEventData).
