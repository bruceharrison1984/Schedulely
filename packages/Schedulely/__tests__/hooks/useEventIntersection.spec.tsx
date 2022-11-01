import { render } from '@testing-library/react';
import { useEventIntersection } from '@/hooks';

describe('useEventIntersection', () => {
  it('throws when called outside of provider', () => {
    const ExceptionWrapper = () => {
      expect(useEventIntersection).toThrowError(/must be used within/);
      return <></>;
    };
    render(<ExceptionWrapper />);
  });
});
