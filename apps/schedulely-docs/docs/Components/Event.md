---
title: EventComponent
description: Event Component
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

| Property  | Type                                     | Description                                                                                    |
| --------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------- |
| event     | `InternalCalendarEvent`                  | The object that represents this event                                                          |
| isHovered | `boolean`                                | True when event is hovered. Can be used to control event display when spanning multiple weeks. |
| onClick   | `(event: InternalCalendarEvent) => void` | Function executes when the event is clicked                                                    |

## Example (DefaultEvent)

```tsx live=true
const event = {
  id: '1',
  start: new Date(),
  end: new Date(),
  summary: 'This is an event',
  color: 'lightblue',
};

/** Implement EventComponent */
const DefaultEvent = ({ event, isHovered, onClick }) => (
  <div
    className={`schedulely--event ${
      isHovered ? 'schedulely--event-selected' : 'schedulely--event-unselected'
    }`}
    style={{
      backgroundColor: event.color,
    }}
    title={event.summary}
    onClick={() => onClick(event)}
  >
    {event.summary}
  </div>
);

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
