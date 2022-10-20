import { DayComponentProps } from '@/types';
import { DefaultDay } from '@/components';
import { render, screen } from '@testing-library/react';
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
    it('displays indicator if overflowed', () => {
      const testObject = render(<DefaultDay {...defaults} />);
      expect(testObject.getByRole('note')).toBeVisible();
    });

    it('indicator not rendered if not overflowed', () => {
      const testObject = render(
        <DefaultDay {...defaults} isOverflowed={false} />
      );
      expect(testObject.queryByRole('note')).toBeNull();
    });
  });
});
