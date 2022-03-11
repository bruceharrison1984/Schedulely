# Date Convertors

There is an abundance of DateTime libraries available in the React ecosystem. Rathen than force another one on to an existing project, we provide a common interface so _any_ date/time library can be adapted to Calendo. This prevents users of this library from being forced to include additional DateTime libraries. It also allows us to keep the overall Calendo package size down since we don't need to include this code.

New convertors can be easily added by using the `DateConvertor` interface as a model for behavior.

## Included Convertors

There are some convertors already included.

_If you create one, please consider submitting it as a PR for this library! You can easily add your convertor to existing unit tests without needing to rewrite them._

### Date-Fns

After importing all the necessary functions, they can all be directly passed to `createDateFnsConvertor`

```js
import { Calendo } from './Calendo';
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
  <Calendo
    dateConvertor={createDateFnsConvertor({
      addDays,
      eachDayOfInterval,
      eachWeekOfInterval,
      format,
      startOfMonth,
      startOfWeek,
      addMonths,
    })}
  ></Calendo>
...

```
