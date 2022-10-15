---
title: Header Component
---

## Description

The `HeaderComponent` defines how the large banner at the top of the calendar appears. It can include as many or
as few controls as you want.

## Component Props

```tsx
export interface HeaderProps {
  month: string;
  year: number;
  isCurrentMonth: boolean;
  onNextMonth: () => void;
  onNextYear: () => void;
  onPrevMonth: () => void;
  onPrevYear: () => void;
}
```

| Property       | Type         | Description                                                         |
| -------------- | ------------ | ------------------------------------------------------------------- |
| month          | `string`     | The current month the calendar is displaying                        |
| year           | `number`     | The current year the calendar is displaying                         |
| isCurrentMonth | `boolean`    | True if the selected month is the same as the current month         |
| onNextMonth    | `() => void` | Calling this functions moves to the next month                      |
| onNextYear     | `() => void` | Calling this functions moves to the same month of the next year     |
| onPrevMonth    | `() => void` | Calling this functions moves to the previous month                  |
| onPrevYear     | `() => void` | Calling this functions moves to the same month of the previous year |

## Example (DefaultHeader)

```tsx live
// This demo is an example of what a custom component might look like if you wanted to override the default.
// If you are using the default components, you don't need to worry about this.

function DefaultHeaderDemo(props) {
  const DefaultHeader = ({
    month,
    year,
    onNextMonth,
    onNextYear,
    onPrevMonth,
    onPrevYear,
    isCurrentMonth,
  }) => (
    <div className="header-layout">
      <button
        className="header-button"
        title="Previous Month"
        onClick={onPrevMonth}
      >
        <strong>{'‹'}</strong>
      </button>
      <button
        className="header-button"
        title="Previous Year"
        onClick={onPrevYear}
      >
        <strong>{'«'}</strong>
      </button>

      <div className="header-banner">
        <span className="header-text">
          {month} - {year}
        </span>
        {isCurrentMonth && (
          <div className="current-month-indicator" title="Current Month" />
        )}
      </div>

      <button className="header-button" title="Next Year" onClick={onNextYear}>
        <strong>{'»'}</strong>
      </button>
      <button
        className="header-button"
        title="Next Month"
        onClick={onNextMonth}
      >
        <strong>{'›'}</strong>
      </button>
    </div>
  );

  return (
    <div className="schedulely">
      <DefaultHeader month="December" year="2022" />
    </div>
  );
}
```
