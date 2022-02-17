import { DateConvertor, DisplaySize } from 'src';

export const createDefaultConvertor = (): DateConvertor => {
  /** Get full names of all days of the week */
  const getDaysOfWeek = (displaySize?: DisplaySize) => {
    const formatter = new Intl.DateTimeFormat('en', { weekday: 'long' });
    const days = [];
    for (let index = 0; index < 7; index++) {
      days.push(formatter.format(index));
    }
    return days;
  };

  return { getDaysOfWeek };
};
