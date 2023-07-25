# Event Component

## Description

The `EventComponent` how events are displayed within Schedulely. The `EventComponent` itself is purely concerned with display, it's overall length is determined
internally based on the start/end of the event. The `hover` effect is also handled internally, so all you need to do is describe what action should be taken if
the event happens to be hovered.

## Example (DefaultEvent)

```tsx
// This demo is an example of what a custom component might look like if you wanted to override the default.
// If you are using the default components, you don't need to worry about this.

const DefaultEvent = ({ event, isHovered, onClick }) => {
  const classes = ['event'];
  if (isHovered) classes.push('event-selected');

  return (
    <div
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

const event = {
  id: '1',
  start: new Date(),
  end: new Date(),
  summary: 'This is an event',
  color: 'lightblue',
  data: {
    extraProp1: 1,
    extraProp2: 'some-more-data',
  },
};

render(
  <div className="schedulely">
    <DefaultEvent
      event={event}
      isHovered={false}
      onClick={() => alert(JSON.stringify(event, null, 2))}
    />
  </div>
);
```

## Custom Event Component

The `EventComponent` also has an optional generic parameter that can be used to enforce strong-typing of the `data` property. This can be leveraged if writing
your own custom EventComponent.

More information can be found on the [Custom Event Data Page](/usage/event-data/custom-event-data).

### Extra Event Data

Additional data can be passed in by utilizing the `data` property on the `CalendarEvent` type.
If using Typescript, you can passing the generic parameter to get strong-typing in your components. This isn't strictly necessary, but it is helpful if you are
creating a custom Event component.

## Component Props

```tsx
export interface EventComponentProps<T extends object = {}> {
  event: InternalCalendarEvent<T>;
  isHovered: boolean;
  onClick: (event: InternalCalendarEvent<T>) => void;
}
```

| Property  | Type                                        | Description                                                             |
| --------- | ------------------------------------------- | ----------------------------------------------------------------------- |
| event     | `InternalCalendarEvent<T>`                  | The event that this component represents                                |
| isHovered | `boolean`                                   | True when event is hovered. Default behavior is used to highlight event |
| onClick   | `(event: InternalCalendarEvent<T>) => void` | Function executes when the event is clicked                             |
