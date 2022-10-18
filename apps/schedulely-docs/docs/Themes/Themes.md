---
title: 🎨 Themes
description: Implementing custom themes
---

Themes can be applied by passing in the correct theme name to the `theme` property on Schedulely. Additional themes can be easily added by creating a new `*.css` file and importing it where Schedulely is initialized. If you create any nice looking themes, please consider submitting them via PR.

Example Theme:

```css
/* my-theme.css */

/* light theme */
.schedulely[data-theme='my-theme'] {
  --schedulely-current-month-bg-color: rgb(112, 112, 112);
  --schedulely-sibling-month-bg-color: #2b2b2b;
  --schedulely-day-of-week-header-bg-color: white;
  --schedulely-day-of-week-header-text-color: black;
  --schedulely-font-color: black;
}

/* dark variant */
.schedulely[data-theme='my-theme'][data-dark] {
  --schedulely-current-month-bg-color: rgb(112, 112, 112);
  --schedulely-sibling-month-bg-color: #2b2b2b;
  --schedulely-day-of-week-header-bg-color: black;
  --schedulely-day-of-week-header-text-color: white;
  --schedulely-font-color: white;
}
```

```js
import './my-theme.css';

<Schedulely ... theme="my-theme" dark={true} />
```

## Included Themes

Themes can be demoed in the Storybook application by changing the theme prop to one of the following values:

- `default`: typical calendar layout
- `minimal`: minimal theme, similar to google calendar

Both included themes have dark modes available.

## CSS Variables

There are a variety of CSS variables OOTB that should be used in custom components if you wish theming to still work correctly.

| Variable                                     | Description                                                        |
| -------------------------------------------- | ------------------------------------------------------------------ |
| `--schedulely-current-month-bg-color`        | background color of the current month's days                       |
| `--schedulely-sibling-month-bg-color`        | background color of the sibling month's days                       |
| `--schedulely-font-color`                    | font color unless specified by another CSS variable                |
| `--schedulely-grid-gap`                      | gap between the calendar grid elements                             |
| `--schedulely-day-of-week-header-bg-color`   | the background color of the header that lists the days of the week |
| `--schedulely-day-of-week-header-text-color` | the foreground color of the header that lists the days of the week |
| `--schedulely-border-color`                  | color of the border that divides the calendar grid                 |
| `--schedulely-border`                        | how borders within the calendar appear                             |
| `--schedulely-border-radius`                 | exterior border radius of the calendar                             |

## Variable UI Locations

TBD: Screenshot pointing out these variable targets

## CSS Overrides

All styles are delivered through the `schedulely/dist/index.css` file, which should be imported either at the global scope of your React project, or in the individual component where Schedulely is used. Any styles can easily be overridden by creating a copy of this stylesheet, and changing the values you would like to change.
