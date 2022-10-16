---
title: Day Component
---

## Description

The `DayComponent` is used to display individual days on the calendar grid. Various properties are used to control the color, indicators, and text of the calendar day.

## Component Props

```tsx
export interface DayComponentProps {
  isCurrentMonth: boolean;
  dateNumber: number;
  isToday: boolean;
  isOverflowed: boolean;
  events: InternalCalendarEvent[];
  onClick: (event: InternalCalendarEvent[]) => void;
}
```

| Property       | Type                      | Description                                                                     |
| -------------- | ------------------------- | ------------------------------------------------------------------------------- |
| isCurrentMonth | `boolean`                 | True if this date occurs in the current visible month                           |
| isToday        | `boolean`                 | True is this date is equal to today's date                                      |
| dateNumber     | `number`                  | The numeric date of the day                                                     |
| events         | `InternalCalendarEvent[]` | Array of all events that occur or span this date                                |
| isOverflowed   | `boolean`                 | True if the date has more events than can visible fit. (Some events are hidden) |

## Example (DefaultDay)

```tsx live noInline
// This demo is an example of what a custom component might look like if you wanted to override the default.
// If you are using the default components, you don't need to worry about this.

const DefaultDay = ({
  isCurrentMonth,
  isToday,
  dateNumber,
  events,
  isOverflowed,
  onClick,
}) => {
  const dayHeader = isToday ? (
    <div className="default-day-header--indicator">
      <span className="default-day-header--text">{dateNumber}</span>
    </div>
  ) : (
    <span className="default-day-header--text">{dateNumber}</span>
  );

  const hiddenEventTooltip =
    events.length > 1 ? `(${events.length}) hidden events` : '(1) hidden event';

  return (
    <div
      className={`default-day ${
        isCurrentMonth ? 'default-day-current' : 'default-day-sibling'
      }`}
    >
      <div className="default-day-header">{dayHeader}</div>
      {isOverflowed && (
        <div
          className="additional-events-indicator"
          title={hiddenEventTooltip}
          onClick={() => onClick(events)}
        >
          ...
        </div>
      )}
    </div>
  );
};

const events = [...generateEvents(2)];

render(
  <div className="schedulely" style={{ height: '7em', width: '7em' }}>
    <DefaultDay
      isCurrentMonth={true}
      isToday={true}
      dateNumber={21}
      events={events}
      isOverflowed={true}
      onClick={() => alert(JSON.stringify(events))}
    />
  </div>
);
```
