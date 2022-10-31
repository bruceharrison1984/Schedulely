import { InternalEventWeek } from '@/types';
import { MonthLayout } from '@/layouts';
import { RenderResult, render } from '@testing-library/react';

const mockCalendarWithEvents = [] as InternalEventWeek[];
const mockUseKeyboardControls = jest.fn(() => null);

jest.mock('@/hooks', () => ({
  useCalendar: jest.fn(() => ({
    calendarWithEvents: mockCalendarWithEvents,
  })),
  useKeyboardControls: jest.fn(() => mockUseKeyboardControls()),
}));

describe('MonthLayout', () => {
  let testObject: RenderResult;

  beforeEach(() => {
    testObject = render(<MonthLayout />);
  });

  it('initializes keyboard controls', () =>
    expect(mockUseKeyboardControls).toHaveBeenCalledTimes(1));
});
