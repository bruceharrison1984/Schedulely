# Day Component

## Description

The `DayComponent` is used to display individual days on the calendar grid. Various properties are used to control the color, indicators, and text of the calendar day.

## Component Props

```tsx
export interface DayComponentProps<T extends object = {}> {
  isCurrentMonth: boolean;
  date: Date;
  isToday: boolean;
  isOverflowed: boolean;
  events: InternalCalendarEvent<T>[];
  onMoreEventsClick: (event: InternalCalendarEvent<T>[]) => void;
  onDayClick: (day: Date) => void;
}
```

| Property          | Type                                          | Description                                                                     |
| ----------------- | --------------------------------------------- | ------------------------------------------------------------------------------- |
| isCurrentMonth    | `boolean`                                     | True if this date occurs in the current visible month                           |
| isToday           | `boolean`                                     | True is this date is equal to today's date                                      |
| date              | `Date`                                        | JS Date object for the day                                                      |
| events            | `InternalCalendarEvent<T>[]`                  | Array of _all_ events that occur or span this date (both hidden and visible)    |
| isOverflowed      | `boolean`                                     | True if the date has more events than can visible fit. (Some events are hidden) |
| onMoreEventsClick | `(event: InternalCalendarEvent<T>[]) => void` | This function should be called whenever the 'More Events' indicator is clicked  |
| onDayClick        | `(day: Date) => void`                         | This function should be called whenever a Day Component is clicked on           |

## Dealing with hidden events

Once one or more events overflow the DayComponent container, `isOverflowed` will be set to true and the UI updated to show the additional events indicator, presuming you are using the default Day component.

Once events overflow the day container, they will also begin being hidden. All events are contained within the `events` array, with the `visible` property indicating the visibility of each event on that day.

## Example (DefaultDay)

```tsx,live
// This demo is an example of what a custom component might look like if you wanted to override the default.
// If you are using the default components, you don't need to worry about this.

const DefaultDay = ({
  isCurrentMonth,
  isToday,
  date,
  events,
  isOverflowed,
  onMoreEventsClick,
  onDayClick,
}) => {
  const dayHeader = isToday ? (
    <div className="default-day-header--indicator">
      <span className="default-day-header--text">{date.getDate()}</span>
    </div>
  ) : (
    <span className="default-day-header--text">{date.getDate()}</span>
  );

  const hiddenEventTooltip =
    events.length > 1 ? `(${events.length}) hidden events` : '(1) hidden event';

  return (
    <div
      className={`default-day ${
        isCurrentMonth ? 'default-day-current' : 'default-day-sibling'
      }`}
      onClick={() => onDayClick(JSON.stringify(date))}
    >
      <div className="default-day-header">{dayHeader}</div>
      {isOverflowed && (
        <div
          className="additional-events-indicator"
          title={hiddenEventTooltip}
          onClick={() => onMoreEventsClick(JSON.stringify(events, null, 2))}
        >
          ...
        </div>
      )}
    </div>
  );
};

// simulate fetching events from somewhere
const events = [
  ...generateEvents(2),
  {
    id: '1',
    start: new Date(),
    end: new Date(),
    summary: 'This is an event',
    color: 'lightblue',
    data: {
      extraProp1: 1,
      extraProp2: 'some-more-data',
    },
  },
];

render(
  <div className="schedulely" style={{ height: '7em', width: '7em' }}>
    <DefaultDay
      isCurrentMonth={true}
      isToday={true}
      date={new Date()}
      events={events}
      isOverflowed={true}
      onMoreEventsClick={alert}
      onDayClick={alert}
    />
  </div>
);
```

## Custom Day Component

The `DayComponent` also has an optional generic parameter that can be used to enfore strong-typing of the `data` property. This can be leveraged if writing
your own custom DayComponent.

More information can be found on the [Custom Event Data Page](/docs/Usage/CustomEventData).
