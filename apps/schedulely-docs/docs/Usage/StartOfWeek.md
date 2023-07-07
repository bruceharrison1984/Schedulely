---
title: Start Of Week
description: Control what day of the week Schedulely starts on
---

Schedulely provides an easy way to change the day that calendar starts on.

## Usage

You will need to manually pass in the `createDefaultAdapter` to the `dateAdapter` property.

```tsx
import { Schedulely, WeekDay, createDefaultAdapter } from 'schedulely';

<Schedulely dateAdapter={createDefaultAdapter('en', Weekday.Monday)} />;
```

The calendar is setup to try it's best to wrap the trailing/leading days evenly on the top and bottom respectively. However, the top takes priority for the current month and if the month starts of the selected start of the week, you will not see trailing days from the previous month.

## Warning

It is very likely the API for changing the start of week will be changed in the future to be a bit cleaner.
