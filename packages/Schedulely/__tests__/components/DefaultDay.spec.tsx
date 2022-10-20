import { DayComponentProps } from '@/types';
import { DefaultDay } from '@/components';
import { RenderResult, render } from '@testing-library/react';
import chance from 'chance';

describe('DefaultDay', () => {
  const defaults: DayComponentProps = {
    isCurrentMonth: true,
    isOverflowed: true,
    isToday: true,
    dateNumber: chance().integer({ min: 1, max: 31 }),
    events: [],
    onClick: () => null,
  };

  describe('isCurrentMonth', () => {
    it('displays correct class for current month', () => {
      const testObject = render(<DefaultDay {...defaults} />);
      expect(testObject.getByRole('cell').className).toContain(
        'default-day-current'
      );
    });

    it('displays correct class for sibling month', () => {
      const testObject = render(
        <DefaultDay {...defaults} isCurrentMonth={false} />
      );
      expect(testObject.getByRole('cell').className).toContain(
        'default-day-sibling'
      );
    });
  });

  describe('isOverflowed', () => {
    describe('is true', () => {
      let testObject: RenderResult;

      beforeEach(() => {
        testObject = render(<DefaultDay {...defaults} />);
      });

      it('renders indicator', () => {
        expect(testObject.getByRole('note')).toBeVisible();
      });

      it('indicator has help text', () => {
        expect(testObject.getByRole('note').title).not.toBeNull();
      });
    });

    describe('is false', () => {
      let testObject: RenderResult;

      beforeEach(() => {
        testObject = render(<DefaultDay {...defaults} isOverflowed={false} />);
      });

      it('indicator not rendered', () =>
        expect(testObject.queryByRole('note')).toBeNull());
    });
  });

  describe('isToday', () => {
    describe('is true', () => {
      let testObject: RenderResult;

      beforeEach(() => {
        testObject = render(<DefaultDay {...defaults} />);
      });

      it('displays indicator', () => {
        expect(
          testObject.getByRole('heading').querySelector('div')?.className
        ).toContain('default-day-header--indicator');
      });

      it('renders date number', () => {
        expect(
          testObject.getByRole('heading').querySelector('div span')?.textContent
        ).toEqual(defaults.dateNumber.toString());
      });
    });

    describe('is false', () => {
      let testObject: RenderResult;

      beforeEach(() => {
        testObject = render(<DefaultDay {...defaults} isToday={false} />);
      });

      it('indicator not rendered if false', () =>
        expect(
          testObject.getByRole('heading').querySelector('div')
        ).toBeNull());

      it('renders date number', () =>
        expect(
          testObject.getByRole('heading').querySelector('span')?.textContent
        ).toEqual(defaults.dateNumber.toString()));
    });
  });
});
