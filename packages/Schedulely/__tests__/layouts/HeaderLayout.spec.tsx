import { Chance } from 'chance';
import { DefaultHeader } from '@/components';
import { HeaderComponent } from '@/types';
import { HeaderLayout } from '@/layouts';
import { RenderResult, fireEvent, render } from '@testing-library/react';

let mockHeaderComponent: HeaderComponent = DefaultHeader;
const mockCurrentMonth = Chance().month();
const mockCurrentYear = Chance().year();
const mockIsCurrentMonth = Chance().bool();
const mockOnNextMonthClick = jest.fn();
const mockOnNextYearHandler = jest.fn();
const mockOnPrevMonthHandler = jest.fn();
const mockOnPrevYearHandler = jest.fn();

jest.mock('@/hooks', () => ({
  useComponents: jest.fn(() => ({
    headerComponent: mockHeaderComponent,
  })),
  useCalendar: jest.fn(() => ({
    currentMonth: mockCurrentMonth,
    currentYear: mockCurrentYear,
    isCurrentMonth: mockIsCurrentMonth,
    onNextMonth: mockOnNextMonthClick,
    onNextYear: mockOnNextYearHandler,
    onPrevYear: mockOnPrevYearHandler,
    onPrevMonth: mockOnPrevMonthHandler,
  })),
}));

describe('HeaderLayout', () => {
  describe('with DefaultHeader component', () => {
    let testObject: RenderResult;

    beforeEach(() => {
      testObject = render(<HeaderLayout />);
    });

    it('passes currentMonth value', () =>
      expect(
        testObject.getByText(mockCurrentMonth, { exact: false })
      ).toBeTruthy());

    it('passes currentYear value', () =>
      expect(
        testObject.getByText(mockCurrentYear, { exact: false })
      ).toBeTruthy());

    it('passes isCurrentMonth', () => {
      const result = expect(testObject.queryByRole('alert'));
      mockIsCurrentMonth ? result.toBeTruthy() : result.toBeFalsy();
    });

    it('passes onNextMonthHandler', () => {
      fireEvent.click(testObject.getByTitle('Next Month'));
      expect(mockOnNextMonthClick).toHaveBeenCalledTimes(1);
    });

    it('passes onNextYearHandler', () => {
      fireEvent.click(testObject.getByTitle('Next Year'));
      expect(mockOnNextYearHandler).toHaveBeenCalledTimes(1);
    });

    it('passes onPrevMonthHandler', () => {
      fireEvent.click(testObject.getByTitle('Previous Month'));
      expect(mockOnPrevMonthHandler).toHaveBeenCalledTimes(1);
    });

    it('passes onPrevYearHandler', () => {
      fireEvent.click(testObject.getByTitle('Previous Year'));
      expect(mockOnPrevYearHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('with custom header component', () => {
    let testObject: RenderResult;
    let mockHeaderText: string;

    beforeEach(() => {
      mockHeaderText = Chance().string();
      mockHeaderComponent = () => <div>{mockHeaderText}</div>;
      testObject = render(<HeaderLayout />);
    });

    it('uses custom header component', () =>
      expect(testObject.getByText(mockHeaderText)).toBeTruthy());
  });
});
