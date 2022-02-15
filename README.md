# React NextMonth

![Large Calendar Preview](/assets/large_preview.png)

---

- ## 🤏 Extremely small package size
- ## 📱 Entire design is based on CSS-grid, so it is fully responsive (and fast!)
- ## 🔩 Easy to override default components (you're expected to)

[**Storybook Demo**](https://bruceharrison1984.github.io/NextMonth/?path=/story/nextmonth--datefns)

A light-weight, highly customizable Month calendar for React-based applications. The primary focus of NextMonth is to just display a CSS-based month calendar with events.

The ultimate goal for this library was to create a blank canvas that allowed for users to create their own calendar and components for use in the grid system. This allows for users to easily add additional functionality without bloating the base library with features not everyone may want.

## Custom Components

The default components contain very little behavior outside of simply being displayed. Implementing things such as `onClick` handlers or selection is entirely up to the end user. While the Default components can be restyled, the approach _we recommend is creating custom components for the display and actions that your project requires_.

All default components have interfaces available, and custom components can be passed in via the `nextMonthComponents` property.

## DateTime Libraries

[See DateConvertor Docs](src/dateConvertors/readme.md)

NextMonth doesn't force a particular DateTime library on you. By implementing the `DateConvertor` interface, you can pass in whatever DateTime implementation that you want. This helps us keep the package size very small, and not force consumers to have to marshall DateTime objects between libraries within their own projects.

The long term plan is to implement a default DateConvertor based on `Temporal` when it is finally approved. Until then, you are required to bring-your-own-date-lib.

## TODO

- Internationalization?
- Limit display events to visible area
  - add `additional event` indicator for days when events exceed the display size
- Provde default DateTime implementaion with `Temporal` once approved

## Bugs

- Events that span multiple weeks will only highlight a single segment
