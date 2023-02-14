---
title: Custom Event Data
description: Supply additional event metadata
---

If you want to pass additional data to each event object, you can define the `data` property by supplying the generic parameter of `CalendarEvent`. This can be useful if you create custom Day or Event components.

**The default Day/Event components will not display the custom data, though it _will_ be available through `onClick` handlers.**

```tsx
// custom `data` prop type
type MyCustomData = { customProp1: boolean };

// event data
const storyEvents: CalendarEvent<MyCustomData>[] = [
  {
    color: '#4b578a',
    end: '2022-09-09T16:07:22.292Z',
    id: 'f147',
    start: '2022-09-08T16:07:22.292Z',
    summary: 'Craig Bishop',
    data: {
      customProp1: true,
    },
  },
];

/**
 * This is a custom event component that has a strongly-typed `data` prop.
 * It will print the customProp value to the console
 */
export const CustomEvent: EventComponent<MyCustomData> = ({
  event,
  isHovered,
  onClick,
}) => {
  const classes = ['event'];
  if (isHovered) classes.push('event-selected');

  console.log(event.data?.customProp); // <-- props are strongly typed

  return (
    <div
      role={'listitem'}
      data-eventid={event.id}
      className={classes.join(' ')}
      style={{
        backgroundColor: event.color,
      }}
      title={event.summary}
      onClick={() => onClick(event)}
    >
      <div className="event-text-container">{event.summary}</div>
    </div>
  );
};

// include schedulely with the event data and the Event component over-ridden
<Schedulely
  events={storyEvents}
  dark={colorMode === 'dark'}
  theme={theme}
  schedulelyComponents={{ eventComponent: CustomEvent }}
/>;
```

This can be particularly useful when creating custom Event and Day components that makes use of this custom data. Both Day/Event components
provide a generic interface that can be used when defining them so type-safety is guaranteed.
