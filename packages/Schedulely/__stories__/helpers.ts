import { CalendarEvent } from '@/types';
import chance from 'chance';

const chanceSeed = chance(1);

const generateEvents = (
  numberOfEvents = 100,
  minLength = 0,
  maxLength = 15,
  idOffset = 0
) => {
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
        animal: chance().animal(),
        address: chance().address(),
      },
    });
  }
  return events;
};

export const storyEvents = [
  ...generateEvents(100),
  ...generateEvents(100, 0, 1, 100),
  {
    color: '#4b578a',
    end: '2022-09-09T16:07:22.292Z',
    id: 'f147',
    start: '2022-09-08T16:07:22.292Z',
    summary: 'Craig Bishop',
  },
  {
    color: '#4b578a',
    end: '2022-09-09T16:07:22.292Z',
    id: 'a147',
    start: '2022-09-08T16:07:22.292Z',
    summary: 'Craig Bishop',
  },
  {
    color: '#4b578a',
    end: '2022-09-09T16:07:22.292Z',
    id: 'b147',
    start: '2022-09-08T16:07:22.292Z',
    summary: 'Craig Bishop',
  },
  {
    color: '#4b578a',
    end: '2022-09-09T16:07:22.292Z',
    id: 'c147',
    start: '2022-09-08T16:07:22.292Z',
    summary: 'Craig Bishop',
  },
  {
    color: '#4b578a',
    end: '2022-09-09T16:07:22.292Z',
    id: 'd147',
    start: '2022-09-08T16:07:22.292Z',
    summary: 'Craig Bishop',
  },
  {
    color: '#4b578a',
    end: '2022-09-09T16:07:22.292Z',
    id: 'e147',
    start: '2022-09-08T16:07:22.292Z',
    summary: 'Craig Bishop',
  },
];
