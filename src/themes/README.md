# Theming

Themes can be applied by passing in the correct theme name to the `theme` property on Schedulely. Additional themes can be easily added by creating a new `*.css` file and importing it where Schedulely is initialized. If you create any nice looking themes, please consider submitting them via PR.

Example Theme:

```css
/* my-theme.css */

.schedulely[data-theme='dark'] {
  --schedulely-current-month-bg-color: rgb(112, 112, 112);
  --schedulely-sibling-month-bg-color: #2b2b2b;
  --schedulely-day-of-week-header-bg-color: white;
  --schedulely-day-of-week-header-text-color: black;
  --schedulely-font-color: white;
  --schedulely-border-color: white;
}
```

```js
import './my-theme.css';

<Schedulely ... theme="dark" />
```

## Dark Mode

Dark mode is supported by setting the `theme` attribute to `dark` on the main schedulely component. Note that the CSS names must correctly line up in order for dark-mode to function. The Dark theme can easily be overwritten with your own styles if you prefer.

## Included Themes

Themes can be demoed in the Storybook application by changing the theme prop to one of the following values:

- light _(default)_
- dark
- minimal

## CSS Variables

There are a variety of CSS variables OOTB that should be used in custom components if you wish theming to still work correctly.

- `--schedulely-current-month-bg-color`: background color of the current month's days
- `--schedulely-sibling-month-bg-color`: background color of the sibling month's days
- `--schedulely-font-color`: default font color for most elements;
- `--schedulely-grid-gap`: gap between the calendar grid elements
- `--schedulely-day-of-week-header-bg-color`: the background color of the header that lists the days of the week
- `--schedulely-day-of-week-header-text-color`: the foregound color of the header that lists the days of the week
- `--schedulely-day-height`: how tall should calendar days appear
- `--schedulely-border-color`: color of the border that divides the calendar grid

TBD: Screenshot pointing out these variable targets

## CSS Overrides

All styles are delivered through the `Schedulely.css` file, which should be imported either at the global scope of your React project, or in the individual component where Schedulely is used. Any styles can easily be overridden by creating a copy of this stylesheet, and changing the values you would like to change.
