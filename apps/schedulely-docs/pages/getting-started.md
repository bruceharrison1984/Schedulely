# Getting Started

The fastest way to get started using Schedulely is to just add the NPM package to your React project, and create an instance of Schedulely.

## 📦 Installation

```shell
npm install schedulely
## or
yarn install schedulely
```

## 🔨 Basic Usage

This example initializes the calendar with default components, using the included NativeJS DateAdapter as the date library.
The default theme uses the `Roboto` font, so it should be loaded prior to initializing `Schedulely`.

```html
<!-- HEAD (for custom font) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
  rel="stylesheet"
/>
```

You also need to import the default stylesheet, it will _not_ be loaded automatically.

```tsx
// global import or in the component where Schedulely will be displayed
import 'schedulely/dist/index.css';
```

```tsx,live
/* demo array of CalendarEvents */
const events = [...generateEvents(100), ...generateEvents(100, 0, 1, 100)];

render(
  <Schedulely dark={localStorage.getItem('theme') === 'dark'} events={events} />
);
```

## Component Props

```tsx
export interface SchedulelyProps {
  dateAdapter?: DateTimeAdapter;
  schedulelyComponents?: Partial<SchedulelyComponents>;
  events: CalendarEvent[];
  additionalClassNames?: string[];
  theme?: string;
  actions?: Partial<ActionState>;
  initialDate?: string;
}
```

| Property             | Type                             | Description                                                                      |
| -------------------- | -------------------------------- | -------------------------------------------------------------------------------- |
| dateAdapter          | `DateTimeAdapter?`               | Override the default Date/date-fns adapter with a custom implementation          |
| schedulelyComponents | `Partial<SchedulelyComponents>?` | Override individual components with custom ones                                  |
| events               | `CalendarEvent[]`                | List of events that will be displayed                                            |
| additionalClassNames | `string[]?`                      | Any additional class names you want applied to the root element                  |
| theme                | `string?`                        | Name of theme to apply to Schedulely                                             |
| actions              | `Partial<ActionState>?`          | Override component actions                                                       |
| initialDate          | `string?`                        | Schedulely will start on the current month, unless overridden with this property |