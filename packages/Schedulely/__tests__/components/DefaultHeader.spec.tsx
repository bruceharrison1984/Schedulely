import { DefaultHeader } from '@/components';
import { HeaderComponentProps } from '@/types';
import { RenderResult, render } from '@testing-library/react';
import chance from 'chance';

const onNextMonthHandler = jest.fn(() => null);
const onNextYearHandler = jest.fn(() => null);
const onPrevMonthHandler = jest.fn(() => null);
const onPrevYearHandler = jest.fn(() => null);

const defaults: HeaderComponentProps = {
  month: chance().month(),
  year: Number.parseInt(chance().year()),
  isCurrentMonth: true,
  onNextMonth: onNextMonthHandler,
  onNextYear: onNextYearHandler,
  onPrevMonth: onPrevMonthHandler,
  onPrevYear: onPrevYearHandler,
};

describe('DefaultHeader', () => {
  describe('header text', () => {
    let testObject: RenderResult;

    beforeEach(() => {
      testObject = render(<DefaultHeader {...defaults} />);
    });

    it('displays correctly', () =>
      expect(testObject.getByRole('heading').textContent).toEqual(
        `${defaults.month} - ${defaults.year}`
      ));
  });

  describe('isCurrentMonth', () => {
    describe('is true', () => {
      let testObject: RenderResult;

      beforeEach(() => {
        testObject = render(<DefaultHeader {...defaults} />);
      });

      it('indicator is rendered', () =>
        expect(testObject.getByRole('alert')).not.toBeNull());
    });

    describe('is false', () => {
      let testObject: RenderResult;

      beforeEach(
        () =>
          (testObject = render(
            <DefaultHeader {...defaults} isCurrentMonth={false} />
          ))
      );

      it('indicator is rendered', () =>
        expect(testObject.queryByRole('alert')).toBeNull());
    });

    describe('onNextMonth', () => {
      let testObject: RenderResult;

      beforeEach(() => (testObject = render(<DefaultHeader {...defaults} />)));

      it('calls callback', () => {});
    });
  });
});
