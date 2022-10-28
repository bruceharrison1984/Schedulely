import { DayOfWeekLayout } from '@/layouts';
import { RenderResult, render } from '@testing-library/react';

const mockDaysOfTheWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

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
