import { Chance } from 'chance';
import { DayOfWeekLayout } from '@/layouts';
import { RenderResult, render } from '@testing-library/react';

// randomize day names for the hell of it
const chance = Chance();
const mockDaysOfTheWeek = chance.unique(() => chance.string(), 7);

jest.mock('@/hooks/useCalendar', () => ({
  useCalendar: jest.fn(() => ({
    daysOfWeek: mockDaysOfTheWeek,
  })),
}));

describe('DayOfWeekLayout', () => {
  let testObject: RenderResult;

  beforeEach(() => {
    testObject = render(<DayOfWeekLayout />);
  });

  describe('headers are all rendered', () => {
    test.each(mockDaysOfTheWeek)('%s is rendered', (value) =>
      expect(testObject.getByText(value)).toBeTruthy()
    );
  });
});
