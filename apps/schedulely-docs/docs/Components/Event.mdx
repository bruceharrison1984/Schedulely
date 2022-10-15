---
title: Event Component
---

## Description

The `EventComponent` how events are displayed within Schedulely. The `EventComponent` itself is purely concerned with display, it's overall length is determined
internally based on the start/end of the event. The `hover` effect is also handled internally, so all you need to do is describe what action should be taken if
the event happens to be hovered.

## Component Props

```tsx
export interface EventComponentProps {
  event: InternalCalendarEvent;
  isHovered: boolean;
  onClick: (event: InternalCalendarEvent) => void;
}
```

| Property  | Type                                     | Description                                                             |
| --------- | ---------------------------------------- | ----------------------------------------------------------------------- |
| event     | `InternalCalendarEvent`                  | The event that this component represents                                |
| isHovered | `boolean`                                | True when event is hovered. Default behavior is used to highlight event |
| onClick   | `(event: InternalCalendarEvent) => void` | Function executes when the event is clicked                             |

## Example (DefaultEvent)

```tsx live
// This demo is an example of what a custom component might look like if you wanted to override the default.
// If you are using the default components, you don't need to worry about this.

function DefaultEventDemo(props) {
  const event = {
    id: '1',
    start: new Date(),
    end: new Date(),
    summary: 'This is an event',
    color: 'lightblue',
  };

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

  return (
    <div className="schedulely">
      <DefaultEvent
        event={event}
        isHovered={false}
        onClick={() => alert(JSON.stringify(event, null, 2))}
      />
    </div>
  );
}
```
