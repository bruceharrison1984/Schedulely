# Date Convertors

There is an abundance of DateTime libraries available in the React ecosystem. Rathen than force another one on to an existing project, we provide a common interface so _any_ date/time library can be adapted to NextMonth. This prevents users of this library from being forced to include additional DateTime libraries. It also allows us to keep the overall NextMonth package size down since we don't need to include this code.

New convertors can be easily added by using the `DateConvertor` interface as a model for behavior.

## Included Convertors

There are some convertors already included. If you create one, please consider submitting it as a PR for this library!

### Date-Fns

After importing all the necessary functions, they can all be directly passed to `createDateFnsConvertor`

```js
import { NextMonth } from './NextMonth';
import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  startOfMonth,
  startOfWeek,
  addMonths,
} from 'date-fns';
import { createDateFnsConvertor } from './dateConvertors/dateFns';
...
  <NextMonth
    dateConvertor={createDateFnsConvertor({
      addDays,
      eachDayOfInterval,
      eachWeekOfInterval,
      format,
      startOfMonth,
      startOfWeek,
      addMonths,
    })}
  ></NextMonth>
...

```
