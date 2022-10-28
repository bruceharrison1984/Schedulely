import { Chance } from 'chance';
import { DefaultHeader } from '@/components';
import { HeaderComponent } from '@/types';
import { HeaderLayout } from '@/layouts';
import { RenderResult, render } from '@testing-library/react';

let mockHeaderComponent: HeaderComponent = DefaultHeader;
const mockCurrentMonth = Chance().month();
const mockCurrentYear = Chance().year();
const mockIsCurrentMonth = Chance().bool();

jest.mock('@/hooks', () => ({
  useComponents: jest.fn(() => ({
    headerComponent: mockHeaderComponent,
  })),
  useCalendar: jest.fn(() => ({
    currentMonth: mockCurrentMonth,
    currentYear: mockCurrentYear,
    isCurrentMonth: mockIsCurrentMonth,
  })),
  useBreakpoint: jest.fn(() => ({
    breakpoint: 'small',
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
