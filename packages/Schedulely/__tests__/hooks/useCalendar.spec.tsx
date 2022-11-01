import { render } from '@testing-library/react';
import { useCalendar } from '@/hooks';

describe('useCalendar', () => {
  it('throws when called outside of provider', () => {
    const ExceptionWrapper = () => {
      expect(useCalendar).toThrowError(/must be used within/);
      return <></>;
    };
    render(<ExceptionWrapper />);
  });
});
