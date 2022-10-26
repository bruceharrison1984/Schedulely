import { BreakpointProvider } from '@/providers';
import { CalendarContextState, ComponentSize } from '@/types';
import { DayOfWeekLayout } from '@/layouts';
import { RenderResult, render } from '@testing-library/react';
import { createDefaultAdapter } from '@/dateAdapters';
import { useCalendar } from '../../src/hooks/useCalendar';
import React from 'react';

describe('EventWeekLayout', () => {
  it('skip', () => {
    expect(true).toBe(true);
  });
  // describe('getGridEndIndex', () => {
  //   it.each<{ eventEnd: Date; endOfWeek: Date; expected: number }>([
  //     {
  //       eventEnd: new Date(2022, 1, 11),
  //       endOfWeek: new Date(2022, 1, 12),
  //       expected: 7,
  //     },
  //     {
  //       // event ends after end of week
  //       eventEnd: new Date(2022, 1, 13),
  //       endOfWeek: new Date(2022, 1, 12),
  //       expected: 8,
  //     },
  //     {
  //       eventEnd: new Date(2022, 1, 9),
  //       endOfWeek: new Date(2022, 1, 12),
  //       expected: 5,
  //     },
  //     {
  //       // event ends on Sunday
  //       eventEnd: new Date(2021, 8, 26),
  //       endOfWeek: new Date(2021, 9, 2),
  //       expected: 2,
  //     },
  //     {
  //       // event that starts and ends on Sunday
  //       eventEnd: new Date(2022, 0, 2),
  //       endOfWeek: new Date(2022, 0, 8),
  //       expected: 2,
  //     },
  //   ])(
  //     '$eventEnd with $endOfWeek returns $expected',
  //     ({ eventEnd, endOfWeek, expected }) => {
  //       const result = adapter.getGridEndIndex(eventEnd, endOfWeek);
  //       expect(result).toBe(expected);
  //     }
  //   );
  // });
  // describe('getGridStartIndex', () => {
  //   it.each<{ eventStart: Date; startOfWeek: Date; expected: number }>([
  //     {
  //       eventStart: new Date(2022, 1, 7),
  //       startOfWeek: new Date(2022, 1, 6),
  //       expected: 2,
  //     },
  //     {
  //       eventStart: new Date(2022, 1, 9),
  //       startOfWeek: new Date(2022, 1, 6),
  //       expected: 4,
  //     },
  //     {
  //       eventStart: new Date(2022, 3, 10),
  //       startOfWeek: new Date(2022, 3, 10),
  //       expected: 1,
  //     },
  //     {
  //       // event that starts and ends on Sunday
  //       eventStart: new Date(2022, 0, 2),
  //       startOfWeek: new Date(2022, 0, 2),
  //       expected: 1,
  //     },
  //   ])(
  //     '$eventStart with $startOfWeek returns $expected',
  //     ({ eventStart, startOfWeek, expected }) => {
  //       const result = adapter.getGridStartIndex(eventStart, startOfWeek);
  //       expect(result).toBe(expected);
  //     }
  //   );
  // });
});
