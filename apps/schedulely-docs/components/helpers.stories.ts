import { CalendarEvent } from 'schedulely';
import chance from 'chance';

export const generateEvents = (
  numberOfEvents = 100,
  minLength = 0,
  maxLength = 15,
  idOffset = 0
) => {
  const chanceSeed = chance(1);

  const events: CalendarEvent[] = [];
  const today = new Date();
  for (let index = 0; index < numberOfEvents; index++) {
    const id = (index + idOffset).toString();
    const start = new Date(
      chanceSeed.integer({
        min: today.getFullYear() - 1,
        max: today.getFullYear() + 1,
      }),
      chanceSeed.integer({ min: 0, max: 11 }),
      chanceSeed.integer({ min: 1, max: 30 })
    );
    const end = new Date(start);
    end.setDate(
      start.getDate() + chanceSeed.integer({ min: minLength, max: maxLength })
    );

    const summary = chanceSeed.name();
    const color = chanceSeed.color({ format: 'hex' });
    events.push({
      id,
      start: start.toISOString(),
      end: end.toISOString(),
      summary,
      color,
      data: {
        randomAnimal: chance().animal(),
        randomAddress: chance().address(),
      },
    });
  }
  return events;
};

export const storyEvents = [
  ...generateEvents(100),
  ...generateEvents(100, 0, 1, 100),
];
