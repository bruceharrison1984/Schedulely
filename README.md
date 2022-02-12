## React NextMonth

A light-weight, highly customizable Month calendar for React-based applications. The primary focus of NextMonth is to just display a CSS-based month calendar with events.

- Care has been taken to keep package size down, since many other react-based calendar libraries are extremely heavy.
  - In large part this is because this library only deals with displaying a month calendar, and doesn't focus on agendas, single weeks, etc
- Customization is a first-class concern, with NextMonth bordering more closely with a design system rather than an OOTB component

The ultimate goal for this library was to create a system that allowed for users to create their own calendar components for use in the pre-existing grid system. This allows for users to easily add additional functionality without bloating the base library with features not everyone may want. Additional calendar styles and components can easily be created by using
this library as a base.

## Custom Components

The default components contain very little behavior outside of simply being displayed. Implementing things such as `onClick` handlers or selection is entirely up to the end user. While the Default components can be restyled, the approach _we recommend is creating custom components for the display and actions that your project requires_.

## TODO

- Internationalization?
- Limit display events to visible area
  - add `additional event` indicator for days when events exceed the display size
- Provde default DateTime implementaion with `Temporal` once approved

## Bugs

- Events that span multiple weeks will only highlight a single segment
